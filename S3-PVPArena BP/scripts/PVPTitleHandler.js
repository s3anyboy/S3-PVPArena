// import minecraft server modules
import { world, system, GameRules, GameRule, BlockTypes, BlockPermutation, EntityInventoryComponent, ItemStack, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server";

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

var titleplayer;
var titleplayername;
var activetitle;
var titlestring;
export var hastitle = false;

world.afterEvents.playerSpawn.subscribe((spawnData) => {
	let { player, initialSpawn } = spawnData;
		titleplayer = spawnData.player
		titleplayername = titleplayer.nameTag
		titleCheck();
});

export async function titleCheck() {
	  console.log("TITLE CHECK");
		{
			// if (!titleplayer)
			// {
				// console.log("titleplayer unedfined");
			// titleplayer = chat.sender;
			// titleplayername = titleplayer.nameTag;
			// system.run(() => { titlecheck() });
			// }
		const allplayers = world.getAllPlayers();
		for (const player of allplayers) {
		
			titleplayer = player;
			titleplayername = player.nameTag;
			titlestring = titleplayername.toString();
			console.log(titleplayername);
			console.log([titleplayer.getEffect('village_hero')]);
			
			if (titleplayer.getEffect('village_hero') )
			{
				if (titlestring.includes("HERO"))
				{
					activetitle = titleplayer.getEffect('village_hero');
					console.log(activetitle);
					console.log(titleplayer.nameTag);
					hastitle = true;
				}
				if (titlestring.includes("HERO") == false)
				{
					activetitle = titleplayer.getEffect('village_hero');
					console.log(activetitle);
					titleplayer.nameTag = (`§gHERO ${[titleplayername]}§f`);
					console.log(titleplayer.nameTag);
					hastitle = true;
				}
			}
			
			if (titleplayer.getEffect('village_hero') == undefined) //&& hastitle == true)
			{
				// console.log("Player has leftover title");
				console.log(titlestring);
				if (titlestring.includes("HERO"))
				{
					titleplayer.nameTag = (`${[titleplayer.name]}`);
					hastitle = false;
					console.log("removing old HERO title");
					console.log(titleplayername);
					
				}
			// console.log(titleplayer.nameTag);
			}
		}
		}
}