import { world, system, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import { allkillsObjective, hostilekillsObjective, bosskillsObjective, elderkillsObjective, dragonkillsObjective, wardenkillsObjective, witherkillsObjective, playerkillsObjective, pvpkillsObjective, customkillsObjective } from './ScoreboardHandler.js';
// import { currentpvpmatchkillsObjective } from './ScoreboardHandler.js';
import { scoreboards } from './ScoreboardHandler.js';
// import { * } from './PVPUserConfig.js';
import * as config from './PVPUserConfig.js';
// import { obj , objective} from './ScoreboardHandler.js';

// ARENA LOCATION
// const START_TICK = 100;
// const ARENA_X_SIZE = 30;
// const ARENA_Z_SIZE = 30;
// const ARENA_X_OFFSET = 0;
// const ARENA_Y_OFFSET = -60;
// const ARENA_Z_OFFSET = 0;
// const ARENA_X_LOC = 9985;
// const ARENA_Y_LOC = 63;
// const ARENA_Z_LOC = 10015;

// Team Spawns
// const RED_X_LOC = 10018;
// const RED_Y_LOC = 63;
// const RED_Z_LOC = 10008;

// const GREEN_X_LOC = 9985;
// const GREEN_Y_LOC = 63;
// const GREEN_Z_LOC = 10015;

// const BLUE_X_LOC = 9985;
// const BLUE_Y_LOC = 63;
// const BLUE_Z_LOC = 10015;

// const YELLOW_X_LOC = 9985;
// const YELLOW_Y_LOC = 63;
// const YELLOW_Z_LOC = 10015;

// const PURPLE_X_LOC = 9985;
// const PURPLE_Y_LOC = 63;
// const PURPLE_Z_LOC = 10015;

const arenaDimension = world.getDimension("minecraft:overworld");
const overworld = world.getDimension("minecraft:overworld");

// global variables
export let curTick = 0;

export var pvp_started = false;

export var currentobjective;
export var currentmatchkills;
// GAMEMODES
export var teams = false;

export var slayer = false;

if (slayer !== undefined) {
    console.log('slayerVar is initialized');
    console.log(slayer);
} 
else {
    console.log('slayerVar is not initialized');
}

export var teamslayer = false;
export var swat = false;

export var firefight = false;

export var ctf = false;


// let slayer = false;
// let slayer = false;

export var pvpscoreObjective = world.scoreboard.getObjective("Score");
// var currentpvpmatchkillsObjective = 0;

export var pvpplayercount = 0;

var sender;
// Chat Command Handler
	
world.beforeEvents.chatSend.subscribe((chatData) => {

    sender = chatData.sender;
    const message = chatData.message;
    if (message == "!arena") //return 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.teleport(
      { x: config.ARENA_X_LOC, y: config.ARENA_Y_LOC, z: config.ARENA_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
			);
			})
		}

	// PVP Initialization Setup
    if (message == "!pvp" || message == "!PVP" || message == "!pvpinit" || message == "!pvpsetup" || message == "!PVPINIT"|| message == "!PVPSETUP"|| message == "!setup" || message == "!SETUP") //
		{
		chatData.cancel = true;
    system.run(() => {
      world.sendMessage(`§4${"PVP INITIALIZED"}`);
      world.sendMessage(`§4${"Type !join in chat to join the upcoming PVP match."}`);
			joinPVP();
			})
		}
		
	// PVP Joining
    if (message == "!join" || message == "!JOIN" || message == "!joinpvp" || message == "!JOINPVP") //return 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
			sender.addTag('s3:pvp');
			})
		} 
		
		// PVP Leave
		if (message == "!leave" || message == "!LEAVE" || message == "!leavepvp" || message == "!LEAVEPVP" || message == "!quit" || message == "!QUIT" || message == "!quitpvp" || message == "!QUITPVP") //return 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"You have left the PVP match."}`);
			sender.removeTag('s3:pvp');
			})
		}	
		
		// PVP Gamemode Select
		if (message == "!slayer" || message == "!SLAYER" || message == "!dm" || message == "!DM" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
		slayer = true	
		console.log('SLAYER:' , slayer)
		world.sendMessage(`§4${"The current gametype is SLAYER."}`);
			})
		}

		// PVP Start/Ending
		if (message == "!startpvp" || message == "!STARTPVP" ||message == "!pvpstart" || message == "!PVPSTART" || message == "!beginpvp" || message == "!BEGINPVP" || message == "!pvpbegin" || message == "!PVPBEGIN" || message == "!START" || message == "!start" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
			// countplayersPVP();
			joinPVP();
			console.log('PVP Player Count:' , pvpplayercount)
			if (slayer == true)
			{
      world.sendMessage(`§4${"The PVP match is beginning."}`);
			initializeSlayer();
			return
			}
			else
			{
      world.sendMessage(`§4${"No Gametype Selected. Defaulting to Slayer"}`);
			slayer = true;
			console.log('SLAYER:' , slayer)
			initializeSlayer();
			return
			}
			})
		}
		
		if (message == "!stoppvp" || message == "!STOPPVP" || message == "!pvpstop" || message == "!PVPSTOP" || message == "!stop" || message == "!STOP" || message == "!endpvp" || message == "!ENDPVP" || message == "!pvpend" || message == "!PVPEND" || message == "!END" || message == "!end" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
      world.sendMessage(`§4${"The PVP match is ending."}`);
			endPVP();
			clearPVP();
			})
		}

		
});


