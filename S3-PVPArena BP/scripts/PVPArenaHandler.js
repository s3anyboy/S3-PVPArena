import { world, system, GameRules, GameRule, BlockTypes, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";
// import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

// import { allkillsObjective, hostilekillsObjective, bosskillsObjective, elderkillsObjective, dragonkillsObjective, wardenkillsObjective, witherkillsObjective, playerkillsObjective,
// pvpkillsObjective, 
// customkillsObjective } from './PVPScoreboardHandler.js';
// import * as scoreboardhandler from './PVPScoreboardHandler.js';
// import { trackers } from './PVPScoreboardHandler.js';

import * as title from './PVPTitleHandler.js';
import * as tracker from './PVPScoreboardHandler.js';
import * as chat from './PVPChatCommandHandler.js';
import * as config from './PVPUserConfig.js';



export const arenaDimension = world.getDimension("minecraft:overworld");
export const overworld = world.getDimension("minecraft:overworld");

// global variables
export let curTick = 0;
export var player;

export var pvp_started = false;

export var currentobjective;
export var currentpvpobjective;
export var currentmatchkills;
export var currentscore;
export var highscore;
export var previoushighscoreplayer;
export var matchhighscoreplayer;
export var matchhighscoreplayername;

export var killlimit = config.killlimit;
export var scorelimit = config.scorelimit;

// GAMEMODES
export var teams = false;

export var slayer = true; // Slayer is the default mode

export var teamslayer = false;
export var swat = false;

export var horde = false;

export var ctf = false;

export var pvpscoreObjective = world.scoreboard.getObjective("Score");
// var currentpvpmatchkillsObjective = 0;

export var pvpplayercount = 0;

var allplayers = world.getAllPlayers();
// PVP Functions

// JoinPVP function
export function joinPVP() {
	console.log("JOIN PVP") 

		world.sendMessage(`§4${[chat.sender.nameTag]} has joined the PVP match.`);
		// chat.sender.sendMessage(`§4${"You have joined the PVP match. It will begin shortly."}`);
		chat.sender.addTag('s3:pvp');
		// pvpplayercount = (pvpplayercount +1);
		for (const player of allplayers) {
			if (player.hasTag('s3:pvp')) {
			pvpplayercount = (pvpplayercount +1);
			}
		}
		console.log('PVP Player Count:' , pvpplayercount)
	// }
}

// Check PVP Scores
export function scorecheckPVP() {
	if (config.debuglog == true) { console.log("PVP SCORE CHECK") }
		const pvpplayers = world.getAllPlayers();
  // pvpplayercount = pvpplayers.hasTag('s3:pvp')?.length;

	highscore = -1
  for (const player of pvpplayers) {	
		if (player.hasTag('s3:pvp'))
		{
		currentscore = currentobjective.getScore(player);
		console.log([player.nameTag] , "Current Score:" , [currentscore] );
		// player.sendMessage(`Match Score: ${[currentscore]}`);
			if (currentscore > highscore) 
			{
				highscore = currentobjective.getScore(player);

				// previoushighscoreplayer = player;
				matchhighscoreplayer = player;				
				matchhighscoreplayername = matchhighscoreplayer.name;
				if (previoushighscoreplayer != matchhighscoreplayer)
				{
				world.sendMessage(`§gThe new Leader is: ${[matchhighscoreplayer.nameTag]}`);
				console.log("New High Score:" , [highscore] , [matchhighscoreplayer.nameTag]);
				previoushighscoreplayer = player;
				}
			}
		console.log("Current High Score:" , [highscore]);
		}
	}
	console.log('LEADER:' , [matchhighscoreplayer.nameTag] );
	// world.sendMessage(`§gThe Current Leader is: ${[matchhighscoreplayer.nameTag]}`);
	scorehandlerPVP();
	playercounthandlerPVP();
}

// Game End Score Handler
function scorehandlerPVP() {
    if (pvp_started == true)
		{
			if ( slayer == true)
			{
				if ( highscore >= killlimit)
				{ 
				console.log("Kill Limit Reached");
				stopPVP();
				}
				else {
				console.log("Current Score Below Kill Limit" , [highscore] , "/" , [killlimit]); 
				}
			}
			if ( horde == true)
			{
				killlimit = 27;
				if ( highscore >= killlimit)
				{ 
				console.log("No Horde Kill Limit");
				}
			}
			if ( highscore >= scorelimit)
			{
			console.log("Score Limit Reached");
			stopPVP();
			}
		system.run(scorehandlerPVP);
		}
}
system.run(scorehandlerPVP);

// Game End Playercount Handler
function playercounthandlerPVP() {
    if (pvp_started == true)
		{
			if ( pvpplayercount <= 0)
			{ stopPVP() }
		system.run(playercounthandlerPVP);
		}
}
system.run(playercounthandlerPVP);


// StopPVP function
export function stopPVP() {
	if (pvp_started == true)
	{
		
		world.sendMessage(`§4${"The PVP match is ending."}`);
		console.log('PVP MATCH ENDING');
		
		scorecheckPVP()
	
		// Ending Announcements
		console.log('PVP MATCH ENDED');
		console.log('WINNER:' , [matchhighscoreplayer.nameTag] );
		world.sendMessage(`§4${"The PVP match has ended."}`);
		world.sendMessage(`§gThe Winner is: ${[matchhighscoreplayer.nameTag]}`);
		
		postlobbyPVP();
		
		pvp_started = false;
		
		// Match Win Tracker 
		// TODO convert to function
		if ( pvpplayercount > 1 && highscore > 0 && horde == false)
			{
			tracker.totalpvpmatchwinsObjective.addScore(matchhighscoreplayer, 1);
			console.log([matchhighscoreplayer.nameTag] , "TOTAL WINS:" , [tracker.totalpvpmatchwinsObjective.getScore(matchhighscoreplayer)]);		
			world.sendMessage(`§g${[matchhighscoreplayer.nameTag]} TOTAL WINS: ${[tracker.totalpvpmatchwinsObjective.getScore(matchhighscoreplayer)]}`);
			
			tracker.pvpheroBonus();
			tracker.pvplootBonus();
			tracker.pvpxpwinBonus();
			//TODO killbonus
			
			}

			if ( pvpplayercount >= 1 && highscore > 0 && horde == true) // Horde Win
			{
			tracker.hordewinsObjective.addScore(matchhighscoreplayer, 1);
			console.log([matchhighscoreplayer.nameTag] , "TOTAL HORDE WINS:" , [tracker.hordewinsObjective.getScore(matchhighscoreplayer)]);		
			world.sendMessage(`§g${[matchhighscoreplayer.nameTag]} TOTAL HORDE WINS: ${[tracker.hordewinsObjective.getScore(matchhighscoreplayer)]}`);
			
			// tracker.pvpheroBonus();
			// tracker.pvplootBonus();
			// tracker.pvpxpwinBonus();
			//TODO killbonus
			
			}
		if (pvpplayercount <= 1 && horde == false || highscore <= 0 )
			{
			world.sendMessage(`§4${"Too few players or points for win tracking."}`);	
			}
		// TODO convert to function		
		
		system.run(() => {tracker.showWins()});
		console.log("SHOW PVP WINS");
		// Reset Gamerules
		// TODO run a function to set all the gametype options
		overworld.runCommandAsync(`gamerule mobGriefing ${mobgriefvalue}`); // disable creepers blowing up the arena
		
		clearPVP(); // run function to clear PVP tags
		title.titleCheck();
	}
	{
	console.log("PVP MATCH NOT STARTED");
	}
}

// PVP Postgame Lobby // TODO
export function postlobbyPVP() {
const pvpplayers = world.getAllPlayers();

  for (const player of pvpplayers) {	
	if (player.hasTag('s3:pvp') && pvp_started == true)
	{
		
	}
	}
}


// Check player pvp tag function
export function checkplayertagPVP() {
	const players = world.getAllPlayers();

  // for (const player of players) {
		if (chat.sender.hasTag('s3:pvp') == true)
		{
		chat.sender.sendMessage(`§4${[chat.sender.nameTag]} is in the PVP match.`);
		console.log(chat.sender.nameTag , 'is in the PVP match.')
		console.log('PVP Player Count:' , pvpplayercount)
		}
		if (chat.sender.hasTag('s3:pvp') == false)
		{
		chat.sender.sendMessage(`§4${[chat.sender.nameTag]} is NOT in the PVP match.`);
		console.log(chat.sender.nameTag , 'is NOT in the PVP match.')
		console.log('PVP Player Count:' , pvpplayercount)
		}
	// }
	checkstatusPVP();
}

// Check pvp match status
export function checkstatusPVP() {
	const players = world.getAllPlayers();

		if (pvp_started == true)
		{
		chat.sender.sendMessage(`§4The PVP match is in progress.`);
		console.log('The PVP match is in progress.')
		console.log('PVP Player Count:' , pvpplayercount)
		}
		if (pvp_started != true)
		{
		chat.sender.sendMessage(`§4There is no current PVP match.`);
		console.log('There is no current PVP match.')
		console.log('PVP Player Count:' , pvpplayercount)
		}

}
	
// Clear player function - clear individual player pvp tags
export function clearplayerPVP() {
	const listplayers = world.getAllPlayers();
		if (eventplayer.hasTag('s3:pvp') == true) 
		{
		eventplayer.removeTag('s3:pvp')
		eventplayer.removeTag('s3:spectator')
		console.log([eventplayer.nameTag] , "has joined, removing their leftover pvp tags");
		if (pvpplayercount > 0)	{pvpplayercount = (pvpplayercount - 1);}
		console.log("PVP Player Count:" , pvpplayercount);
		}
}

// Clear function - clear all pvp tags
export function clearPVP() {
	const players = world.getAllPlayers();

  for (const player of players) {
		player.removeTag('s3:pvp')
		player.removeTag('s3:spectator')
	}
	pvpplayercount = 0
	
	system.runTimeout(() => {
		tracker.refreshDisplay();
		}, 300);
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

// Set Score Limit Function
export function setScoreLimit() {
		if (slayer == true)
		{
			killlimit = config.killlimit;
				if (killlimit != chat.messageinput)
				{killlimit = chat.messageinput ?? 10}
		console.log('SLAYER KILL LIMIT:' , killlimit)
		world.sendMessage(`§4The current gametype is SLAYER. The current kill limit is${[killlimit]}`);
		}
		else {
			scorelimit = config.scorelimit;
			// killlimit = config.killlimit;
				if (scorelimit != chat.messageinput)
				{scorelimit = chat.messageinput ?? 10}
		console.log('SCORE LIMIT:' , scorelimit)
		world.sendMessage(`§4The current gametype is [GAMETYPE]. The current score limit is${[scorelimit]}`);
		}
}


// Set Arena Limit Function
export function arenaSpawns() {
   if (arena = 1)
	 {
	 player.teleport(
      { x: config.ARENA_X_LOC, y: config.ARENA_Y_LOC, z: config.ARENA_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
    );
	 }
   if (arena = 2)
	 {
	 player.teleport(
      { x: config.ARENA2_X_LOC, y: config.ARENA2_Y_LOC, z: config.ARENA2_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
    );
	 }
   if (arena = 3)
	 {
	 player.teleport(
      { x: config.ARENA3_X_LOC, y: config.ARENA3_Y_LOC, z: config.ARENA3_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
    );
	 } 
}


var arena = config.arena;
// Set Arena Limit Function
export function setArena() {
		if (horde == false)
		{
			arena = config.arena;
				if (arena != chat.messageinput)
				{arena = chat.messageinput ?? 1}
		console.log('ARENA:' , arena)
		world.sendMessage(`§4The current arena is${[arena]}`);
		}
		else 
		{
			arena = HORDE_ARENA;
				// if (arena != chat.messageinput)
				// {arena = chat.messageinput ?? 1}
		console.log('ARENA:' , arena)
		// world.sendMessage(`§4The current gametype is SLAYER. The current kill limit is ${[killlimit]}`);
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
		currentpvpobjective = world.scoreboard.getObjective("currentpvpmatchkills"); // set currentobjective to match the gametype
		console.log("Current PVP Objective:" , currentpvpobjective.objective);
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
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.currentpvpmatchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.currentpvpmatchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });

  const pvpplayers = world.getAllPlayers();
  // pvpplayercount = pvpplayers.hasTag('s3:pvp')?.length;

  for (player of pvpplayers) {	
		if (slayer == true && player.hasTag('s3:pvp'))
		{
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
		player.setGameMode("adventure");
		currentobjective.setScore(player, 0);
    // let inv = player.getComponent("inventory"); // as EntityInventoryComponent;
    // inv.container?.addItem(new ItemStack("diamond_sword"));
    // inv.container?.addItem(new ItemStack("bow"));
    // inv.container?.addItem(new ItemStack("crossbow"));
    // inv.container?.addItem(new ItemStack("arrow", 64));
    // inv.container?.addItem(new ItemStack("arrow", 64));
    // inv.container?.addItem(new ItemStack("arrow", 64));
		arenaSpawns();
		
		}

		if (slayer == true && !player.hasTag('s3:pvp'))
		{	
		currentobjective = world.scoreboard.getObjective("currentpvpmatchkills");
		// world.scoreboard.removeParticipant(player);
		currentobjective.removeParticipant(player);
		}
		
  }

  world.sendMessage(`§4SLAYER. Arena: ${[arena]} Kill Limit:${[killlimit]} Players: ${[pvpplayercount]}`);
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
			// currentpvpobjective.addScore(attacker, 1);
			currentpvpobjective.addScore(attacker, 1);
			scorecheckPVP()
			}
		}
	}
	else 
	{
		// console.log("PVP Started:", pvp_started);
	}
});


