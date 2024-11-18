// import minecraft server modules
import { world, system, GameRules, GameRule, BlockTypes, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as pvp from './PVPArenaHandler.js';
import * as chat from './PVPChatCommandHandler.js';
import * as title from './PVPTitleHandler.js';
import * as config from './PVPUserConfig.js';

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
	// Kill Distance 
	longestdistkill: {
    objective: "longestdistkill",
    display: "Longest Kill Distance"
  },	
	longestdistmobkill: {
    objective: "longestdistmobkill",
    display: "Longest Mob Kill Distance"
  },
	longestdisthostilekill: {
    objective: "longestdisthostilekill",
    display: "Longest Hostile Mob Kill Distance"
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
// Player Kills tracker Objectives
	// Non-PVP Arena player kills
	playerkills: {
    objective: "playerkills",
    display: "Player Kills"
  },
	longestdistplayerkill: {
    objective: "longestdistplayerkill",
    display: "Longest Player Kill Distance"
  },
	
// PVP Arena tracker Objectives
	// Current Match Kills - Slayer modes
		
  currentpvpmatchkills: {
    objective: "currentpvpmatchkills",
    display: "Current Match Kills"
  },	
  totalpvpmatchkills: { // Total player kills across all pvp matches
    objective: "totalpvpmatchkills",
    display: "PVP Match Kills"
  },
  currentpvpmatchkilldist: {
    objective: "currentpvpmatchkilldist",
    display: "Current Match Longest Kill Distance"
  },
  longestdistpvpkill: {
    objective: "longestdistpvpkill",
    display: "Longest PVP Kill Distance"
  },
	// Total PVP mob kills (bots + mpbs)
	totalpvpmobkills: {
    objective: "totalpvpmobkills",
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
  totalctfscore: {
    objective: "totalctfscore",
    display: "CTF Flags Captured"
  },
  totalctfmatchwins: {
    objective: "totalctfmatchwins",
    display: "CTF Wins"
  },

// Horde
		
  currenthordematchkills: {
    objective: "currenthordematchkills",
    display: "Current Horde Kills"
  },
  currenthordematchkilldist: {
    objective: "currenthordematchkilldist",
    display: "Current Horde Match Kill Distance"
  },
  longestdisthordekill: {
    objective: "longestdisthordekill",
    display: "Longest Horde Kill Distance"
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

	// Rails Placed 
	totalrailsplaced: {
    objective: "totalrailsplaced",
    display: "Total Rails Placed"
		},
		
	creativerailsplaced: {
    objective: "creativerailsplaced",
    display: "Creative Rails Placed"
		},
		
	survivalrailsplaced: {
    objective: "survivalrailsplaced",
    display: "Survival Rails Placed"
		},
	overworldrailsplaced: {
    objective: "overworldrailsplaced",
    display: "Survival Overworld Rails Placed"
		},
	netherrailsplaced: {
    objective: "netherrailsplaced",
    display: "Survival Nether Rails Placed"
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
	// Logs Chopped
	survivallogschopped: {
    objective: "survivallogschopped",
    display: "Survival Logs Chopped"
  },
	nethersurvivallogschopped: {
    objective: "nethersurvivallogschopped",
    display: "Survival Logs Chopped (Nether)"
  },

	// Ores Mined
	survivaloresmined: {
    objective: "survivaloresmined",
    display: "Survival Ores Mined"
  },
	nethersurvivaloresmined: {
    objective: "nethersurvivaloresmined",
    display: "Survival Ores Mined (Nether)"
  },
		// Ore Types
	copperoresmined: {
    objective: "copperoresmined",
    display: "Survival Copper Ores Mined"
  },
	ironoresmined: {
    objective: "ironoresmined",
    display: "Survival Iron Ores Mined"
  },
	goldoresmined: {
    objective: "goldoresmined",
    display: "Survival Gold Ores Mined"
  },
	diamondoresmined: {
    objective: "diamondoresmined",
    display: "Survival Diamond Ores Mined"
  },
	copperoresmined: {
    objective: "netheriteoresmined",
    display: "Survival Ancient Debris Mined"
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
export var score;

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
// Kill Distance Objectives
export var longestdistkillObjective = world.scoreboard.getObjective("longestdistkill");
export var longestdistmobkillObjective = world.scoreboard.getObjective("longestdistmobkill");
export var longestdisthostilekillObjective = world.scoreboard.getObjective("longestdisthostilekill");
export var longestdistplayerkillObjective = world.scoreboard.getObjective("longestdistplayerkill");
// Player Death Objectives
export var playerdeathsObjective = world.scoreboard.getObjective("playerdeaths"); // Player deaths (excluding pvp arena)
export var totaldeathsObjective = world.scoreboard.getObjective("totaldeaths"); // Total player death (including PVP)
export var currentdeaths = 0; // used for calculating deaths

// PVP Arena Specific Objectives
// Current PVP Match Objectives
export var currentpvpmatchkillsObjective = world.scoreboard.getObjective("currentpvpmatchkills");
export var currentpvpmatchdeathsObjective = world.scoreboard.getObjective("currentpvpmatcdeaths");
export var currentpvpmatchkilldistObjective = world.scoreboard.getObjective("currentpvpmatchkilldist"); // Longest distance kill in current pvp match

// PVP Arena Total Match Stat Objectives
export var totalpvpmatchdeathsObjective = world.scoreboard.getObjective("totalpvpmatchkills"); // Total PVP deaths
export var totalpvpmatchkillsObjective = world.scoreboard.getObjective("totalpvpmatchkills"); // Total PVP kills
export var totalpvpmobkillsObjective = world.scoreboard.getObjective("totalpvpmobkills");
export var longestdistpvpkillObjective = world.scoreboard.getObjective("longestdistpvpkill"); // Longest Distance Kills (all PVP)
// Wins Objectives
export var totalpvpmatchwinsObjective = world.scoreboard.getObjective("totalpvpmatchwins"); // Total PVP wins
export var totalslayermatchwinsObjective = world.scoreboard.getObjective("totalslayermatchwins"); // Total Slayer wins
export var totalctfmatchwinsObjective = world.scoreboard.getObjective("totalctfmatchwins"); // Total CTF wins
export var hordewinsObjective = world.scoreboard.getObjective("hordewins"); // Total Horde wins
// CTF Objectives
export var ctfscoreObjective = world.scoreboard.getObjective("ctfscore"); // Current CTF Score
export var totalctfscoreObjective = world.scoreboard.getObjective("totalctfscore"); // Total CTF Score all matches
// Horde Objectives
export var currenthordematchkillsObjective = world.scoreboard.getObjective("currenthordematchkills");
export var currenthordematchkilldistObjective = world.scoreboard.getObjective("currenthordematchkilldist"); // Longest distance kill in current horde match
export var hordekillsObjective = world.scoreboard.getObjective("hordekills"); // Total Horde kills
export var longestdisthordekillObjective = world.scoreboard.getObjective("longestdisthordekill");

// Non Kill Trackers
// Blocks Trackers Objectives
// Blocks Placed
export var totalblocksplacedObjective = world.scoreboard.getObjective("totalblocksplaced"); // Total blocks placed (all modes/dimensions)
export var creativeblocksplacedObjective = world.scoreboard.getObjective("creativeblocksplaced"); // Total blocks placed (all modes/dimensions)
export var survivalblocksplacedObjective = world.scoreboard.getObjective("survivalblocksplaced"); // Total blocks placed (all modes/dimensions)
export var overworldblocksplacedObjective = world.scoreboard.getObjective("overworldblocksplaced"); // Total blocks placed in the overworld in survival
export var netherblocksplacedObjective = world.scoreboard.getObjective("netherblocksplaced"); // Total blocks placed in the nether in survival
export var endblocksplacedObjective = world.scoreboard.getObjective("endblocksplaced"); // Total blocks placed in the end in survival

// Rail Blocks Placed
export var totalrailsplacedObjective = world.scoreboard.getObjective("totalrailsplaced"); // Total rails placed (all modes + dimensions)
export var survivalrailsplacedObjective = world.scoreboard.getObjective("survivalrailsplaced"); // Total rails placed in survival
export var overworldrailsplacedObjective = world.scoreboard.getObjective("overworldrailsplaced"); // Total rails placed in the overworld survival
export var netherrailsplacedObjective = world.scoreboard.getObjective("netherrailsplaced"); // Total rails placed in the nether survival
export var creativerailsplacedObjective = world.scoreboard.getObjective("creativerailsplaced"); // Total rails placed in creative

// Blocks Broken
export var totalblocksbrokenObjective = world.scoreboard.getObjective("totalblocksbroken"); // Total blocks broken (all modes/dimensions)
export var creativeblocksbrokenObjective = world.scoreboard.getObjective("creativeblocksbroken"); // Total blocks broken in creative
export var survivalblocksbrokenObjective = world.scoreboard.getObjective("survivalblocksbroken"); // Total blocks broken in survival mode
export var overworldblocksbrokenObjective = world.scoreboard.getObjective("overworldblocksbroken"); // Total blocks broken in overworld survival mode
export var netherblocksbrokenObjective = world.scoreboard.getObjective("netherblocksbroken"); // Total blocks broken in the Nether survival mode
export var endblocksbrokenObjective = world.scoreboard.getObjective("endblocksbroken"); // Total blocks broken in the End survival mode

 // Logs Chopped
export var survivallogschoppedObjective = world.scoreboard.getObjective("survivallogschopped"); // Total logs chopped in survival mode
export var nethersurvivallogschoppedObjective = world.scoreboard.getObjective("nethersurvivallogschopped"); // Logs chopped in Nether survival
 // Ores Mines
export var survivaloresminedObjective = world.scoreboard.getObjective("survivaloresmined"); // Total ores mined in survival mode
export var nethersurvivaloresminedObjective = world.scoreboard.getObjective("nethersurvivaloresmined"); // Total ores mined in the nether survival mode

export var copperoresminedObjective = world.scoreboard.getObjective("copperoresmined"); // Total copper ores mined survival mode
export var ironoresminedObjective = world.scoreboard.getObjective("ironoresmined"); // Total iron ores mined survival mode
export var goldoresminedObjective = world.scoreboard.getObjective("goldoresmined"); // Total gold ores mined survival mode
export var diamondoresminedObjective = world.scoreboard.getObjective("diamondoresmined"); // Total diamond ores mined survival mode
export var netheriteoresminedObjective = world.scoreboard.getObjective("netheriteoresmined"); // Total netherite ores mined survival mode

// export var playerdistanceObjective = world.scoreboard.getObjective("playerdistance"); // Add the others together
// export var playerdistancewalkObjective = world.scoreboard.getObjective("minecraft.custom:minecraft.walk_one_cm");
// export var playerdistanceswimObjective = world.scoreboard.getObjective("minecraft.custom:swim_one_cm");
// export var playerdistancerideObjective = world.scoreboard.getObjective("playerdistanceride");
// export var playerdistanceglideObjective = world.scoreboard.getObjective("playerdistanceglide");
// export var playerdistanceflyObjective = world.scoreboard.getObjective("playerdistancefly");

// Kill/Death Trackers
export var attacker;
export var victim;
export var player;
export var mode;
export var decimal = ".";
//TODO CURRENT kill distance tracker function
world.afterEvents.entityDie.subscribe((death) => {
	victim = death.deadEntity; // redefine initilized victim var
	if ( !victim ) { return }; // end if victim invalid
	victim = {								// redefine victim var properties
		victim: death.deadEntity,
		id: victim.id,
		type: victim.typeId,
			friendlytype: victim.typeId.replace("minecraft:", "").replace("_", " ").replace("v2", "").replace("_", ""), // readable entity type
		// name: victim.nameTag ?? victim.name,
		name: victim.name,
		loc: {
			// x: Math.trunc(victim.location.x),
			x: Math.trunc(victim.location.x),
				xlong: Math.fround(victim.location.x),
			y: Math.trunc(victim.location.y),
				ylong: Math.fround(victim.location.y),
			z: Math.trunc(victim.location.z),
				zlong: Math.fround(victim.location.z),
			full: [ Math.trunc(victim.location.x) , Math.trunc(victim.location.y) , Math.trunc(victim.location.z) , victim.dimension.id.replace("minecraft:", "") ].toString().replaceAll(",", ", ")
		},
		dimension: {
			id: victim.dimension.id,
			name: victim.dimension.id.replace("minecraft:", "")
		},
		tags: victim.getTags(),
			pvp: victim.hasTag('s3:pvp')
		// mode: victim.getGameMode() ?? world.getGameMode()
	}
	attacker = death.damageSource.damagingEntity; // redefine initilized attacker var
	if ( !attacker ) { attacker = victim.victim } // if there is no attacker, consider the victim as attacker
	attacker = {																	// redefine attacker var properties
		attacker: death.damageSource.damagingEntity,
		id: attacker.id,
		type: attacker.typeId,
			friendlytype: attacker.typeId.replace("minecraft:", "").replaceAll("_", " ").replace("v2", ""), // readable entity type
		// name: attacker.nameTag ?? attacker.name,
		name: attacker.name,
		loc: {
			x: Math.trunc(attacker.location.x),
				xlong: Math.fround(attacker.location.x),
			y: Math.trunc(attacker.location.y),
				ylong: Math.fround(attacker.location.y),
			z: Math.trunc(attacker.location.z),
				zlong: Math.fround(attacker.location.z),
			full: [Math.trunc(attacker.location.x) , Math.trunc(attacker.location.y) , Math.trunc(attacker.location.z) , attacker.dimension.id.replace("minecraft:", "") ].toString().replaceAll(",", ", ")
		},
		dimension: {
			id: attacker.dimension.id,
			name: attacker.dimension.id.replace("minecraft:", "")
		},
		// mode: attacker.getGameMode() ?? "minecraft:survival",
		tags: attacker.getTags(),
			pvp: attacker.hasTag('s3:pvp'),
		cause: death.damageSource.cause,
	}

	if (victim.type == "minecraft:player" || attacker.type == "minecraft:player" ) { // only run if victim is a player
		if ( victim.type == "minecraft:player" ) { console.log("Player Killed") };	// mode = victim.victim.getGameMode();
		if ( attacker.type == "minecraft:player" ) { console.log("Player Kill") };
			// mode = attacker.attacker.getGameMode();
		deathCheck()
		killCheck()
		killLogger()
		}
// Kill Trackers
	// if (!attacker || attacker.type !== "minecraft:player" || attacker == victim.victim	) {return;} // stop if the attacker is not a player or the attacker is the victim 
  // const tags = attacker.getTags();
	// var mode = attacker.getGameMode();
	
	
  // world.scoreboard.getObjective(tracker.allkills.objective)?.addScore(attacker.attacker, 1);
	
});

export async function killLogger() {
	console.log("KILL LOGGER");
		// Chat kill announcements (public)
		if (config.announceallkills == true)
		{
			if (attacker.id != "minecraft:player")
			{ 
				if (victim.friendlytype.startsWith("a") || victim.friendlytype.startsWith("e") || victim.friendlytype.startsWith("i") || victim.friendlytype.startsWith("o") || victim.friendlytype.startsWith("u") )  // vowel
				{ world.sendMessage(`${[attacker.name]} killed an ${[victim.friendlytype]}(${[killdist.total]}m)`) }
				else // consonant
				{ world.sendMessage(`${[attacker.name]} killed a ${[victim.friendlytype]} ${[victim.name]}(${[killdist.total]}m)`) }
			}
			
			if (attacker.id == "minecraft:player") {
				world.sendMessage(`${[attacker.name]} killed ${[victimname]}`);
				console.log(attacker.name , "killed" , victim.name , "in" , mode , "in" , victim.dimension.name)
			}
		}
		
		if (config.logallkills == true && config.announceallkills == false)
		{
			if (victim.friendlytype.startsWith("a") || victim.friendlytype.startsWith("e") || victim.friendlytype.startsWith("i") || victim.friendlytype.startsWith("o") || victim.friendlytype.startsWith("u") )  // vowel
			{ attacker.sendMessage(`${[attacker.name]} killed an ${[victim.friendlytype]}`) }
			else // consonant
			{ attacker.sendMessage(`${[attacker.name]} killed a ${[victim.friendlytype]} ${[victim.name]} `) }
		}
}

// Distance trackers TODO implement new distance trackers
// scoreboard objectives add (score name) minecraft.custom:minecraft.walk_one_cm // statistics dont work in Bedrock
	// var player;
	var	builder;
	 var buildername; 
	var miner;
		var minername
  var blocktype;
	  var blockname;
		var blockstring;
	var	dimension;
		var dimensionname;
	var mode;
// Block Trackers
var railplaced = false;
// Blocks Placed Tracker // TODO Split trackers into dimension and gamemmode
world.afterEvents.playerPlaceBlock.subscribe(({player, block, dimension}) => {

	// const overworldplayers = world.nether.getPlayers(options?: EntityQueryOptions)
	// const netherplayers = world.nether.getPlayers(options?: EntityQueryOptions)
	// const endplayers = world.nether.getPlayers(options?: EntityQueryOptions)

	builder = player
	 buildername = player.nameTag;
		blocktype = block.typeId ?? 'Invalid Block';
	   blockname = blocktype.replace("minecraft:", "").replace("_", " ");
		 blockstring = blockname.toString();
		dimension = player.dimension.id
	   dimensionname = dimension.replace("minecraft:", "");
		mode = player.getGameMode();
	
	railplaced = blockstring.includes("rail");
	
	system.run(() => {
	if (mode == "creative" )
	{
	creativeblocksplacedObjective?.addScore(player, 1);
		railplacedCheck();
	}
	if (mode == "survival" )
	{
	survivalblocksplacedObjective?.addScore(player, 1);	
	survivalblockplacedCheck();
	}
	console.log( buildername , "placed" , blockname , "in" , dimensionname , "in" , mode ); 
	totalblocksplacedObjective?.addScore(player, 1);	
	})
});


// Blocks Broken Tracker // TODO Split trackers into dimension and gamemmode

	var spawnerbroke;
	var logbroke;
	var oremined;
		var coppermined;
		var ironmined;
		var goldmined;
		var diamondmined;
		var netheritemined;
	
world.beforeEvents.playerBreakBlock.subscribe(({player, block, dimension}) => {

	miner = player;
	miner = {
		id: player.id,
		name: player.nameTag,
		block: {
			type: block.typeId ?? 'Invalid Block',
			name: block.typeId.replace("minecraft:", "").replace("_", " "),
			string: block.typeId.replace("minecraft:", "").replace("_", " ").toString(),
			loc: {
				x: block.location.x,
					xstring: block.location.x.toString(),
				y: block.location.y,
				z: block.location.z,
					full: [ block.location.x , block.location.y , block.location.z , block.dimension.id.replace("minecraft:", "") ].toString().replaceAll(",", ", ")
				}
		},
	dimension: { //attacker.dimension.id,
			name: player.dimension.id.replace("minecraft:", "")
		},
		mode: player.getGameMode(),
	}
	logbroke = miner.block.string.includes("log");
	oremined = miner.block.string.includes("ore");	
		coppermined = miner.block.string.includes("copper ore");
		ironmined = miner.block.string.includes("iron ore");
		goldmined = miner.block.string.includes("gold ore");
		diamondmined = miner.block.string.includes("diamond ore");
		netheritemined = miner.block.string.includes("ancient debris");
	

	system.run(() => {
	if (mode == "creative" )
	{
	creativeblocksbrokenObjective?.addScore(player, 1);	
	}
	if (mode == "survival" )
	{
	survivalblocksbrokenObjective?.addScore(player, 1);	
	survivalblockbrokenCheck();
	}
	console.log( miner.name , "broke" , miner.block.name , "at" , miner.block.loc.full , "in" , miner.mode ); 
	totalblocksbrokenObjective?.addScore(player, 1);	
	})
});

// INITILIZATION
// World initialize tracker
world.afterEvents.worldInitialize.subscribe((startup) => {
		initializeScoreboard(); // Initialize scoreboard at server startup
		leaderCheck();
		title.titleCheck();
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

	// PVP Functions
	// PVP Win Bonuses
export async function pvpheroBonus() {
				if ( config.pvpherobonus == true ) {
				pvp.matchhighscoreplayer.addEffect("minecraft:village_hero" , (20 * 60 * 10) );
				console.log([pvp.matchhighscoreplayer.nameTag] , "is a Hero of the Village");
				return;
			}
}
export async function pvplootBonus() {
			if ( config.pvplootbonus == true ) {
				// pvp.matchhighscoreplayer.addEffect("effect.villageHero");
				console.log([pvp.matchhighscoreplayer.nameTag] , "received bonus loot");
				return;
			}
}
export async function pvpxpwinBonus() {
			if ( config.pvpxpwinbonus == true ) {
				pvp.matchhighscoreplayer.addExperience(100);
				console.log([pvp.matchhighscoreplayer.nameTag] , "received bonus xp");
				return;
			}
}
// Kill Functions
	// Kill Check
export async function killCheck() {
		if (attacker.type == "minecraft:player") {
	// if (config.debuglog == true) { console.log("KILL CHECK") }
		if (config.debuglog == true) { console.log("KILL CHECK") }
		
		killDistanceCheck()

		if (attacker.type == "minecraft:player" && attacker.id != victim.id) { 
		console.log("PLAYER KILL");
		player = attacker.attacker;
		mode = player.getGameMode(); //?? "survival";
		}
		
		// mode = victim.victim.getGameMode(); //?? 
		if (attacker.id == victim.id) { console.log("SELF KILL NOT TRACKED") };
			
	if (mode != "creative" || config.trackcreativekills == true ) { // Only track if killer gamemmode is not creative or trackcreativekills is true
	if (attacker.id != victim.id) { // Only track kill if the entity id of attacker and victim ar enot the same
		console.log("TRACK KILL");
		console.log(mode);
		
		// console.log(hostileMobs.indexOf(victim.type));
		
	// Player Kill Counter	
	if (victim.type == "minecraft:player" && attacker.type == "minecraft:player" && attacker.id != victim.id) {
			console.log(attacker.name , "killed" , victim.name);
			playerkillsObjective?.addScore(attacker.attacker, 1);

	}
	// Hostile Mob Counters
  if (hostileMobs.indexOf(victim.type) > -1) {
		hostilekillsObjective?.addScore(attacker.attacker, 1);
		score = hostilekillsObjective?.getScore(attacker.attacker);
		console.log(attacker.name , "killed hostile" , victim.friendlytype, "hostile kills" , score);
		
		// Boss Mob Counters
		if (bossMobs.indexOf(victim.type) > -1) {		
		console.log(attacker.name , "killed a Boss!");
    bosskillsObjective?.addScore(attacker.attacker, 1);
		system.run(() => { bosskillBonus() }); // Boss Kill Bonus Handler Function
		system.run(() => { checkDisplay() }); // Check current displayed objective before displaying boss kills
		system.runTimeout(() => { showBosskills(); }, 10); // Show Death Count Function
		system.runTimeout(() => { refreshDisplay(); }, 300); // Return to previous displayed objective
			// Elder Guardian Counter
			if (bossMobs.indexOf(victim.type) == 0) {
			console.log(attacker.name , "killed Elder Guardian");
			world.sendMessage(`§g${[attacker.name]} killed Elder Guardian`);
			elderkillsObjective?.addScore(attacker.attacker, 1);
			} 
			// Ender Dragon Counter
			if (bossMobs.indexOf(victim.type) == 1) {
			console.log(attacker.name , "killed The Ender Dragon");
			world.sendMessage(`§g${[attacker.name]} killed the Ender Dragon`);
			dragonkillsObjective?.addScore(attacker.attacker, 1);
			}
			// Warden Counter
			if (bossMobs.indexOf(victim.type) == 2) {
			console.log(attacker.name , "killed Warden");
			world.sendMessage(`§g${[attacker.name]} killed Warden`);
			wardenkillsObjective?.addScore(attacker.attacker, 1);
			}
			// Wither Counter
			if (bossMobs.indexOf(victim.type) == 3) {
			console.log(attacker.name , "killed Wither");
			world.sendMessage(`§g${[attacker.name]} killed Wither`);
			witherkillsObjective?.addScore(attacker.attacker, 1);
			}
		}
		// Zombie Counters
		if (zombieMobs.indexOf(victim.type) > -1) {
			zombiekillsObjective?.addScore(attacker.attacker, 1);
			console.log(attacker.name , "Zombie Kills" , score);
		}		
		// Horde Counters
		if (hordeMobs.indexOf(victim.type) > -1) {
		console.log(attacker.name , "Horde Mob Killed");
			// Horde Match Kill Counter
			if (pvp.pvp_started == true && attacker.pvp == true) {
				hordekillsObjective?.addScore(attacker.attacker, 1);
				score = hordekillsObjective?.getScore(attacker.attacker);
				console.log(attacker.name , "Horde Kills" , score);
				currenthordematchkillsObjective?.addScore(attacker.attacker, 1);
				score = currenthordematchkillsObjective?.getScore(attacker.attacker);
				console.log(attacker.name , "Current Horde Match Kills" , score);
			}
		}
  }

	// PVP Bot Kill Counter (PVP Bots)
  if (pvpMobs.indexOf(victim.type) > -1) {
		console.log(attacker.name ,  "killed PVP mob");
    totalpvpmobkillsObjective?.addScore(attacker.attacker, 1);
  }

	// Custom Mob Counter
  // if (custommobs.indexOf(victim.type.toString()) > -1) {
		// console.log(attacker.name , "killed custom tracker list mob");
    // customkillsObjective?.addScore(attacker.attacker, 1);
  // }
	
	// All Kills
	// console.log( attacker.name , "killed" , victim.friendlytype , victim.loc.full , "kills" , score ) // debug
  allkillsObjective?.addScore(attacker.attacker, 1);
	console.log( "SCORE ADDED" ); // debug
	score = allkillsObjective?.getScore(attacker.attacker);
	console.log( attacker.name , "killed" , victim.friendlytype , "in" , mode , victim.loc.full , killdist.total,"m", "total kills" , score );
	
		currenttracker = allkillsObjective; // set currenttracker before calling leadercheck
			forceannounce = false;
		leaderCheck();
	}
	}
	else { console.log("Creative mode kill not tracked") }
	}
}	
 // Kill Distance Check Function
export var killdist; 
 export var forceannounce = false;
export async function killDistanceCheck() {
	while (config.debuglog == true) { console.log("KILL DISTANCE CHECK");
		break }
			
		killdist = {
			x: Math.abs(victim.loc.xlong - attacker.loc.xlong),
			y: Math.abs(victim.loc.ylong - attacker.loc.ylong), // Vertical
			z: Math.abs(victim.loc.zlong - attacker.loc.zlong),
			total: Math.round( Math.sqrt( Math.pow( Math.abs(victim.loc.xlong - attacker.loc.xlong), 2) + Math.pow( Math.abs(victim.loc.ylong - attacker.loc.ylong), 2) + Math.pow( Math.abs(victim.loc.zlong - attacker.loc.zlong), 2) ) ),
			totallong: Math.sqrt( Math.pow( Math.abs(victim.loc.xlong - attacker.loc.xlong), 2) + Math.pow( Math.abs(victim.loc.ylong - attacker.loc.ylong), 2) + Math.pow( Math.abs(victim.loc.zlong - attacker.loc.zlong), 2) )
		}

	console.log( "vertical dist" , killdist.y, "total dist" , killdist.total );

	if (victim.type == "minecraft:player") { // Player Kill Distnace
				score = longestdistplayerkillObjective?.getScore(attacker.attacker);
				console.log(attacker.name , "Old Longest Distance Player Kill" , score );
				if (killdist.total > score) {	longestdistplayerkillObjective?.setScore(attacker.attacker, killdist.total) }
				score = longestdistplayerkillObjective?.getScore(attacker.attacker);
				console.log(attacker.name , "Longest Distance Player Kill" , score , "(" , killdist.total , ")" );	
				
				// if ( )
				// {
					// currentpvpmatchkilldistObjective
					// longestdistpvpkillObjective
					
				// }
	// }
	}
	
	if (victim.type != "minecraft:player") { // Non Player Kill Distance
				score = longestdistmobkillObjective?.getScore(attacker.attacker);
				// console.log(attacker.name , "Old Longest Distance Mob Kill" , score );
					if (killdist.total > score) {	longestdistmobkillObjective?.setScore(attacker.attacker, killdist.total) }
				score = longestdistmobkillObjective?.getScore(attacker.attacker);
				// console.log(attacker.name , "Longest Distance Mob Kill" , score , "(" , killdist.total , ")" );

				if (hostileMobs.indexOf(victim.type) > -1) { // Hostile Mobs
					score = longestdisthostilekillObjective?.getScore(attacker.attacker);
					// console.log(attacker.name , "Old Longest Distance Hostile Kill" , score );
						if (killdist.total > score) {	longestdisthostilekillObjective?.setScore(attacker.attacker, killdist.total) }
					score = longestdisthostilekillObjective?.getScore(attacker.attacker);
					// console.log(attacker.name , "Longest Distance Hostile Kill" , score , "(" , killdist.total , ")" );
				}
	}
	// All Kills Distance
			score = longestdistkillObjective?.getScore(attacker.attacker);
			// console.log(attacker.name , "Old Longest Distance Kill" , score );
				if (killdist.total > score) {
					longestdistkillObjective?.setScore(attacker.attacker, killdist.total);
					score = longestdistkillObjective?.getScore(attacker.attacker);
					console.log(attacker.name , "NEW Personal Longest Distance Kill" , score,"m" );
					attacker.attacker.sendMessage(`${[attacker.name]} New Personal Longest Kill Distance ${[score]}m`);
					
					currenttracker = longestdistkillObjective; // set currenttracker before calling leadercheck
						forceannounce = true; // force announcing updates to current tracker
					leaderCheck();
					}
			score = longestdistkillObjective?.getScore(attacker.attacker);
			console.log(attacker.name , "Longest Distance Kill" , score ,"m" , "(",killdist.total,")" );				
	// TODO CURRENT	split distance trackers to pvp modes etc
}

export var currenttracker;
export var currentscore;
export var highscore = 0;
export var oldhighscore = 0;
export var trackerhighscoreplayer;
export var previoustrackerhighscoreplayer;
export var scoreArray; 
var allplayers = world.getAllPlayers();

export async function leaderCheck() { // TODO CURRENT split leadercheck into initial (all) and currentobjective
	if (config.debuglog == true) { console.log("TRACKER LEADER CHECK") }
	// const allplayers = world.getAllPlayers();
	if (!currenttracker) {
	leaderCheckGeneric() 
	}
	else {
	for (const player of allplayers) {
		if (!player) {
			if (config.debuglog == true) { console.log("LEADER CHECK:" , "player undefined") }
      return }
			
		currentscore = currenttracker.getScore(player);
		console.log("LEADER CHECK:" , [currenttracker.displayName] , [player.nameTag] , "Current Score:" , [currentscore] );
		trackerhighscoreplayer = previoustrackerhighscoreplayer;
	if (currentscore > oldhighscore)
			{
				oldhighscore = highscore; // store the old highscore
				highscore = currentscore; // set higscore to currentscore
				previoustrackerhighscoreplayer = trackerhighscoreplayer; // store the old score leader
				trackerhighscoreplayer = player; // set the new leader
				
				if (previoustrackerhighscoreplayer != trackerhighscoreplayer)
				{ console.log("LEADER CHECK:" , "NEW Leader:" , [player.nameTag] , "High Score:" , [highscore] , "( +" , [highscore - oldhighscore] , ")" ) }
				else { console.log("LEADER CHECK:" , "Leader:" , [trackerhighscoreplayer.nameTag] , "NEW High Score:" , [highscore] , "( +" , [highscore - oldhighscore] , ")" ) }
				announceCheck()
			}
	else if (currentscore <= oldhighscore) { console.log("LEADER CHECK:" , [currenttracker.displayName] , "Current Score:" , [currentscore] , "Leader:" , [trackerhighscoreplayer.nameTag]) }
	// announceCheck()
	// oldhighscore = 0;
	}
	
	}
}
export async function leaderCheckGeneric() { // TODO CURRENT split leadercheck into initial (all) and currentobjective
	if (config.debuglog == true) { console.log("TRACKER LEADER CHECK GENERIC") }
	// const allplayers = world.getAllPlayers();
	for (let key in trackers) {
    const obj = trackers[key];
    const objective = world.scoreboard.getObjective(obj.objective);
		currenttracker = objective;
    if (!objective) {
      continue;
    }
	// }
	
	for (const player of allplayers) {
		if (!player) {
			if (config.debuglog == true) { console.log("LEADER CHECK:" , "player undefined") }
      return }
			
		currentscore = currenttracker.getScore(player);
		console.log("LEADER CHECK:" , [currenttracker.displayName] , [player.nameTag] , "Current Score:" , [currentscore] );
		trackerhighscoreplayer = previoustrackerhighscoreplayer;
	if (currentscore > oldhighscore)
			{
				oldhighscore = highscore; // store the old highscore
				highscore = currentscore; // set highscore to currentscore
				previoustrackerhighscoreplayer = trackerhighscoreplayer; // store the old score leader
				trackerhighscoreplayer = player; // set the new leader
				
				if (previoustrackerhighscoreplayer != trackerhighscoreplayer)
				{ console.log("LEADER CHECK:" , "NEW Leader:" , [player.nameTag] , "High Score:" , [highscore] , "( +" , [highscore - oldhighscore] , ")" ) }
				else { console.log("LEADER CHECK:" , "Leader:" , [trackerhighscoreplayer.nameTag] , "NEW High Score:" , [highscore] , "( +" , [highscore - oldhighscore] , ")" ) }
				announceCheck()
			}
	else if (currentscore <= oldhighscore) { console.log("LEADER CHECK:" , [currenttracker.displayName] , "Current Score:" , [currentscore] , "Leader:" , [trackerhighscoreplayer.nameTag]) }
	// announceCheck()
	highscore = 0;
	oldhighscore = 0;
	}
	highscore = 0;
	oldhighscore = 0;
	}
}

export async function announceCheck() {
	// leaderCheck();
	if (config.debuglog == true) { console.log("TRACKER LEADER ANNOUNCE CHECK") }
	// const allplayers = world.getAllPlayers();
	if (!previoustrackerhighscoreplayer) { console.log("ANNOUNCE:" , "Old High Score" , oldhighscore , "No Leader") }
	else { console.log("ANNOUNCE:" , [currenttracker.displayName] , "Old High Score" , oldhighscore , "Leader:" , [previoustrackerhighscoreplayer.nameTag]) }
	// highscore = -1;
	for (const player of allplayers) {
		if (!player) {
		if (config.debuglog == true) { console.log("player undefined") }
      return }
		currentscore = currenttracker.getScore(player);
		console.log("ANNOUNCE:" , [currenttracker.displayName] , [player.nameTag] , "Current Score:" , [currentscore] );

				if (previoustrackerhighscoreplayer != trackerhighscoreplayer)
				{
				world.sendMessage(`§g${[currenttracker.displayName]} New Leader ${[trackerhighscoreplayer.nameTag]} ${[highscore]}`);
				console.log("ANNOUNCE:" , [currenttracker.displayName] , "NEW Leader New High Score:" , [trackerhighscoreplayer.nameTag] , [highscore] , "( +" , [highscore - oldhighscore] , ")"  );
				previoustrackerhighscoreplayer = player;
				}
				else if (previoustrackerhighscoreplayer == trackerhighscoreplayer && forceannounce ) // TODO add variable to control leader score update announce
				{
				world.sendMessage(`§g${[currenttracker.displayName]} Leader ${[trackerhighscoreplayer.nameTag]} ${[highscore]} `);
				console.log("ANNOUNCE:" , [currenttracker.displayName] , "Leader New High Score:" , [trackerhighscoreplayer.nameTag] , [highscore] , "( +" , [highscore - oldhighscore] , ")" );
				previoustrackerhighscoreplayer = player;
				forceannounce = false;
				}
			// }
	}
	console.log("ANNOUNCE:" , "High Score:" , [highscore] , "Leader:" , [trackerhighscoreplayer.nameTag]);
}

export async function deathCheck() {
	if (victim.type == "minecraft:player") { // only run if victim is a player
	// if (config.debuglog == true) { console.log("DEATH CHECK") }
	while (config.debuglog == true) { console.log("DEATH CHECK");
		break }
		// console.log( victim.pvp );
		if ( victim.pvp == true && attacker.pvp == true && pvp.pvp_started == true ) { // PVP Death
			console.log("Player" , victimname , "died in a PVP match");
			totalpvpmatchdeathsObjective?.addScore(victim.victim, 1);
		}
		if ( victim.pvp == false || attacker.pvp == false || pvp.pvp_stared == false ) { // Non PVP Death
			playerdeathsObjective?.addScore(victim.victim, 1);
			score = playerdeathsObjective?.getScore(victim.victim);
			console.log(victim.name , "death" , score , "at" , victim.loc.full , "from" , attacker.cause);
			victim.victim.sendMessage(`§4${[victim.name]} ${"death"} ${[score]} ${"at"} ${[victim.loc.full]} `);
			// Death Announcer
			currentdeaths = -1; // reset the currentdeaths variable
			currentdeaths = playerdeathsObjective?.getScore(victim.victim); // set the currentdeaths to match the players death tracker
				if ( currentdeaths == 1 && config.showdeathboard == false ) {
					world.sendMessage(`§4${[victim.name]} died for the first time!`); // Announce first death
					console.log("Player" , victim.name , "died for the first time.");
				}
				if ( config.showdeathboard == true ) {
					system.run(() => {checkDisplay()}); // Check current displayed objective before displaying deaths
					system.runTimeout(() => {showDeaths();}, 10); // Show Death Count Function
					system.runTimeout(() => {refreshDisplay();}, 300); // Return to previous displayed objective after 15s
						if ( currentdeaths == 1 ) {
							world.sendMessage(`§4${[victim.name]} died for the first time!`); // Announce first death
							console.log("Player" , victim.name , "died for the first time.");
						}
				}
		}
	}
}
	// Boss Kill Bonuses
export async function bosskillBonus() {
	console.log("Boss Kill Bonus Handler");
		bossheroBonus();
		bosslootBonus();
		bossxpkillBonus();
		return
}
export async function bossheroBonus() {
				if ( config.bossherobonus == true )
			{
				attacker.addEffect("minecraft:village_hero" , (20 * 60 * 60) );
				if (config.debuglog == true) { console.log([attacker.name] , "is a Hero of the Village") }
				return;
			}
}

export async function bosslootBonus() {
			if ( config.bosslootbonus == true )
			{
				// attacker.addEquipment("effect.villageHero");
				if (config.debuglog == true) { console.log([attacker.name] , "received bonus loot") }
				return;
			}
}

export async function bossxpkillBonus() {
			if ( config.bossxpkillbonus == true )
			{
				attacker.addExperience(100);
				if (config.debuglog == true) { console.log([attacker.name] , "received bonus xp") }
				return;
			}
}
	// TODO kill bonus xp function
// Scoreboard Functions
system.run(initializeScoreboard);
	// Initialize scoreboards function
export async function initializeScoreboard() {
	console.log('Initializing Scoreboard');
  for (let key in trackers) {
    const obj = trackers[key];
    var objective = world.scoreboard.getObjective(obj.objective);

    if (world.scoreboard.getObjective(obj.objective)) {
			// console.log("continue");
      continue;
    }
		
    objective = world.scoreboard.addObjective(obj.objective, obj.display);
    world.getAllPlayers().forEach((p) => {
      objective.setScore(p, 0);
		if (config.debuglog == true) { console.log('Initializing' , [obj.display]) }
    });
		
  }
			system.runTimeout(() => { checkDisplay() }, 5);
			system.runTimeout(() => { refreshDisplay() }, 25);	
}

	// Clear scoreboard
export async function clearScoreboard() {
  for (let key in trackers) {
    const obj = trackers[key];
    const objective = world.scoreboard.getObjective(obj.objective);
		const player = world.scoreboard.getParticipants();

    world.scoreboard.removeObjective(objective);
		if (config.debuglog == true) { console.log('Removing all objectives from scoreboard list') }

    // objective.removeParticipant(id: player);
		// console.log('Removing all players from scoreboard list');
    // world.getAllPlayers().forEach((player) => {
    // objective.removeParticipant(player);
		// console.log('Removing players from scoreboard list');
    // });
  }
	system.run(() => {initializeScoreboard() })// Initialize scoreboard after reset scores
}
	// Get userconfig variable for default
export async function checkDisplay() {
	if (pvp.pvp_started == false)
	{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		if (currentdisplayObjective != null && currentdisplayObjective != undefined && world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective != playerdeathsObjective )
		{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		if (config.debuglog == true) { console.log("Current Objective:" , currentdisplayObjective.id) }
		}
		else 
		{
		currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective;
		if (config.debuglog == true) { console.log("Setting Current Objective:" , currentdisplayObjective.id) }	
		}
	}
}
	// Set Scoreboard Display back to default 
export async function refreshDisplay() {
		if (currentdisplayObjective != null && currentdisplayObjective != undefined)
		{
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: currentdisplayObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: currentdisplayObjective, });
		if (config.debuglog == true) { console.log("Reset to default tracker" , currentdisplayObjective.id) }
		}
		else {
		if (config.debuglog == true) { console.log("Default tracker invalid. Reset to all kills.") }
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
		}
}
	// Show Bosskills
export async function showBosskills() {
		if (config.debuglog == true) { console.log("SHOWING BOSS KILLS") }
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: bosskillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: bosskillsObjective, });
}
	// Show PVPWins
export async function showWins() {
	if (horde == true)
	{
		if (config.debuglog == true) { console.log("SHOWING HORDE WINS") }
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalhordematchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalhordematchwinsObjective, });
	}
	if (horde != true)
	{
		if (config.debuglog == true) { console.log("SHOWING PVP WINS") }
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalpvpmatchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalpvpmatchwinsObjective, });
	}
}
	// Show Deaths
