// scripts/main.ts
import { world, system, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

// scripts/constants.ts
// var scoreboardPrefix = "s3:";

export var hostileMobs = [
  "minecraft:blaze",
  "minecraft:creeper",
  "minecraft:drowned",
  "minecraft:elder_guardian",
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

export var scoreboards = {
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

// PVP Kills Scoreboards
	playerkills: {
    objective: "playerkills",
    display: "Player Kills"
  },
  pvpkills: {
    objective: "pvpkills",
    display: "PVP Mob Kills"
  },
	
// PVP Arena Scoreboards
	// Current Match Kills - Slayer modes
  totalpvpmatchkills: {
    objective: "totalpvpmatchkills",
    display: "Total PVP Match Kills"
  },
  totalpvpmatchwins: {
    objective: "totalpvpmatchwins",
    display: "Total PVP Match Wins"
  },
	// CTF
  ctfscore: {
    objective: "ctfscore",
    display: "CTF Score"
  }


};

export var allkillsObjective = world.scoreboard.getObjective("allkills");

export var hostilekillsObjective = world.scoreboard.getObjective("hostilekills");

export var bosskillsObjective = world.scoreboard.getObjective("bosskills");
export var elderkillsObjective = world.scoreboard.getObjective("elderkills");
export var dragonkillsObjective = world.scoreboard.getObjective("dragonkills");
export var wardenkillsObjective = world.scoreboard.getObjective("wardenkills");
export var witherkillsObjective = world.scoreboard.getObjective("witherkills");
// export var bosskillsObjective = world.scoreboard.getObjective("bosskills");

export var playerkillsObjective = world.scoreboard.getObjective("playerkills");
export var pvpkillsObjective = world.scoreboard.getObjective("pvpkills");

export var customkillsObjective = world.scoreboard.getObjective("customkills");

// PVP Arena Specific Objectives
// export var currentpvpmatchkillsObjective = world.scoreboard.getObjective("currentpvpmatchkills");
export var ctfscoreObjective = world.scoreboard.getObjective("ctfscore");



// Kill Counters
world.afterEvents.entityDie.subscribe((e) => {
  const entity = e.damageSource.damagingEntity;
	console.log ("Entity killed");
	
  if (!entity || entity.typeId !== "minecraft:player") {
    return;
  }
	
  const id = e.deadEntity.typeId;
  const player = "minecraft:player";
  const tags = entity.getTags();
	
	// Hostile Mob Counter
  if (hostileMobs.indexOf(id) > -1) {
		console.log("Player killed hostile mob");
    world.scoreboard.getObjective(scoreboards.hostilekills.objective)?.addScore(entity, 1);
  }

	// Boss Mob Counter
  if (bossMobs.indexOf(id) > -1) {
		console.log("Player killed Boss");
    world.scoreboard.getObjective(scoreboards.bosskills.objective)?.addScore(entity, 1);
  }

	// Elder Guardian Counter
  if (bossMobs.indexOf(id) == 0) {
		console.log("Player killed Elder Guardian");
    world.scoreboard.getObjective(scoreboards.elderkills.objective)?.addScore(entity, 1);
  } 
	// Ender Dragon Counter
  if (bossMobs.indexOf(id) == 1) {
		console.log("Player killed Ender Dragon");
    world.scoreboard.getObjective(scoreboards.dragonkills.objective)?.addScore(entity, 1);
  }
	// Warden Counter
  if (bossMobs.indexOf(id) > 2) {
		console.log("Player killed Warden");
    world.scoreboard.getObjective(scoreboards.wardenkills.objective)?.addScore(entity, 1);
  }
	// Wither Counter
  if (bossMobs.indexOf(id) > 3) {
		console.log("Player killed Wither");
    world.scoreboard.getObjective(scoreboards.witherkills.objective)?.addScore(entity, 1);
  }	
	
	// PVP Mob Counter
  if (pvpMobs.indexOf(id) > -1) {
		console.log("Player killed PVP mob");
    world.scoreboard.getObjective(scoreboards.pvpkills.objective)?.addScore(entity, 1);
  }
	
	// Player Kill Counter
  if (id == "minecraft:player") {
		console.log("Player killed Player");
    world.scoreboard.getObjective(scoreboards.playerkills.objective)?.addScore(entity, 1);
  }
	
	// CurrentMatch Kill Counter
  // if (tags.indexOf(id) > -1) {
		// console.log("Player killed Player in a PVP Match");
    // world.scoreboard.getObjective(scoreboards.currentpvpmatchkills.objective)?.addScore(entity, 1);
  // }

	// Custom Mob Counter
  if (tags.indexOf(id) > -1) {
		console.log("Player killed custom mob");
    world.scoreboard.getObjective(scoreboards.customkills.objective)?.addScore(entity, 1);
  }
	
	// Other
	console.log("Player All Kills Updated")
  world.scoreboard.getObjective(scoreboards.allkills.objective)?.addScore(entity, 1);
	
});

// World initialize scoreboards
world.afterEvents.worldInitialize.subscribe((startup) => {
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
		world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
		
});
		
		
// Player Join initialize scoreboards
world.afterEvents.playerJoin.subscribe((e) => {
  const player = world.getPlayers({ name: e.playerName })[0];
	
  if (!player) {
    return;
  }
	
  for (let key in scoreboards) {
    const obj = scoreboards[key];
    const objective = world.scoreboard.getObjective(obj.objective);
    if (!objective) {
      continue;
    }
		
    objective.setScore(player, 0);
		
  }
		
});

system.run(initializeScoreboard);
async function initializeScoreboard() {
  for (let key in scoreboards) {
    const obj = scoreboards[key];
    
		if (obj.objective.length > 16) {
      obj.objective = obj.objective.slice(0, 17);
    }
		
    if (world.scoreboard.getObjective(obj.objective)) {
      continue;
    }
		
    const objective = world.scoreboard.addObjective(obj.objective, obj.display);
    world.getAllPlayers().forEach((p) => {
      objective.setScore(p, 0);
    });
  }
}

// Chat Commands Controller
world.beforeEvents.chatSend.subscribe((chatData) => {
    const sender = chatData.sender;
    const message = chatData.message;
		
    if (message == "!killcounter" || message == "!killcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: allkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: allkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: allkillsObjective, });
		})
		}

    if (message == "!hostilekillcounter" || message == "!hostilekillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Hostile Mob Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: hostilekillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: hostilekillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}
		
    if (message == "!bosskillcounter" || message == "!bosskillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Boss Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: bosskillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: bosskillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}		
    if (message == "!dragonkillcounter" || message == "!dragonkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Ender Dragon Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: dragonkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: dragonkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}		
    if (message == "!elderkillcounter" || message == "!elderkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Elder Guardian Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: elderkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: elderkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}		
    if (message == "!wardenkillcounter" || message == "!wardenkillcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Warden Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: wardenkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: wardenkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}
    if (message == "!witherkillcounter" || message == "!witherkillcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Wither Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: witherkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: witherkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: hostilekillsObjective, });
		})
		}

		// PVP/Player Kill Counters
    if (message == "!playerkillcounter" || message == "!playerkillcount"|| message == "!pkcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Player Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: playerkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: playerkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: playerkillsObjective, });
		})
		}
		
    if (message == "!pvpkillcounter" || message == "!pvpkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal PVP Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: pvpkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: pvpkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: pvpkillsObjective, });
		})
		}	
		


		
});

//# sourceMappingURL=../debug/main.js.map
