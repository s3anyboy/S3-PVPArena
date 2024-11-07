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
  "minecraft:pillager",
  "minecraft:ravager",
  "minecraft:shulker",
  "minecraft:silverfish",
  "minecraft:skeleton",
  "minecraft:slime",
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
// PVP Arena Specific Objectives
export var currentpvpmatchkillsObjective = world.scoreboard.getObjective("currentpvpmatchkills");
export var totalpvpmatchkillsObjective = world.scoreboard.getObjective("totalpvpmatchkills");
export var pvpmobkillsObjective = world.scoreboard.getObjective("pvpmobkills");
export var totalpvpmatchwinsObjective = world.scoreboard.getObjective("totalpvpmatchwins");
export var ctfscoreObjective = world.scoreboard.getObjective("ctfscore");



// Kill Counters
world.afterEvents.entityDie.subscribe((death) => {
  const attacker = death.damageSource.damagingEntity;
  const player = "minecraft:player";
	console.log ("Entity killed");
	
  if (!attacker || attacker.typeId !== player) {
    return;
  }
	
  const victim = death.deadEntity;
  const victimname = death.deadEntity.nameTag;
  const id = death.deadEntity.typeId;
  const friendlyname = id.replace("minecraft:", "").replace("_", " ").replace("v2", "");

  const tags = attacker.getTags();
	
	// Hostile Mob Counter
  if (hostileMobs.indexOf(id) > -1) {
		console.log(attacker.nameTag , "killed a hostile" , friendlyname);
		console.log(attacker.nameTag , "Hostile Kills Updated");
    hostilekillsObjective?.addScore(attacker, 1);

  }

	// Boss Mob Counter
  if (bossMobs.indexOf(id) > -1) {		
		console.log(attacker.nameTag , "killed a Boss!");
		// world.sendMessage(`§4${attacker.nameTag , "killed a Boss!"}`);
    bosskillsObjective?.addScore(attacker, 1);
  }

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
	
	// PVP Bot Kill Counter (PVP Bots)
  if (pvpMobs.indexOf(id) > -1) {
		console.log(attacker.nameTag ,  "killed PVP mob");
    pvpmobkillsObjective?.addScore(attacker, 1);
  }
	
	// Player Kill Counter
  if (id == "minecraft:player") {
		console.log(attacker.nameTag , "killed Player" , victimname);
    playerkillsObjective?.addScore(attacker, 1);
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

// World initialize tracker
world.afterEvents.worldInitialize.subscribe((startup) => {
		// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
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
  for (let key in trackers) {
    const obj = trackers[key];
    // const objective = world.scoreboard.getObjective(obj.objective);
		// if (obj.objective.length > 16) {
      // obj.objective = obj.objective.slice(0, 17);
    // }
		
    if (world.scoreboard.getObjective(obj.objective)) {
      continue;
    }
		
    const objective = world.scoreboard.addObjective(obj.objective, obj.display);
    world.getAllPlayers().forEach((p) => {
      objective.setScore(p, 0);
    });
		
  }
}


export async function clearScoreboard() {
  for (let key in trackers) {
    const obj = trackers[key];
    const objective = world.scoreboard.getObjective(obj.objective);
		// if (obj.objective.length > 16) {
      // obj.objective = obj.objective.slice(0, 17);
    // }
		
    // if (world.scoreboard.getObjective(obj.objective)) {
      // continue;
    // }
		
    // const objective = world.scoreboard.addObjective(obj.objective, obj.display);
    world.getAllPlayers().forEach((player) => {
    objective.removeParticipant(player);
		console.log('Removing players from scoreboard list');
    });
		
  }
	
	initializeScoreboard();
}

// Set Scorboard Display back to default 
// TODO get userconfig variable for default
export async function refreshDisplay() {
		console.log("Resetting to default tracker"); 
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
}

// Temporarily show PVPWins
export async function showWins() {
		console.log("SHOWING PVP WINS");
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: totalpvpmatchwinsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: totalpvpmatchwinsObjective, });
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
		
		