export async function showDeaths() {
		if (config.debuglog == true) { console.log("SHOWING DEATHS") }
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: playerdeathsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: playerdeathsObjective, });
}
// Chat Logging (Private)
export async function startLogging() {
	logallkills = true;
}
export async function stopLogging() {
	logallkills = false;
}
// Chat Announcing (Public)
export async function startAnnouncing() {
	announceallkills = true;
}
export async function stopAnnouncing() {
	announceallkills = false;
}

// Block Checker FUNCTIONS
	// Blocks Placed Functions
export async function survivalblockplacedCheck() {
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
		railplacedCheck();
}

export async function railplacedCheck() {
	// if (config.debuglog == true) { console.log("railplaced check") }
	if (railplaced == true)
	{
		if (mode == "survival" )
		{	
			if (dimension == "minecraft:overworld" )
			{
				totalrailsplacedObjective?.addScore(builder, 1); // total rails
				overworldrailsplacedObjective?.addScore(builder, 1); // overworld survival rails
				survivalrailsplacedObjective?.addScore(builder, 1); // total survival rails
				score = survivalrailsplacedObjective?.getScore(builder);
				if (config.debuglog == true) { console.log(buildername , "total rails placed" , score) } 
			}
			if (dimension == "minecraft:nether" )
			{
				totalrailsplacedObjective?.addScore(builder, 1); // total rails
				survivalrailsplacedObjective?.addScore(builder, 1); // total survival rails
				netherrailsplacedObjective?.addScore(builder, 1); // nether survival rails
				score = netherrailsplacedObjective?.getScore(builder);
				if (config.debuglog == true) { console.log(buildername , "total and nether rails placed" , score) }
			}
		}
		if (mode == "creative" )
		{
				totalrailsplacedObjective?.addScore(builder, 1); // total rails
				creativerailsplacedObjective?.addScore(builder, 1); // total creative rails 
				score = creativerailsplacedObjective?.getScore(builder);
				if (config.debuglog == true) { console.log(buildername , "total rails placed" , score) }
		}
	}
}

