// import minecraft server modules
import { world, system, GameRules, GameRule, BlockTypes, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as config from './PVPUserConfig.js';
import * as chat from './PVPChatCommandHandler.js';
import * as pvp from './PVPArenaHandler.js';
// var scoreboardPrefix = "s3:";

export const Overworld = world.getDimension('overworld');
export const Nether = world.getDimension('nether');
export const TheEnd = world.getDimension('the_end');

// PVPArena Horde mobs (pillagers etc)
export var hordeMobs = [
  "minecraft:evocation_illager",
  "minecraft:pillager",
  "minecraft:ravager",
  "minecraft:vex",
  "minecraft:vindicator",
  "minecraft:witch"
];

export var hostileMobs = [
  "minecraft:blaze",
  "minecraft:creaking", // not yet implemented
  "minecraft:creeper",
  "minecraft:drowned",
  "minecraft:elder_guardian",
  "minecraft:enderman",
  "minecraft:endermite",
  "minecraft:evocation_illager",
  "minecraft:ghast",
  "minecraft:guardian",
  "minecraft:husk",
  "minecraft:magma_cube",
  "minecraft:phantom",
  "minecraft:piglin",
  "minecraft:piglin_brute",
  "minecraft:pillager",
  "minecraft:ravager",
  "minecraft:shulker",
  "minecraft:silverfish",
  "minecraft:skeleton",
  "minecraft:slime",
  "minecraft:spider",
  "minecraft:stray",
  "minecraft:vex",
  "minecraft:vindicator",
  "minecraft:witch",
  "minecraft:wither_skeleton",
  "minecraft:zombie",
  "minecraft:zombie_villager",
  "minecraft:zombie_villager",
  "minecraft:zombie_villager_v2",
  "minecraft:ender_dragon",
  "minecraft:warden",
  "minecraft:wither"
];

export var zombieMobs = [
  "minecraft:drowned",
  "minecraft:husk",
  "minecraft:zombie",
  "minecraft:zombie_villager",
  "minecraft:zombie_villager",
  "minecraft:zombie_villager_v2"
];

export var skeletonMobs = [
  "minecraft:skeleton",
  "minecraft:stray"
];

export var bossMobs = [
  "minecraft:elder_guardian", // id0
  "minecraft:ender_dragon", // id1
  "minecraft:warden", // id2
  "minecraft:wither" // id3
];

export var pvpMobs = [
  "s3:PVPBOT"
];

// Tracker Objectives
export var trackers = {
	allkills: {
    objective: "allkills",
    display: "Total Kills"
  },
  hordekills: {
    objective: "hordekills",
    display: "Horde Mob Kills"
  },
  hostilekills: {
    objective: "hostilekills",
    display: "Hostile Mob Kills"
  },
  zombiekills: {
    objective: "zombiekills",
    display: "Zombie Mob Kills"
  },
  bosskills: {
    objective: "bosskills",
    display: "Boss Kills"
  },
  elderkills: {
    objective: "elderkills",
    display: "Elder Guardian Kills"
  },
  dragonkills: {
    objective: "enddragonkills",
    display: "Ender Dragon Kills"
  },
  wardenkills: {
    objective: "wardenkills",
    display: "Warden Kills"
  },
  witherkills: {
    objective: "witherkills",
    display: "Wither Kills"
  },
  customkills: {
    objective: "customkills",
    display: "Custom Kills"
  },
	
	// Deaths
	playerdeaths: {
    objective: "playerdeaths",
    display: "Player Deaths"
  },
	
	totaldeaths: {
    objective: "totaldeaths",
    display: "Total Deaths"
  },	
	

// PVP Kills tracker Objectives
	playerkills: {
    objective: "playerkills",
    display: "Player Kills"
  },

	
// PVP Arena tracker Objectives
	// Current Match Kills - Slayer modes
	
		
  currentpvpmatchkills: {
    objective: "currentpvpmatchkills",
    display: "Current Match Kills"
  },	
	// Total player kills across all pvp matches
  totalpvpmatchkills: {
    objective: "totalpvpmatchkills",
    display: "PVP Match Kills"
  },
	// Total PVP mob kills (bots + mpbs)
	pvpmobkills: {
    objective: "pvpmobkills",
    display: "PVP Mob Kills"
  },
	// Total PVP match wins
  totalpvpmatchwins: {
    objective: "totalpvpmatchwins",
    display: "PVP Match Wins"
  },
	// CTF
  ctfscore: {
    objective: "ctfscore",
    display: "CTF Score"
  },
  ctfmatchwins: {
    objective: "ctfmatchwins",
    display: "CTF Wins"
  },

// Horde
		
  currenthordematchkills: {
    objective: "currenthordematchkills",
    display: "Current Horde Kills"
  },			
  hordewins: {
    objective: "hordewins",
    display: "Total Horde Wins"
  },	
	
//// Non Kill Trackers  Objectives

// Blocks Trackers Variables
// Block Placed 
	totalblocksplaced: {
    objective: "totalblocksplaced",
    display: "Total Blocks Placed"
  },
	creativeblocksplaced: {
    objective: "creativeblocksplaced",
    display: "Creative Blocks Placed"
  },
	survivalblocksplaced: {
    objective: "survivalblocksplaced",
    display: "Survival Blocks Placed"
  },
	overworldblocksplaced: {
    objective: "overworldblocksplaced",
    display: "Survival Blocks Placed (Overworld)"
  },
	netherblocksplaced: {
    objective: "netherblocksplaced",
    display: "Survival Blocks Placed (Nether)"
  },
	endblocksplaced: {
    objective: "endblocksplaced",
    display: "Survival Blocks Placed (End)"
  },

// Blocks Broken 
	totalblocksbroken: {
    objective: "totalblocksbroken",
    display: "Total Blocks Broken"
  },
	creativeblocksbroken: {
    objective: "creativeblocksbroken",
    display: "Creative Blocks Broken"
  },
	survivalblocksbroken: {
    objective: "survivalblocksbroken",
    display: "Survival Blocks Broken"
  },
	overworldblocksbroken: {
    objective: "overworldblocksbroken",
    display: "Survival Blocks Broken (Overworld)"
  },
	netherblocksbroken: {
    objective: "netherblocksbroken",
    display: "Survival Blocks Broken (Nether)"
  },
	endblocksbroken: {
    objective: "endblocksbroken",
    display: "Survival Blocks Broken (End)"
  },
	survivallogschopped: {
    objective: "survivallogschopped",
    display: "Survival Logs Chopped"
  },
	nethersurvivallogschopped: {
    objective: "nethersurvivallogschopped",
    display: "Survival Logs Chopped (Nether)"
  },
	
	
// Distance Trackers Objectives
		playerdistance: {
    objective: "playerdistance",
    display: "Total Distance"
  },	
		playerdistancewalk: {
    objective: "playerdistancewalk",
    display: "Walk Distance"
  },
		playerdistanceswim: {
    objective: "playerdistanceswim",
    display: "Swim Distance"
  },
		playerdistanceride: {
    objective: "playerdistanceride",
    display: "Ride Distance"
  },
	playerdistanceglide: {
    objective: "playerdistanceglide",
    display: "Glide Distance"
  },

		playerdistancefly: {
    objective: "playerdistancefly",
    display: "Fly Distance"
  }




};

// Tracker Objectives Variables
export var alltrackers = world.scoreboard.getObjectives();
// export var allstats = world.scoreboard.getObjectives();
export var currentdisplayObjective = "allkills";

export var allkillsObjective = world.scoreboard.getObjective("allkills");

export var hostilekillsObjective = world.scoreboard.getObjective("hostilekills");
export var zombiekillsObjective = world.scoreboard.getObjective("zombiekills");

export var bosskillsObjective = world.scoreboard.getObjective("bosskills");
export var elderkillsObjective = world.scoreboard.getObjective("elderkills");
export var dragonkillsObjective = world.scoreboard.getObjective("dragonkills");
export var wardenkillsObjective = world.scoreboard.getObjective("wardenkills");
export var witherkillsObjective = world.scoreboard.getObjective("witherkills");

export var customkillsObjective = world.scoreboard.getObjective("customkills");
export var playerkillsObjective = world.scoreboard.getObjective("playerkills");

export var playerdeathsObjective = world.scoreboard.getObjective("playerdeaths"); // Player deaths (excluding pvp arena)
export var totaldeathsObjective = world.scoreboard.getObjective("totaldeaths"); // Total player death (including PVP)
export var currentdeaths = 0; // used for calculating deaths

// PVP Arena Specific Objectives
export var currentpvpmatchkillsObjective = world.scoreboard.getObjective("currentpvpmatchkills");
export var currentpvpmatchdeathsObjective = world.scoreboard.getObjective("currentpvpmatcdeaths");
export var totalpvpmatchdeathsObjective = world.scoreboard.getObjective("totalpvpmatchkills"); // Total PVP deaths
export var totalpvpmatchkillsObjective = world.scoreboard.getObjective("totalpvpmatchkills");
export var pvpmobkillsObjective = world.scoreboard.getObjective("pvpmobkills");
export var totalpvpmatchwinsObjective = world.scoreboard.getObjective("totalpvpmatchwins");
export var ctfscoreObjective = world.scoreboard.getObjective("ctfscore");
// Horde
export var currenthordematchkillsObjective = world.scoreboard.getObjective("currenthordematchkills");
export var hordekillsObjective = world.scoreboard.getObjective("hordekills");
export var hordewinsObjective = world.scoreboard.getObjective("hordewins");
// Non Kill Trackers
// Blocks Trackers Objectives
// Blocks Placed
export var totalblocksplacedObjective = world.scoreboard.getObjective("totalblocksplaced"); // Total blocks placed (all modes/dimensions)
export var creativeblocksplacedObjective = world.scoreboard.getObjective("creativeblocksplaced"); // Total blocks placed (all modes/dimensions)
export var survivalblocksplacedObjective = world.scoreboard.getObjective("survivalblocksplaced"); // Total blocks placed (all modes/dimensions)
export var overworldblocksplacedObjective = world.scoreboard.getObjective("overworldblocksplaced"); // Total blocks placed in the overworld in survival
export var netherblocksplacedObjective = world.scoreboard.getObjective("netherblocksplaced"); // Total blocks placed in the nether in survival
export var endblocksplacedObjective = world.scoreboard.getObjective("endblocksplaced"); // Total blocks placed in the end in survival

// Blocks Broken
export var totalblocksbrokenObjective = world.scoreboard.getObjective("totalblocksbroken"); // Total blocks broken (all modes/dimensions)
export var creativeblocksbrokenObjective = world.scoreboard.getObjective("creativeblocksbroken"); // Total blocks broken in creative
export var survivalblocksbrokenObjective = world.scoreboard.getObjective("survivalblocksbroken"); // Total blocks broken in survival mode
export var overworldblocksbrokenObjective = world.scoreboard.getObjective("overworldblocksbroken"); // Total blocks broken in overworld survival mode
export var netherblocksbrokenObjective = world.scoreboard.getObjective("netherblocksbroken"); // Total blocks broken in the Nether survival mode
export var endblocksbrokenObjective = world.scoreboard.getObjective("endblocksbroken"); // Total blocks broken in the End survival mode

export var survivallogschoppedObjective = world.scoreboard.getObjective("survivallogschopped"); // Total logs chopped in survival mode
export var nethersurvivallogschoppedObjective = world.scoreboard.getObjective("nethersurvivallogschopped"); // Total logs chopped in the nether survival mode



// export var playerdistanceObjective = world.scoreboard.getObjective("playerdistance"); // Add the others together
// export var playerdistancewalkObjective = world.scoreboard.getObjective("minecraft.custom:minecraft.walk_one_cm");
// export var playerdistanceswimObjective = world.scoreboard.getObjective("minecraft.custom:swim_one_cm");
// export var playerdistancerideObjective = world.scoreboard.getObjective("playerdistanceride");
// export var playerdistanceglideObjective = world.scoreboard.getObjective("playerdistanceglide");
// export var playerdistanceflyObjective = world.scoreboard.getObjective("playerdistancefly");

// Death Counters
export var attacker;
world.afterEvents.entityDie.subscribe((death) => {

  const player = "minecraft:player";
	const victim = death.deadEntity;
  const victimname = victim.nameTag ?? victim.name;
  const victimid = death.deadEntity.typeId;
  const friendlyname = victimid.replace("minecraft:", "").replace("_", " ").replace("v2", "").replace("_", "");
	attacker = death.damageSource.damagingEntity;
	  if (!attacker ) {attacker = victim}
	
	if (victimid == "minecraft:player")
		// console.log("Player" , victimname , "died");
		// Death tracker		
		{
		if (attacker.hasTag('s3:pvp') && victim.hasTag('s3:pvp') && pvp.pvp_started == true) // PVP Death
		{
			console.log("Player" , victimname , "died in a PVP match");
			totalpvpmatchdeathsObjective?.addScore(victim, 1);
		}
		if (victimid == "minecraft:player" && !attacker.hasTag('s3:pvp') && !victim.hasTag('s3:pvp')) // Non PVP Death
		{
			console.log("Player" , victimname , "died");
			playerdeathsObjective?.addScore(victim, 1);
			// Death Announcer
			currentdeaths = 0;
			currentdeaths = playerdeathsObjective?.getScore(victim);
				if (currentdeaths == 1)
				{
					world.sendMessage(`§4${[victim.nameTag]} died for the first time!`); // Announce first death
					console.log("Player" , victimname , "died for the first time.");
				}
				if (config.showdeathboard == true) {
					system.run(() => {checkDisplay()}); // Check current displayed objective before displaying deaths
					system.runTimeout(() => {showDeaths();}, 10); // Show Death Count Function
					system.runTimeout(() => {refreshDisplay();}, 300); // Return to previous displayed objective
				}
		}
		}
			
});

// Kill Counters
world.afterEvents.entityDie.subscribe((death) => {


	const attacker = death.damageSource.damagingEntity;
  const player = "minecraft:player";
	if (!attacker || attacker.typeId !== player	) {return;}
  const tags = attacker.getTags();
	
	const victim = death.deadEntity;
  const victimname = death.deadEntity.nameTag;
  const id = death.deadEntity.typeId;
  const friendlyname = id.replace("minecraft:", "").replace("_", " ").replace("v2", "").replace("_", "").replace("evocation illager", "evoker");
	
	const	dimension = attacker.dimension.id
	  const dimensionname = dimension.replace("minecraft:", "");
		
	const mode = attacker.getGameMode();
	
	
	
	if (mode != "creative" || config.trackcreativekills == true )
	{
	// console.log (mode);
	// console.log ("Entity killed");
	

	if (id == "minecraft:player")
	{
		// Player Kill Counter
		if (id == "minecraft:player") {
			console.log(attacker.nameTag , "killed Player" , victimname);
			playerkillsObjective?.addScore(attacker, 1);
		}
		
	}
	
	// Hostile Mob Counters
  if (hostileMobs.indexOf(id) > -1) 
	{
		console.log(attacker.nameTag , "killed a hostile" , friendlyname);
		console.log(attacker.nameTag , "Hostile Kills Updated");
		
		// Boss Mob Counters
		if (bossMobs.indexOf(id) > -1) 
		{		
		console.log(attacker.nameTag , "killed a Boss!");
		// world.sendMessage(`§4${attacker.nameTag , "killed a Boss!"}`);
    bosskillsObjective?.addScore(attacker, 1);
		system.run(() => { bosskillBonus() }); // Boss Kill Bonus Handler Function
		
		system.run(() => {checkDisplay()}); // Check current displayed objective before displaying deaths
		system.runTimeout(() => {showBosskills();}, 10); // Show Death Count Function
		system.runTimeout(() => {refreshDisplay();}, 300); // Return to previous displayed objective
		
			// Elder Guardian Counter
		if (bossMobs.indexOf(id) == 0) {
		console.log(attacker.nameTag , "killed Elder Guardian");
		world.sendMessage(`§g${[attacker.nameTag]} killed Elder Guardian`);
    elderkillsObjective?.addScore(attacker, 1);
		} 
		// Ender Dragon Counter
		if (bossMobs.indexOf(id) == 1) {
		console.log(attacker.nameTag , "killed The Ender Dragon");
		world.sendMessage(`§g${[attacker.nameTag]} killed the Ender Dragon`);
    dragonkillsObjective?.addScore(attacker, 1);
		}
		// Warden Counter
		if (bossMobs.indexOf(id) == 2) {
		console.log(attacker.nameTag , "killed Warden");
		world.sendMessage(`§g${[attacker.nameTag]} killed Warden`);
    wardenkillsObjective?.addScore(attacker, 1);
		}
		// Wither Counter
		if (bossMobs.indexOf(id) == 3) {
		console.log(attacker.nameTag , "killed Wither");
		world.sendMessage(`§g${[attacker.nameTag]} killed Wither`);
    witherkillsObjective?.addScore(attacker, 1);
		}	
		}
	
		// Zombie Counters
		if (zombieMobs.indexOf(id) > -1) {
			zombiekillsObjective?.addScore(attacker, 1);
			console.log(attacker.nameTag , "Zombie Kills Updated");
		}		
		
		// Horde Counters
		if (hordeMobs.indexOf(id) > -1) {
		console.log(attacker.nameTag , "Horde Mob Killed");
			
			// Horde Match Kill Counter
			if (pvp.pvp_started == true && attacker.hasTag('s3:pvp'))
			{
				hordekillsObjective?.addScore(attacker, 1);
				console.log(attacker.nameTag , "Horde Kills Updated");
			
				currenthordematchkillsObjective?.addScore(attacker, 1);
				console.log(attacker.nameTag , "Current Horde Match Kills Updated");
			}
		}
  }




	
	// PVP Bot Kill Counter (PVP Bots)
  if (pvpMobs.indexOf(id) > -1) {
		console.log(attacker.nameTag ,  "killed PVP mob");
    pvpmobkillsObjective?.addScore(attacker, 1);
  }
	

	
	// CurrentMatch Kill Counter
  // if (tags.indexOf(id) > -1) {
		// console.log("Player killed Player in a PVP Match");
    // world.scoreboard.getObjective(tracker.currentpvpmatchkills.objective)?.addScore(attacker, 1);
  // }

	// Custom Mob Counter
  if (tags.indexOf(id) > -1) {
		console.log(attacker.nameTag , "killed custom tracker list mob");
    customkillsObjective?.addScore(attacker, 1);
  }
	
	// All Kills
  allkillsObjective?.addScore(attacker, 1);	
	console.log( attacker.nameTag , "All Kills Updated")
	console.log(attacker.nameTag , "killed a" , friendlyname , "in" , mode , "in" , dimensionname)
		
		// Chat kill announcements
		if (config.announceallkills == true)
		{
			if (id != "minecraft:player") { world.sendMessage(`${[attacker.nameTag]} killed a ${[friendlyname]}`) }
			if (id == "minecraft:player") { 
				world.sendMessage(`${[attacker.nameTag]} killed ${[victimname]}`);
				console.log(attacker.nameTag , "killed" , victimname , "in" , mode , "in" , dimensionname)
				}
		}	
		if (config.logallkills == true && config.announceallkills == false)
		{
			attacker.sendMessage(`${[attacker.nameTag]} killed a ${[friendlyname]}`);
		}


	}
	else { console.log("Creative mode kill not tracked"); }
  // world.scoreboard.getObjective(tracker.allkills.objective)?.addScore(attacker, 1);
	
});


// Distance trackers
// TODO implement new distance trackers
// scoreboard objectives add (score name) minecraft.custom:minecraft.walk_one_cm // statistics dont work in Bedrock

// Block Trackers
// Blocks Placed Tracker // TODO Split trackers into dimension and gamemmode
world.afterEvents.playerPlaceBlock.subscribe(({player, block, dimension}) => {

	// const overworldplayers = world.nether.getPlayers(options?: EntityQueryOptions)
	// const netherplayers = world.nether.getPlayers(options?: EntityQueryOptions)
	// const endplayers = world.nether.getPlayers(options?: EntityQueryOptions)

	const builder = player
	const buildername = player.nameTag;
  const blocktype = block.typeId ?? 'Invalid Block';
	  const blockname = blocktype.replace("minecraft:", "").replace("_", " ");
	const	dimension = builder.dimension.id
	  const dimensionname = dimension.replace("minecraft:", "");
	const mode = builder.getGameMode();
	
	system.run(() => {
	if (mode == "creative" )
	{
	creativeblocksplacedObjective?.addScore(builder, 1);	
	}
	if (mode == "survival" )
	{
		if (dimension == "minecraft:overworld" )
		{
		overworldblocksplacedObjective?.addScore(builder, 1);	
		}
		if (dimension == "minecraft:nether" )
		{
		netherblocksplacedObjective?.addScore(builder, 1);	
		}
		if (dimension == "minecraft:the_end" )
		{
		endblocksplacedObjective?.addScore(builder, 1);	
		}
	survivalblocksplacedObjective?.addScore(builder, 1);	
	}
	console.log( buildername , "placed" , blockname , "in" , dimensionname , "in" , mode ); 
	totalblocksplacedObjective?.addScore(builder, 1);	
	})
});

// Blocks Broken Tracker // TODO Split trackers into dimension and gamemmode
world.beforeEvents.playerBreakBlock.subscribe(({player, block, dimension}) => {

	const miner = player
	const minername = player.nameTag;
  const blocktype = block.typeId ?? 'Invalid Block';
	  const blockname = blocktype.replace("minecraft:", "").replace("_", " ");
		const blockstring = blockname.toString();
	const	dimension = player.dimension.id
	  const dimensionname = dimension.replace("minecraft:", "");
	const mode = player.getGameMode();
	
	const log = blockstring.includes("log");
	
	system.run(() => {
	if (mode == "creative" )
	{
	creativeblocksbrokenObjective?.addScore(miner, 1);	
	}
	if (mode == "survival" )
	{
		if (dimension == "minecraft:overworld" )
		{
		overworldblocksbrokenObjective?.addScore(miner, 1);
		console.log(minername , "overworld blocks broken updated");
			if (log == true) { 
				survivallogschoppedObjective?.addScore(miner, 1);
				console.log(minername , "logs chopped updated"); 
			}
		}
		if (dimension == "minecraft:nether" )
		{
		netherblocksbrokenObjective?.addScore(miner, 1);
		console.log(minername , "nether blocks broken updated");
			if (log == true) { 
				survivallogschoppedObjective?.addScore(miner, 1);
				console.log(minername , "total logs chopped updated"); 
				survivalnetherlogschoppedObjective?.addScore(miner, 1);
			}
		}
		if (dimension == "minecraft:the_end" )
		{
		endblocksbrokenObjective?.addScore(miner, 1);
		console.log(minername , "the end blocks broken updated");
		}
	survivalblocksbrokenObjective?.addScore(miner, 1);	
	}
	console.log( minername , "broke" , blockname , "in" , dimensionname , "in" , mode ); 
	totalblocksbrokenObjective?.addScore(miner, 1);	
	})
});
		


// INITILIZATION
// World initialize tracker
world.afterEvents.worldInitialize.subscribe((startup) => {
		initializeScoreboard(); //Initialize scoreboard at server startup
});
		
		
// Player Join initialize tracker
world.afterEvents.playerJoin.subscribe((newjoin) => {
  const player = world.getPlayers({ name: newjoin.playerName })[0];

	
  if (!player) {
    return;
  }
	
  for (let key in trackers) {
    const obj = trackers[key];
    const objective = world.scoreboard.getObjective(obj.objective);
    if (!objective) {
      continue;
    }
	system.run(() => {
    initializeScoreboard();	// Initialize scoreboard after player join
	})	
    objective.setScore(player, 0);
		
  }
		
});

// Player quit hide 
world.afterEvents.playerLeave.subscribe((player) => {
		const quitter = player.playerName;
		console.log(quitter , 'has left the game');
});



// FUNCTIONS
system.run(initializeScoreboard);

export async function initializeScoreboard() {
	console.log('Initializing Scoreboard');
  for (let key in trackers) {
    const obj = trackers[key];
    // const objective = world.scoreboard.getObjective(obj.objective);

    if (world.scoreboard.getObjective(obj.objective)) {
      continue;
    }
		
    const objective = world.scoreboard.addObjective(obj.objective, obj.display);
    world.getAllPlayers().forEach((p) => {
      objective.setScore(p, 0);
		console.log('Initializing' , [obj.display]);
    });
		
  }
			system.runTimeout(() => { checkDisplay() }, 5);
			system.runTimeout(() => { refreshDisplay() }, 25);	
}


export async function clearScoreboard() {
  for (let key in trackers) {
    const obj = trackers[key];
    const objective = world.scoreboard.getObjective(obj.objective);
		const player = world.scoreboard.getParticipants();


    world.scoreboard.removeObjective(objective);
		console.log('Removing all objectives from scoreboard list');

    // objective.removeParticipant(id: player);
		// console.log('Removing all players from scoreboard list');
    // world.getAllPlayers().forEach((player) => {
    // objective.removeParticipant(player);
		// console.log('Removing players from scoreboard list');
    // });
		
  }
	
	system.run(() => {
    initializeScoreboard();	// Initialize scoreboard after reset scores
	})	
}
// Get userconfig variable for default
export async function checkDisplay() {
	if (pvp.pvp_started == false)
	{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		if (currentdisplayObjective != null && currentdisplayObjective != undefined && world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective != playerdeathsObjective )
		{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		console.log("Current Objective:" , currentdisplayObjective.id);
		}
		else 
		{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		console.log("Setting Current Objective:" , currentdisplayObjective.id);		
		}
	}
}
// Set Scoreboard Display back to default 
export async function refreshDisplay() {
		if (currentdisplayObjective != null && currentdisplayObjective != undefined)
		{
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: currentdisplayObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: currentdisplayObjective, });
		console.log("Reset to default tracker" , currentdisplayObjective.id); 
		}
		else { 
		console.log("Default tracker invalid. Reset to all kills."); 
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
		}

}

