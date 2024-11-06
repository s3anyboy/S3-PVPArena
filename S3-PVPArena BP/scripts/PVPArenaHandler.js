import { world, system, GameRules, GameRule, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import { allkillsObjective, hostilekillsObjective, bosskillsObjective, elderkillsObjective, dragonkillsObjective, wardenkillsObjective, witherkillsObjective, playerkillsObjective, pvpkillsObjective, customkillsObjective } from './ScoreboardHandler.js';
// import { currentpvpmatchkillsObjective } from './ScoreboardHandler.js';
import { scoreboards } from './ScoreboardHandler.js';
// import { * } from './PVPUserConfig.js';
import * as config from './PVPUserConfig.js';
// import { obj , objective} from './ScoreboardHandler.js';


// Gamemode Switch Command
world.beforeEvents.chatSend.subscribe((eventData) => {
	const player = eventData.sender;
	switch (eventData.message) {
		case '!gmc':
			eventData.cancel = true;
			player.runCommandAsync('gamemode c');
			break;
		case '!gms':
			eventData.cancel = true;
			player.runCommandAsync('gamemode s');
			break;
		default: break;
	}
});

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
    if (message == "!join" || message == "!JOIN" || message == "!joinpvp" || message == "!JOINPVP")  
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
			sender.addTag('s3:pvp');
			})
		} 
		
		// PVP Leave
		if (message == "!leave" || message == "!LEAVE" || message == "!leavepvp" || message == "!LEAVEPVP" || message == "!quit" || message == "!QUIT" || message == "!quitpvp" || message == "!QUITPVP")  
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"You have left the PVP match."}`);
			sender.removeTag('s3:pvp');
			})
		}

		// PVP Spectate
		if (message == "!watch" || message == "!WATCH" || message == "!watchpvp" || message == "!WATCHPVP" || message == "!spectate" || message == "!SPECTATE" || message == "!spectatepvp" || message == "!SPECTATEPVP") 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"You are spectating the PVP match."}`);
			sender.removeTag('s3:pvp');
			sender.addTag('s3:spectator');
			})
		}	
		
		// PVP Gamemode Select
		if (message == "!slayer" || message == "!SLAYER" || message == "!dm" || message == "!DM" )  
		{
		chatData.cancel = true;
    system.run(() => {
		slayer = true	
		console.log('SLAYER:' , slayer)
		world.sendMessage(`§4${"The current gametype is SLAYER."}`);
			})
		}

		// PVP Start/Ending
		if (message == "!startpvp" || message == "!STARTPVP" ||message == "!pvpstart" || message == "!PVPSTART" || message == "!beginpvp" || message == "!BEGINPVP" || message == "!pvpbegin" || message == "!PVPBEGIN" || message == "!START" || message == "!start" )  
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
      
			stopPVP();
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
		sender.addTag('s3:pvp');
		pvpplayercount = (pvpplayercount +1);
	}
}

// StopPVP function
function stopPVP() {
	
		world.sendMessage(`§4${"The PVP match is ending."}`);
		log.console('PVP MATCH ENDING');
		
		//Reset Gamerules
		overworld.runCommandAsync(`gamerule mobGriefing ${mobgriefvalue}`); // disable creepers blowing up the arena
}

