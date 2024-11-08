import { world, system, GameRules, GameRule, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as pvp from "./PVPArenaHandler.js";
import * as tracker from "./PVPScoreboardHandler.js";
import * as config from './PVPUserConfig.js';

/// Chat Commands Controllers
export var sender;
export var message;

// Kill Tracker Chat Commands
world.beforeEvents.chatSend.subscribe((chatData) => {
    sender = chatData.sender;
    message = chatData.message;
		
    if (message == "!killcounter" || message == "!killcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.allkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.allkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.allkillsObjective, });
		})
		}

    if (message == "!hostilekillcounter" || message == "!hostilekillcount"|| message == "!hostilekills") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Hostile Mob Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.hostilekillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.hostilekillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.hostilekillsObjective, });
		})
		}
		
    if (message == "!bosskillcounter" || message == "!bosskillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Boss Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.bosskillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.bosskillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.bosskillsObjective, });
		})
		}		
    if (message == "!dragonkillcounter" || message == "!dragonkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Ender Dragon Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.dragonkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.dragonkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.dragonkillsObjective, });
		})
		}		
    if (message == "!elderkillcounter" || message == "!elderkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Elder Guardian Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.elderkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.elderkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.elderkillsObjective, });
		})
		}		
    if (message == "!wardenkillcounter" || message == "!wardenkillcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Warden Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.wardenkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.wardenkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.wardenkillsObjective, });
		})
		}
    if (message == "!witherkillcounter" || message == "!witherkillcount") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Wither Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.witherkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.witherkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.witherkillsObjective, });
		})
		}

		// PVP Player Kill Counters
    if (message == "!playerkillcounter" || message == "!playerkillcount"|| message == "!pkcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Player Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.playerkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.playerkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.playerkillsObjective, });
		})
		}
		
    if (message == "!pvpkillcounter" || message == "!pvpkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal PVP Match Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalpvpmatchkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalpvpmatchkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.totaltracker.atchkillsObjective, });
		})
		}		
    
		// Non Kill Counters
		if (message == "!deaths" || message == "!DEATHS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Death Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.playerdeathsObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.playerdeathsObjective, sortOrder: ObjectiveSortOrder.Ascending, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.totaltracker.atchkillsObjective, });
		})
		}		
    
		// Distance Tracking doesn't work in Bedrock natively
		// if (message == "!distance" || message == "!distance") // 
		// {
		// chatData.cancel = true;
    // system.run(() => {
      // sender.sendMessage(`§4${"Personal Distance Travelled"}`);
			// console.log(tracker.playerdistancewalkObjective);
			// console.log(world.scoreboard.getObjective("minecraft.custom:minecraft.walk_one_cm"));
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.playerdistancewalkObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.playerdistancewalkObjective, });
		// })
		// }	
		
		
	// TRACKER DEBUG CHAT COMMANDS
    if (message == "!score" || message == "!SCORE") //
		{
		chatData.cancel = true;
    system.run(() => {
      world.sendMessage(`§4${"Initialize Trackers"}`);
			tracker.initializeScoreboard();
		})
		}
		
		// Chat logging
		if (message == "!log" || message == "!LOG") //
		{
		chatData.cancel = true;
    system.run(() => {
			if (tracker.logallkills == false)
			{
      world.sendMessage("Logging all player kills to private chat");
			tracker.startLogging();
			}
			if (tracker.logallkills == true)
			{
      world.sendMessage("Stopped logging all player kills to private chat");
			tracker.stopLogging();
			}
		})
		}	
		
		if (message == "!announce" || message == "!ANNOUNCE") //
		{
		chatData.cancel = true;
    system.run(() => {
			if (tracker.announceallkills == false)
			{
      world.sendMessage("Logging all player kills to public chat");
			tracker.startAnnouncing();
			}
			if (tracker.announceallkills == true)
			{
      world.sendMessage("Stopped logging all player kills to public chat");
			tracker.stopAnnouncing();
			}
		})
		}
		
    if (message == "!resetstats" || message == "!RESETSTATS" || message == "!resetscores" || message == "!RESETSCORES") // Add a confirmation flow
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Clear Tracker Stats"}`);
			tracker.clearScoreboard();
		})
		}
		
    if (message == "!listtrackers" || message == "!LISTTRACKERS") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"List all Trackers"}`);
			
			// for (let key in tracker.alltrackers) {
			// const obj = tracker.alltrackers[key];
			// const objective = world.scoreboard.getObjective(obj.objective);
			// console.log(obj?.displayName);
			// if (!objective) {
				// continue;
			// }
			// }
      console.log("List all Trackers");
      // console.log(pvp.alltrackers[0].displayName);
			// sender.sendMessage(world.scoreboard.getObjectives());
			
		})
		}
		
		
		
});

// Teleport Commands
world.beforeEvents.chatSend.subscribe((eventData) => {
    sender = eventData.sender;
    message = eventData.message;
    if (message == "!spawn" || message == "!home") //return
		{
    const spawn = world.getDefaultSpawnLocation()
    const spawnDimension = world.getDimension("minecraft:overworld")

    system.run(() => {
        sender.teleport(spawn, {dimension: spawnDimension})
		})
		eventData.cancel = true;
		}
		// eventData.cancel = true;
});

// Teleport Commands
// world.beforeEvents.chatSend.subscribe((eventData) => {
	// const player = eventData.sender;
	// switch (eventData.message) {
		// case '!gmc':
			// eventData.cancel = true;
			// player.runCommandAsync('gamemode c');
			// break;
		// case '!gms':
			// eventData.cancel = true;
			// player.runCommandAsync('gamemode s');
			// break;
		// default: break;
	// }
// });

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




// Chat Command Handler
		
world.beforeEvents.chatSend.subscribe((chatData) => {

	// Arena Teleport
    sender = chatData.sender;
    message = chatData.message;
    if (message == "!arena") // teleport player to arena 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.teleport(
      { x: config.ARENA_X_LOC, y: config.ARENA_Y_LOC, z: config.ARENA_Z_LOC },
      { dimension: pvp.overworld, rotation: { x: 0, y: 0 }, }
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
    if (message == "!join" || message == "!JOIN" || message == "!joinpvp" || message == "!JOINPVP" || message == "!j" || message == "!J")  
		{
		chatData.cancel = true;
    system.run(() => {
      pvp.joinPVP();
			})
		} 
		
		// PVP Leave
		if (message == "!leave" || message == "!LEAVE" || message == "!leavepvp" || message == "!LEAVEPVP" || message == "!quit" || message == "!QUIT" || message == "!quitpvp" || message == "!QUITPVP"|| message == "!q" || message == "!Q")  
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
			pvp.setupSlayer();
			})
		}

		// PVP Start
		if (message == "!startpvp" || message == "!STARTPVP" ||message == "!pvpstart" || message == "!PVPSTART" || message == "!beginpvp" || message == "!BEGINPVP" || message == "!pvpbegin" || message == "!PVPBEGIN" || message == "!START" || message == "!start" )  
		{
		chatData.cancel = true;
    system.run(() => {
			// countplayersPVP();
			pvp.joinPVP();
			console.log('PVP Player Count:' , pvp.pvpplayercount)
			if (pvp.slayer == true)
			{
      world.sendMessage(`§4${"The PVP match is beginning."}`);
			pvp.initializeSlayer();
			return
			}
			else
			{
      world.sendMessage(`§4${"No Gametype Selected. Defaulting to Slayer"}`);
			pvp.setupSlayer();
			console.log('SLAYER:' , pvp.slayer)
			pvp.initializeSlayer();
			return
			}
			})
		}
		
		// PVP Ending
		if (message == "!stoppvp" || message == "!STOPPVP" || message == "!pvpstop" || message == "!PVPSTOP" || message == "!stop" || message == "!STOP" || message == "!endpvp" || message == "!ENDPVP" || message == "!pvpend" || message == "!PVPEND" || message == "!END" || message == "!end" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
      
			pvp.stopPVP();
			pvp.clearPVP();
			})
		}

		
});