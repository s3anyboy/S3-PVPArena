// import minecraft server modules
import { world, system, GameRules, GameRule, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as config from './PVPUserConfig.js';
// var scoreboardPrefix = "s3:";

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

export var bossMobs = [
  "minecraft:elder_guardian", // id0
  "minecraft:ender_dragon", //id1
  "minecraft:warden", //id2
  "minecraft:wither" //id3
];

export var pvpMobs = [
  "s3:PVPBOT"
];

export var trackers = {
	allkills: {
    objective: "allkills",
    display: "Total Kills"
  },
  hostilekills: {
    objective: "hostilekills",
    display: "Hostile Mob Kills"
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
	
// Non Kill Trackers
	playerdeaths: {
    objective: "playerdeaths",
    display: "Player Deaths"
  },
	
	totaldeaths: {
    objective: "totaldeaths",
    display: "Total Deaths"
  },
	
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
  },

// PVP Kills tracker
	playerkills: {
    objective: "playerkills",
    display: "Player Kills"
  },

	
// PVP Arena tracker
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
  }

};

// Tracker Objective Variables
export var alltrackers = world.scoreboard.getObjectives();
// export var allstats = world.scoreboard.getObjectives();

export var allkillsObjective = world.scoreboard.getObjective("allkills");
export var hostilekillsObjective = world.scoreboard.getObjective("hostilekills");

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


// Non Kill Trackers
// export var playerdistanceObjective = world.scoreboard.getObjective("playerdistance"); // Add the others together
// export var playerdistancewalkObjective = world.scoreboard.getObjective("minecraft.custom:minecraft.walk_one_cm");
// export var playerdistanceswimObjective = world.scoreboard.getObjective("minecraft.custom:swim_one_cm");
// export var playerdistancerideObjective = world.scoreboard.getObjective("playerdistanceride");
// export var playerdistanceglideObjective = world.scoreboard.getObjective("playerdistanceglide");
// export var playerdistanceflyObjective = world.scoreboard.getObjective("playerdistancefly");

// PVP Arena Specific Objectives
export var currentpvpmatchkillsObjective = world.scoreboard.getObjective("currentpvpmatchkills");
export var currentpvpmatchdeathsObjective = world.scoreboard.getObjective("currentpvpmatcdeaths");
export var totalpvpmatchdeathsObjective = world.scoreboard.getObjective("totalpvpmatchkills"); // Total PVP deaths
export var totalpvpmatchkillsObjective = world.scoreboard.getObjective("totalpvpmatchkills");
export var pvpmobkillsObjective = world.scoreboard.getObjective("pvpmobkills");
export var totalpvpmatchwinsObjective = world.scoreboard.getObjective("totalpvpmatchwins");
export var ctfscoreObjective = world.scoreboard.getObjective("ctfscore");



// Death Counters
world.afterEvents.entityDie.subscribe((death) => {

  const player = "minecraft:player";
	const victim = death.deadEntity;
  const victimname = death.deadEntity.nameTag;
  const victimid = death.deadEntity.typeId;
  const friendlyname = victimid.replace("minecraft:", "").replace("_", " ").replace("v2", "");
	var attacker = death.damageSource.damagingEntity;
	  if (!attacker ) {attacker = victim}
	
	if (victimid == "minecraft:player")
		// console.log("Player" , victimname , "died");
		// Death tracker		
		{
		if (attacker.hasTag('s3:pvp') && victim.hasTag('s3:pvp') && pvp_started == true) // PVP Death
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
					showDeaths(); // Show Death Count Function
					system.runTimeout(() => {refreshDisplay();}, 500);
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
  const friendlyname = id.replace("minecraft:", "").replace("_", " ").replace("v2", "");
	

	console.log ("Entity killed");
	

	if (id == "minecraft:player")
	{
		
		// Player Kill Counter
		if (id == "minecraft:player") {
			console.log(attacker.nameTag , "killed Player" , victimname);
			playerkillsObjective?.addScore(attacker, 1);
		}
		

	}
	
	// Hostile Mob Counter
  if (hostileMobs.indexOf(id) > -1) {
		console.log(attacker.nameTag , "killed a hostile" , friendlyname);
		console.log(attacker.nameTag , "Hostile Kills Updated");
    hostilekillsObjective?.addScore(attacker, 1);

  }

	// Boss Mob Counters
  if (bossMobs.indexOf(id) > -1) {		
		console.log(attacker.nameTag , "killed a Boss!");
		// world.sendMessage(`§4${attacker.nameTag , "killed a Boss!"}`);
    bosskillsObjective?.addScore(attacker, 1);
		
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
	console.log(attacker.nameTag , "killed a" , friendlyname)
		if (config.announceallkills == true)
		{
			world.sendMessage(`${[attacker.nameTag]} killed a ${[friendlyname]}`);
		}	
		if (config.logallkills == true && config.announceallkills == false)
		{
			attacker.sendMessage(`${[attacker.nameTag]} killed a ${[friendlyname]}`);
		}


	
  // world.scoreboard.getObjective(tracker.allkills.objective)?.addScore(attacker, 1);
	
});


// Distance trackers
// TODO implement new distance trackers
// scoreboard objectives add (score name) minecraft.custom:minecraft.walk_one_cm // statistics dont work in Bedrock

// World initialize tracker
world.afterEvents.worldInitialize.subscribe((startup) => {
		refreshDisplay()
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
    initializeScoreboard();	
	})	
    objective.setScore(player, 0);
		
  }
		
});

// Player quit hide scoreboard entries
world.beforeEvents.playerLeave.subscribe((quitter) => {
		console.log(quitter , 'is leaving');
});

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
			system.runTimeout(() => { refreshDisplay() }, 200);	
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
    initializeScoreboard();	
	})	
}

// Set Scorboard Display back to default 
// TODO get userconfig variable for default
export async function refreshDisplay() {
		console.log("Resetting to default tracker"); 
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
}

// Show PVPWins
export async function showWins() {
		console.log("SHOWING PVP WINS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalpvpmatchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalpvpmatchwinsObjective, });
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
		
		
