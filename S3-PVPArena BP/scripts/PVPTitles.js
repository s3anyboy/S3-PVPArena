// import minecraft server modules
import { world, system, GameRules, GameRule, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

import * as chat from './PVPChatCommandHandler.js';
import * as config from './PVPUserConfig.js';

// World initialize
// world.afterEvents.worldInitialize.subscribe((startup) => {
	// currentpvpmatchkillsObjective?getScores
		
// });


// Player Join initialize tracker
world.afterEvents.playerJoin.subscribe((joinevent) => {
  const joinplayer = world.getPlayers({ name: joinevent.playerName })[0];
	
	console.log ("TITLES NOT YET IMPLEMENTED");

		
});