import { world, system, GameRules, GameRule, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

// import { allkillsObjective, hostilekillsObjective, bosskillsObjective, elderkillsObjective, dragonkillsObjective, wardenkillsObjective, witherkillsObjective, playerkillsObjective,
// pvpkillsObjective, 
// customkillsObjective } from './PVPScoreboardHandler.js';
// import * as scoreboardhandler from './PVPScoreboardHandler.js';
// import { trackers } from './PVPScoreboardHandler.js';

import * as tracker from './PVPScoreboardHandler.js';
import * as chat from './PVPChatCommandHandler.js';
import * as config from './PVPUserConfig.js';



export const arenaDimension = world.getDimension("minecraft:overworld");
export const overworld = world.getDimension("minecraft:overworld");

// global variables
export let curTick = 0;

export var pvp_started = false;

export var currentobjective;
export var currentpvpobjective;
export var currentmatchkills;
export var currentscore;
export var highscore;
export var matchhighscoreplayer;
export var matchhighscoreplayername;

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


// PVP Functions

// JoinPVP function
export function joinPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		chat.sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
		chat.sender.addTag('s3:pvp');
		pvpplayercount = (pvpplayercount +1);
	}
}

// StopPVP function
export function stopPVP() {
	if (pvp_started == true)
	{
		pvp_started = false;
		world.sendMessage(`§4${"The PVP match is ending."}`);
		console.log('PVP MATCH ENDING');
		
		const pvpplayers = world.getAllPlayers();
  // pvpplayercount = pvpplayers.hasTag('s3:pvp')?.length;

	highscore = -1
  for (const player of pvpplayers) {	
		if (player.hasTag('s3:pvp'))
		{	
		// highscore = currentobjective.getScore(participant:);
		currentscore = currentobjective.getScore(player);
		console.log("Current Score:" , [currentscore] , [player.nameTag]);
		// player.sendMessage( , {currentscore});
		player.sendMessage("Match Score:");
		player.sendMessage(`${[currentscore]}`);
			if (currentscore > highscore) 
			{
				highscore = currentobjective.getScore(player);
				
				matchhighscoreplayer = player;
				matchhighscoreplayername = matchhighscoreplayer.name;
				console.log("New High Score:" , [highscore] , [matchhighscoreplayer.nameTag]);
			}
		console.log("Current High Score:" , [highscore]);
		}
	}
	
		// Ending Announcements
		console.log('PVP MATCH ENDED');
		console.log('WINNER:' , [matchhighscoreplayer.nameTag] );
		world.sendMessage(`§4${"The PVP match has ended."}`);
		world.sendMessage(`§gThe Winner is: ${[matchhighscoreplayer.nameTag]}`);
		
		// Match Win Tracker 
		if ( pvpplayercount > 1)
			{
			tracker.totalpvpmatchwinsObjective.addScore(matchhighscoreplayer, 1);
			console.log([matchhighscoreplayer.nameTag] , "TOTAL WINS UPDATED");
			console.log([matchhighscoreplayer.nameTag] , "TOTAL WINS:" , [tracker.totalpvpmatchwinsObjective.getScore(matchhighscoreplayer)]);		
			world.sendMessage(`§g${[matchhighscoreplayer.nameTag]} TOTAL WINS: ${[tracker.totalpvpmatchwinsObjective.getScore(matchhighscoreplayer)]}`);
			}
		if (pvpplayercount < 1 || highscore <= 0)
			{
			world.sendMessage(`§4${"Too few players or points for win tracking."}`);	
			}
		
		system.run(() => {tracker.showWins()});
		console.log("SHOW PVP WINS");
		// Reset Gamerules
		// TODO run a function to set all the gametype options
		overworld.runCommandAsync(`gamerule mobGriefing ${mobgriefvalue}`); // disable creepers blowing up the arena
		
		clearPVP(); // run function to clear PVP tags
	}
	{
	console.log("PVP MATCH NOT STARTED");
	}
}

