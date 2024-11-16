import { world, system, GameRules, GameRule, BlockTypes, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as pvp from './PVPArenaHandler.js';
import * as tracker from './PVPScoreboardHandler.js';
import * as title from './PVPTitleHandler.js';
import * as config from './PVPUserConfig.js';

/// Chat Commands Controllers
export var sender;
export var message;
export var messageinput;

export var awaitingreset = false;
export var confirm = false;

// export var currentdisplayObjective = "allkills";

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
		
    if (message == "!pvpkills" || message == "!pvpkillcounter" || message == "!pvpkillcount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal PVP Match Kill Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalpvpmatchkillsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalpvpmatchkillsObjective, });
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { objective: tracker.totaltracker.atchkillsObjective, });
		})
		}

		if (message == "!pvpwins" || message == "!pvpwincount") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal PVP Match Win Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalpvpmatchwinsObjective, });
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalpvpmatchwinsObjective, });
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

		// Block Counters
		// Survival Block Counters
		if (message == "!blocks" || message == "!BLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Survival Blocks Placed Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.survivalblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.survivalblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		// Rail Block Counters
		if (message == "!rails" || message == "!RAILS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Rail Blocks Placed Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalrailsplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalrailsplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		// Survival Blocks Broken
		if (message == "!broke" || message == "!BROKE") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Survival Blocks Broken Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.survivalblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.survivalblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		
		
		if (message == "!oblocks" || message == "!OBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Survival Blocks Placed Counter (Overworld)"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.overworldblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.overworldblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		if (message == "!nblocks" || message == "!NBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Survival Blocks Placed Counter (Nether)"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.netherblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.netherblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		// End Blocks Placed
		if (message == "!eblocks" || message == "!EBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Survival Blocks Placed Counter (End)"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.endblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.endblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		// End Blocks Broken Counter TODO
		// if (message == "!ebroke" || message == "!EBROKE") // 
		// {
		// chatData.cancel = true;
    // system.run(() => {
      // sender.sendMessage(`§4${"Personal Survival Blocks Broken Counter (End)"}`);
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.endblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			// world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.endblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		// })
		// }
		
		// Creative Block Counters
		if (message == "!cblocks" || message == "!CBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Creative Blocks Placed Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.creativeblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.creativeblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		if (message == "!cbroke" || message == "!CBROKE") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Creative Blocks Broken Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.creativeblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.creativeblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		
		// Total Block Counters
		if (message == "!totalblocks" || message == "!TOTALBLOCKS" || message == "!tblocks" || message == "!TBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Total Blocks Placed Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalblocksplacedObjective, sortOrder: ObjectiveSortOrder.Ascending, });
		})
		}
		if (message == "!totalbroke" || message == "!TOTALBROKE" || message == "!brokeblocks" || message == "!BROKEBLOCKS") // 
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Personal Total Blocks Broken Counter"}`);
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, { objective: tracker.totalblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending,});
			world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { objective: tracker.totalblocksbrokenObjective, sortOrder: ObjectiveSortOrder.Ascending, });
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
    if (message == "!loot" || message == "!LOOT") //
		{
		chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"LOOT TEST"}`);
			tracker.lootTest();
		})
		}
		
    if (message == "!scores" || message == "!SCORES") //
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
		// chatData.cancel = true;
    system.run(() => {
      sender.sendMessage(`§4${"Are you sure you want to reset All Tracker Stats? This cannot be undone. Type !yes to continue."}`);
			console.log(sender.nameTag , "is trying to reset all tracker stats.");
			awaitingreset = true;
			resetConfirmation()
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
		
		// currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective.id ?? "allkills";
		// if (currentdisplayObjective != null && currentdisplayObjective != undefined)
		// {
		// console.log("Current Objective:" , currentdisplayObjective.id);
		// }
		// else { currentdisplayObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar).objective; }
		// system.run(() => {
			// tracker.checkDisplay();
		// })
		
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
			case '!gma':
			eventData.cancel = true;
			player.runCommandAsync('gamemode a');
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
			pvp.joinPVP();

      world.sendMessage(`§4${"No Gametype Selected. Defaulting to Slayer"}`);
			pvp.setupSlayer();

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
		
		// PVP Start
		if (message == "!startpvp" || message == "!STARTPVP" ||message == "!pvpstart" || message == "!PVPSTART" || message == "!beginpvp" || message == "!BEGINPVP" || message == "!pvpbegin" || message == "!PVPBEGIN" || message == "!START" || message == "!start" )  
		{
		chatData.cancel = true;
    system.run(() => {
			// countplayersPVP();
			if (sender.hasTag('s3:pvp') == false)
			{pvp.joinPVP();}
			console.log('PVP Player Count:' , pvp.pvpplayercount)
			
			if (pvp.slayer == true) // Slayer
			{
      world.sendMessage(`§4${"The Slayer match is beginning."}`);
			pvp.initializeSlayer();
			return
			}

			if (pvp.horde == true) // Horde
			{
      world.sendMessage(`§4${"The Horde match is beginning."}`);
			pvp.initializeHorde();
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
		
		// PVP Scorecheck
		if (message == "!scorepvp" || message == "!SCOREPVP" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
      
			pvp.scorecheckPVP();
			})
		}	
		
		// PVP Joincheck
		if (message == "!check" || message == "!CHECK" || message == "!checkpvp" || message == "!CHECKPVP" || message == "!pvpcheck" || message == "!PVPCHECK" ) //return 
		{
		chatData.cancel = true;
    system.run(() => {
      
			pvp.checkplayertagPVP();
			})
		}

		// PVP Rules
		// PVP Gamemode Select
		if (message == "!slayer" || message == "!SLAYER" || message == "!dm" || message == "!DM" )  
		{
		chatData.cancel = true;
    system.run(() => {
			pvp.setupSlayer();
			})
		}
		
		// Horde
		if (message == "!horde" || message == "!HORDE" || message == "!ff" || message == "!FF" )  
		{
		chatData.cancel = true;
    system.run(() => {
			pvp.setupHorde();
			})
		}
		
		if (message.startsWith("!scorelimit") == true || message.startsWith("!killlimit") == true )  
		{
		// chatData.cancel = true;
		messageinput = message.replace("!scorelimit" , "").replace("!killlimit" , "");
		console.log("Player message input:" , messageinput);
    system.run(() => {
			pvp.setScoreLimit();
			})
		}	
		
		if (message.startsWith("!arena") == true || message.startsWith("!map") == true )  
		{
		// chatData.cancel = true;
		messageinput = message.replace("!arena" , "").replace("!map" , "");
		console.log("Player message input:" , messageinput);
    system.run(() => {
			pvp.setArena();
			})
		}	

		
		if (message == "!title" || message == "!TITLE" )  
		{
		chatData.cancel = true;
    system.run(() => {
			title.titleCheck();
			})
		}

		
});

// Reset Stats Confirmation Function
export function resetConfirmation() {
world.beforeEvents.chatSend.subscribe((chatData) => {
		sender = chatData.sender;
		confirm = chatData.message;
		if (awaitingreset == true && confirm == "!yes")
			{
			system.run(() => {
			world.sendMessage(`§4${"Clearing All Tracker Stats"}`);
			tracker.clearScoreboard();
			console.log(sender.nameTag , "has reset all tracker stats.");
			awaitingreset = false;
			})
			}
			else {
				awaitingreset = false;
				return
			}
	})
}