// Horde
export function setupHorde() {
	slayer = false; // TODO create fuction to reset all gametypes
		horde = true;
		console.log('horde:' , horde)
		world.sendMessage(`§4${"The current gametype is Horde."}`);
}

export function initializeHorde() {
	pvp_started = true;
		overworld.runCommandAsync(`gamerule mobGriefing false`); // disable creepers blowing up the arena

  // set up horde scoreboard
		currentpvpobjective = world.scoreboard.getObjective("currenthordematchkills"); // set currentobjective to match the gametype
		// console.log("Current PVP Objective:" , currentpvpobjective.objective);
		
		//add new objective
		if (!currentpvpobjective) {
		console.log("currentpvpobjective missing")
		}
		// Remove old pvpkills scoreboard objective
		world.scoreboard.removeObjective( tracker.trackers.currenthordematchkills.objective );
		// Add new pvpkills scoreboard objective
    world.scoreboard.addObjective(tracker.trackers.currenthordematchkills.objective, tracker.trackers.currenthordematchkills.display);

		// Display the current objective as the scoreboard
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.currenthordematchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.currenthordematchkillsObjective, sortOrder: ObjectiveSortOrder.Descending, });

  const pvpplayers = world.getAllPlayers();
  for (const player of pvpplayers) {	
		if (horde == true && player.hasTag('s3:pvp'))
		{
		currentobjective = world.scoreboard.getObjective("currenthordematchkills");
		player.setGameMode("adventure");
		currentobjective.setScore(player, 0);
		
			

    player.teleport(
      { x: config.HORDE_ARENA_X_LOC, y: config.HORDE_ARENA_Y_LOC, z: config.HORDE_ARENA_Z_LOC },
      { dimension: overworld, rotation: { x: 0, y: 0 }, }
    );
		
		player.addEffect("minecraft:raid_omen" , (20 * 1 ) ); // Add Raid Effect	(1 second)
		
		}

		if (horde == true && !player.hasTag('s3:pvp'))
		{
		currentobjective = world.scoreboard.getObjective("currenthordematchkills");
		currentobjective.removeParticipant(player);
		}
  }
  world.sendMessage("HORDE!");
}