// PVP Win Bonuses
export async function pvpheroBonus () {
				if ( config.pvpherobonus == true )
			{
				pvp.matchhighscoreplayer.addEffect("minecraft:village_hero" , (20 * 60 * 10) );
				console.log([pvp.matchhighscoreplayer.nameTag] , "is a Hero of the Village");
				return;
			}
}

export async function pvplootBonus () {
			if ( config.pvplootbonus == true )
			{
				// pvp.matchhighscoreplayer.addEffect("effect.villageHero");
				console.log([pvp.matchhighscoreplayer.nameTag] , "received bonus loot");
				return;
			}
}

export async function pvpxpwinBonus () {
			if ( config.pvpxpwinbonus == true )
			{
				pvp.matchhighscoreplayer.addExperience(100);
				console.log([pvp.matchhighscoreplayer.nameTag] , "received bonus xp");
				return;
			}
}

// Boss Kill Bonuses
export async function bosskillBonus () {
	console.log("Boss Kill Bonus Handler");
		bossheroBonus();
		bosslootBonus();
		bossxpkillBonus();
		return
}
export async function bossheroBonus () {
				if ( config.bossherobonus == true )
			{
				attacker.addEffect("minecraft:village_hero" , (20 * 60 * 60) );
				console.log([attacker.nameTag] , "is a Hero of the Village");
				return;
			}
}