// PVP Functions

// JoinPVP function
function joinPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
		sender.addTag('s3:pvp')
	}
}

// StopPVP function
function stopPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
		sender.addTag('s3:pvp')
	}
}

// Clear function - clear pvp tags
function clearPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		player.removeTag('s3:pvp')
	}
}

// Clear old pvp tags after server reset
world.afterEvents.worldInitialize.subscribe((startup) => {
		clearPVP();
		// world.scoreboard.removeObjective( "currentpvpmatchkills");
});

// Slayer
function initializeSlayer() {

	pvp_started = true;

  // set up slayer scoreboard
	// var currentpvpmatchkillsObjective = 0;
	// world.scoreboard.setScore(currentpvpmatchkillsObjective, 0);
	
	  // if (!currentpvpmatchkillsObjective) {
    // currentpvpmatchkillsObjective = world.scoreboard.addObjective(objectiveId: "currentpvpmatchkills", displayName?: "Current PVP Match Kills:");
		// }
		
		//remove old objective

	
		
		//add new objective
		if (!currentmatchkills) {
		world.scoreboard.removeObjective( "currentpvpmatchkills"); // Remove old scoreboard
    world.scoreboard.addObjective( "currentpvpmatchkills", "Current Match Kills:");
		}
		
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
		currentmatchkills = currentobjective.getScores();
		

		
		// objective.removeParticipant("currentpvpmatchkills");
		




		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: currentobjective, sortOrder: ObjectiveSortOrder.Descending, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: currentobjective, sortOrder: ObjectiveSortOrder.Descending, });


  const pvpplayers = world.getAllPlayers();
  // const pvpplayers = players.hasTag('s3:pvp');

  for (const player of pvpplayers) {
    
		
		if (slayer == true && player.hasTag('s3:pvp'))
		{	
		player.setGameMode(0);
		currentobjective.setScore(player, 0);
    // let inv = player.getComponent("inventory"); // as EntityInventoryComponent;
    // inv.container?.addItem(new ItemStack("diamond_sword"));
    // inv.container?.addItem(new ItemStack("bow"));
    // inv.container?.addItem(new ItemStack("crossbow"));
    // inv.container?.addItem(new ItemStack("arrow", 64));
    // inv.container?.addItem(new ItemStack("arrow", 64));
    // inv.container?.addItem(new ItemStack("arrow", 64));

    player.teleport(
      { x: config.ARENA_X_LOC, y: config.ARENA_Y_LOC, z: config.ARENA_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
    );
		}

		if (slayer == true && !player.hasTag('s3:pvp'))
		{	
		currentobjective.removeParticipant(player);
		}
		
  }

  world.sendMessage("SLAYER");
}

// Slayer Score Handler
world.afterEvents.entityDie.subscribe((kill) => {
  const attacker = kill.damageSource.damagingEntity;
	const target = kill.deadEntity;

	if (pvp_started == true)
	{
		console.log("PVP Started:", pvp_started);
	
		if (slayer == true)
		{
			if (!target || target.typeId !== "minecraft:player") {
			return;
			}
			if (target.typeId == "minecraft:player"  && target.hasTag('s3:pvp') && attacker.typeId == "minecraft:player" && attacker.hasTag('s3:pvp')) {
			console.log("PVP Kill");
			// world.scoreboard.getObjective("currentpvpmatchkills")?.addScore(attacker, 1);
			currentobjective.addScore(attacker, 1);
			}
		}
	}
	else 
	{
		console.log("PVP Started:", pvp_started);
	}
});

// function gameTick() {
  // try {
    // curTick++;

    // if (curTick === START_TICK) {
      // initializeSlayer();
    // }
  // } catch (e) {
    // console.warn("Tick error: " + e);
  // }

  // system.run(gameTick);
// }

// system.run(gameTick);

// Spawn/Home teleport command
world.beforeEvents.chatSend.subscribe((eventData) => {
    const sender = eventData.sender;
    const message = eventData.message;
    if (message != "!spawn" || message != "!home") return
    eventData.cancel = true;

    const spawn = world.getDefaultSpawnLocation()
    const spawnDimension = world.getDimension("minecraft:overworld")
    system.run(() => {
        sender.teleport(spawn, {dimension: spawnDimension})
    })
});