var hordeid;
var hordename;
// Horde nameTagger
world.afterEvents.entitySpawn.subscribe((hordespawn) => {
	if (pvp_started == true && horde == true)
	{
	hordeid = hordespawn.entity.typeId;
    if (tracker.hordeMobs.indexOf(hordeid) > -1) {
		hordename = hordeid.replace("minecraft:", "horde ").replace("_", " ").replace("v2", "").replace("_", "").replace("evocation illager", "evoker");			
        hordespawn.entity.nameTag = (`§4${[hordename]}`);
				hordespawn.entity.addTag = 's3:horde';
				console.log("Horde pillagers spawned");
    }
	}
})

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
	var playersleepvaluepercent = (playersleepvalue * 100);
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
	playersleepvaluepercent = (playersleepvalue * 100);
	console.log('Player Sleep %:' , playersleepvaluepercent);	
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

// Joining Player clear leftover pvp tags
export var eventplayer;
// export var player;
world.afterEvents.playerJoin.subscribe(({ playerId, playerName }) => {
	// player = player;
	// joiningplayer = player.playerName;
	// system.run(() => { clearplayerPVP(); }) // clear old pvp tags
})

world.afterEvents.playerSpawn.subscribe((spawnData) => {
    let { player, initialSpawn } = spawnData;
    if (!initialSpawn) return;
		if (initialSpawn) { 
			eventplayer = spawnData.player
			clearplayerPVP()
		}
});