export async function bosslootBonus () {
			if ( config.bosslootbonus == true )
			{
				// attacker.addEquipment("effect.villageHero");
				console.log([attacker.nameTag] , "received bonus loot");
				return;
			}
}

export async function bossxpkillBonus () {
			if ( config.bossxpkillbonus == true )
			{
				attacker.addExperience(100);
				console.log([attacker.nameTag] , "received bonus xp");
				return;
			}
}
// TODO kill bonus xp function

// Show Bosskills
export async function showBosskills() {
		console.log("SHOWING BOSS KILLS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: bosskillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: bosskillsObjective, });
}
// Show PVPWins
export async function showWins() {
	if (horde == true)
	{
		console.log("SHOWING HORDE WINS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalhordematchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalhordematchwinsObjective, });
	}
	if (horde != true)
	{
		console.log("SHOWING PVP WINS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalpvpmatchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalpvpmatchwinsObjective, });
	}

}

// Show Deaths
export async function showDeaths() {
		console.log("SHOWING DEATHS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: playerdeathsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: playerdeathsObjective, });
}

// Chat Logging (Private)
export async function startLogging() {
	logallkill = true;
}
export async function stopLogging() {
	logallkill = false;
}
// Chat Announcing (Public)
export async function startAnnouncing() {
	announceallkills = true;
}
export async function stopAnnouncing() {
	announceallkills = false;
}
		
		