// Blocks Broken Function
export async function survivalblockbrokenCheck() {
	dimension = miner.dimension.id;
	console.log("survival block broken check");
	// console.log(logbroke);
	console.log(dimension);
		if (dimension == "minecraft:overworld" )
		{
		overworldblocksbrokenObjective?.addScore(miner, 1);
		score = overworldblocksbrokenObjective?.getScore(miner);
		logbrokeCheck();
		oreminedCheck();		
		if (config.debuglog == true) { console.log(minername , "overworld blocks broken" , score) }
		}
		if (dimension == "minecraft:nether" )
		{
		netherblocksbrokenObjective?.addScore(miner, 1);
		score = netherblocksbrokenObjective?.getScore(miner);
		logbrokeCheck();
		oreminedCheck();
		if (config.debuglog == true) { console.log(minername , "nether blocks broken" , score) }
		}
		if (dimension == "minecraft:the_end" )
		{
		endblocksbrokenObjective?.addScore(miner, 1);
		score = endblocksbrokenObjective?.getScore(miner);
		if (config.debuglog == true) { console.log(minername , "the end blocks broken" , score) }
		}
}

export async function logbrokeCheck() {
	console.log("logbroke check");
	console.log(logbroke);
	console.log(dimension);
		if (dimension == "minecraft:overworld" && logbroke == true )
		{
				survivallogschoppedObjective?.addScore(miner, 1);
				score = survivallogschoppedObjective?.getScore(miner);
				if (config.debuglog == true) { console.log(minername , "total logs chopped" , score) }
		}
		if (dimension == "minecraft:nether" && logbroke == true)
		{
			survivallogschoppedObjective?.addScore(miner, 1);
			survivalnetherlogschoppedObjective?.addScore(miner, 1);
			score = survivalnetherlogschoppedObjective?.getScore(miner);
			if (config.debuglog == true) { console.log(minername , "total and nether logs chopped" , score) }
		}
}