// Clear function - clear pvp tags
export function clearPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		player.removeTag('s3:pvp')
		player.removeTag('s3:spectator')
	}
	pvpplayercount = 0
	
	
	system.runTimeout(() => {
		tracker.refreshDisplay();
		}, 500);
}

// Clear old pvp tags after server reset
world.afterEvents.worldInitialize.subscribe((startup) => {
		clearPVP();
		// world.scoreboard.removeObjective( "currentpvpmatchkills");
});

// Gametype Checker
export function gametypeCheck() {
		console.log('CHECKING GAMETYPE')
		if ( slayer == true )
		{
		console.log('SLAYER:' , slayer);
		console.log('The current gametype is SLAYER.');
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
		}
}


// Slayer
export function setupSlayer() {
		slayer = true;
		console.log('SLAYER:' , slayer)
		world.sendMessage(`§4${"The current gametype is SLAYER."}`);
}

export function initializeSlayer() {

	pvp_started = true;
	
	overworld.runCommandAsync(`gamerule mobGriefing false`); // disable creepers blowing up the arena

  // set up slayer scoreboard
	// var currentpvpmatchkillsObjective = 0;
	// world.scoreboard.setScore(currentpvpmatchkillsObjective, 0);
	
	  // if (!currentpvpmatchkillsObjective) {
    // currentpvpmatchkillsObjective = world.scoreboard.addObjective(objectiveId: "currentpvpmatchkills", displayName?: "Current PVP Match Kills:");
		// }

	
		// }
		// currentpvpobjective = tracker.trackers.currentpvpmatchkills.objective; // set currentobjective to match the gametype
		currentpvpobjective = world.scoreboard.getObjective("currentpvpmatchkills"); // set currentobjective to match the gametype
		console.log("Current PVP Objective:" , currentpvpobjective);
		// currentmatchkills = currentpvpobjective.objective; //.getScores();
		
		//add new objective
		if (!currentpvpobjective) {
		console.log("currentpvpobjective missing")
		}
		// Remove old pvpkills scoreboard objective
		world.scoreboard.removeObjective( tracker.trackers.currentpvpmatchkills.objective );
		// Add new pvpkills scoreboard objective
    world.scoreboard.addObjective(tracker.trackers.currentpvpmatchkills.objective, tracker.trackers.currentpvpmatchkills.display);

		// Display the current objective as the scoreboard
		// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: currentpvpobjective.objective, sortOrder: ObjectiveSortOrder.Descending, });	
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.currentpvpmatchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.currentpvpmatchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });

  const pvpplayers = world.getAllPlayers();
  // pvpplayercount = pvpplayers.hasTag('s3:pvp')?.length;

  for (const player of pvpplayers) {	
		if (slayer == true && player.hasTag('s3:pvp'))
		{	
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
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
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
		// world.scoreboard.removeParticipant(player);
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
	
		if (slayer == true)
		{
			if (!target || target.typeId !== "minecraft:player") {
			return;
			}
			if (target.typeId == "minecraft:player"  && target.hasTag('s3:pvp') && attacker.typeId == "minecraft:player" && attacker.hasTag('s3:pvp')) {
			console.log("PVP Started:", pvp_started);
			console.log("PVP Kill");
			currentpvpobjective.addScore(attacker, 1);
			}
		}
	}
	else 
	{
		// console.log("PVP Started:", pvp_started);
	}
});

// Slayer Score Handler
// world.afterEvents.entityDie.subscribe((kill) => {
  // const attacker = kill.damageSource.damagingEntity;
	// const target = kill.deadEntity;

	// if (pvp_started == true)
	// {
	
		// if (slayer == true)
		// {
			// if (!target || target.typeId !== "minecraft:player") {
			// return;
			// }
			// if (target.typeId == "minecraft:player"  && target.hasTag('s3:pvp') && attacker.typeId == "minecraft:player" && attacker.hasTag('s3:pvp')) {;
			// currentpvpobjective.getScore(attacker, 1);
			// }
		// }
	// }
	// else 
	// {
		// console.log("PVP Started:", pvp_started);
	// }
// });


// GAME TICK
// export function gameTick() {
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