// Clear function - clear pvp tags
function clearPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		player.removeTag('s3:pvp')
		player.removeTag('s3:spectator')
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
	
	overworld.runCommandAsync(`gamerule mobGriefing false`); // disable creepers blowing up the arena

  // set up slayer scoreboard
	// var currentpvpmatchkillsObjective = 0;
	// world.scoreboard.setScore(currentpvpmatchkillsObjective, 0);
	
	  // if (!currentpvpmatchkillsObjective) {
    // currentpvpmatchkillsObjective = world.scoreboard.addObjective(objectiveId: "currentpvpmatchkills", displayName?: "Current PVP Match Kills:");
		// }

		//add new objective
		if (!currentmatchkills) {
		world.scoreboard.removeObjective( "currentpvpmatchkills"); // Remove old scoreboard objective
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

// GameRule (server settings) Handler
// All the variables gamerules pvp gametypes can read/change

var friendlyfirevalue; // pvp = Friendly Fire 
var showcoordsvalue;
var showdaysvalue;
	var currentdayvalue; // for gametypes that reset the days played counter
	var currentclocktimevalue; // for gametypes that reset the days played counter
	var currentabsolutetimevalue; // for gametypes that reset the days played counter
var firespreadsvalue; // dofiretick = Fire Spreads
var tntexplodesvalue;
var bedsexplodevalue;
var instarespawnvalue;
var moblootvalue;
// Options below here are classified as "cheats" in the menu
var mobspawnvalue;
var mobgriefvalue; // this also affects villager farmers
var	naturalgregenvalue;
var alwaysdayvalue;
var daycyclevalue;
var weathercyclevalue;
var keepinventoryvalue;
var randomtickvalue;
// Options below are not displayed in the settings menu
var	drowningvalue;
var	falldmgvalue;
var	firedmgvalue;
var freezedmgvalue;
var insomniavalue;
var playersleepvalue;
var projbreakblocksvalue;
var showbordervalue; // pumpking head?
var showdeathsvalue // player death messages
var showtagsvalue // player nametags?

// On server initialization set all the gamerulevalue variables to match the server settings so they can be restored later
world.afterEvents.worldInitialize.subscribe((gamerulesstartup) => {
	//set each gamerulevalue variale and then log it to console
	friendlyfirevalue = world.gameRules.pvp;
	console.log('Friendly Fire:' , friendlyfirevalue);
	showcoordsvalue = world.gameRules.showCoordinates;
	console.log('Show Coords:' , showcoordsvalue);	
	showdaysvalue = world.gameRules.showDaysPlayed;
	console.log('Show Days:' , showdaysvalue);	
		currentdayvalue = world.getDay();
		console.log('Current Day:' , currentdayvalue);
		currentclocktimevalue = world.getTimeOfDay();
		console.log('Current Time of Day:' , currentclocktimevalue);
		currentabsolutetimevalue = world.getAbsoluteTime();
		console.log('Current Time (Absolute):' , currentabsolutetimevalue);	
	firespreadsvalue = world.gameRules.doFireTick;
	console.log('Fire Spreads:' , firespreadsvalue);
	tntexplodesvalue = world.gameRules.tntExplodes;
	console.log('TNT Explodes:' , tntexplodesvalue);
	bedsexplodevalue = world.gameRules.respawnBlocksExplode;
	console.log('Beds Explode:' , bedsexplodevalue);
	instarespawnvalue = world.gameRules.doImmediateRespawn;
	console.log('Instant Respawn:' , instarespawnvalue);
	moblootvalue = world.gameRules.doMobLoot;
	console.log('Mob Loot:' , moblootvalue);	
	// Cheats
	mobspawnvalue = world.gameRules.doMobSpawning;
	console.log('Mob Spawning:' , mobspawnvalue);	
	mobgriefvalue = world.gameRules.mobGriefing;
	console.log('Mob Griefing:' , mobgriefvalue);		
	naturalgregenvalue = world.gameRules.naturalRegeneration;
	console.log('Natural Health Regen:' , naturalgregenvalue);	

	if 
	(world.gameRules.doDayLightCycle == false && (currentclocktimevalue >= 1000 && currentclocktimevalue <= 13000) || currentclocktimevalue >= 23000)
	{alwaysdayvalue = true} {alwaysdayvalue = false};
	console.log('Always Day:' , alwaysdayvalue);	
	
	daycyclevalue = world.gameRules.doDayLightCycle;
	console.log('Day Cycle:' , daycyclevalue);	
  weathercyclevalue = world.gameRules.doWeatherCycle;
	console.log('Weather Cycle:' , weathercyclevalue);	
	keepinventoryvalue = world.gameRules.keepInventory;
	console.log('Keep Inventory:' , keepinventoryvalue);	
	randomtickvalue = world.gameRules.randomTickSpeed;
	console.log('Random Tick Speed:' , randomtickvalue);
	// Hidden
	drowningvalue = world.gameRules.drowningDamage;
	console.log('Drowning Damage:' , drowningvalue);	
	falldmgvalue = world.gameRules.fallDamage;
	console.log('Fall Damage:' , falldmgvalue);	
	firedmgvalue = world.gameRules.fireDamage;
	console.log('Burning Damage:' , firedmgvalue);	
	freezedmgvalue = world.gameRules.freezeDamage;
	console.log('Freezing Damage:' , freezedmgvalue);	
	insomniavalue = world.gameRules.doInsomnia;
	console.log('Insomnia:' , insomniavalue);	
	playersleepvalue = world.gameRules.playersSleepingPercentage;
	console.log('Player Sleep %:' , playersleepvalue);	
	projbreakblocksvalue = world.gameRules.projectilesCanBreakBlocks;
	console.log('Projectiles Break:' , projbreakblocksvalue);	
	showbordervalue = world.gameRules.showBorderEffect;
	console.log('Show Border:' , showbordervalue);
	showdeathsvalue = world.gameRules.showDeathMessages;
	console.log('Show Death Messages:' , showdeathsvalue);
	showtagsvalue = world.gameRules.showTags;
	console.log('Show Tags:' , showtagsvalue);

	// Reset Gamerules
	overworld.runCommandAsync(`gamerule mobGriefing ${mobgriefvalue}`); // disable creepers blowing up the arena	
	// overworld.GameRules.mobGriefing = mobgriefvalue;
	// world.gameRules.keepInventory = {keepinventoryvalue};
});