export async function oreminedCheck() {
	console.log("oremined check");
	console.log(oremined);
	console.log(dimension);
		if (dimension == "minecraft:overworld" && oremined == true )
		{
			survivaloresminedObjective?.addScore(miner, 1);
			score = survivaloresminedObjective?.getScore(miner);
			oretypeCheck();
			if (config.debuglog == true) { console.log(minername , "total ores mined" , score) }
		}
		if (dimension == "minecraft:nether" && oremined == true || netheritemined == true )
		{
			survivaloresminedObjective?.addScore(miner, 1);
			survivalnetheroresminedObjective?.addScore(miner, 1);
			score = survivalnetheroresminedObjective?.getScore(miner);
			oretypeCheck();
			if (config.debuglog == true) { console.log(minername , "total and nether ores mined" , score) }
		}
}

export async function oretypeCheck() {
	console.log("oremined check");
	console.log(oremined);
	if (coppermined == true)
	{
		copperoresminedObjective?.addScore(miner, 1);
		score = copperoresminedObjective?.getScore(miner);
		if (config.debuglog == true) { console.log(minername , "total copper ore mined" , score) }
	}
	if (ironmined == true)
	{
		ironoresminedObjective?.addScore(miner, 1);
		score = ironoresminedObjective?.getScore(miner);
		if (config.debuglog == true) { console.log(minername , "total iron ore mined" , score) }
	}
	if (goldmined == true)
	{
		goldoresminedObjective?.addScore(miner, 1);
		score = goldoresminedObjective?.getScore(miner);
		if (config.debuglog == true) { console.log(minername , "total gold ore mined" , score) }
	}
	if (diamondmined == true)
	{
		diamondoresminedObjective?.addScore(miner, 1);
		if (config.debuglog == true) { console.log(minername , "total diamond ore mined" , score) }
	}
	if (netheritemined == true)
	{
		netheriteoresminedObjective?.addScore(miner, 1);
		if (config.debuglog == true) { console.log(minername , "total netherite mined" , score) }
	}	
}

// Loot Functions
export async function lootTest() {
	var player = chat.sender;
	dimension = player.dimension.id;
	dimensionname = dimension.replace("minecraft:", "");
	var X = player.location.x;
	var Y = player.location.y;
	var Z = player.location.z;
	if (config.debuglog == true) { console.log("LOOT:" , player.nameTag ,  X , Y , Z , dimensionname) }
	// player.runCommandAsync(`/loot spawn ${X} ${Y} ${Z} loot test mainhand`); // loot test
	player.runCommandAsync(`/loot spawn ~ ~ ~ loot test mainhand`); // 
}
