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
	// console.log ("TITLES");
	titleCheck();
		
});

var allplayers = world.getAllPlayers();
export var titleplayer;
export var titleplayername;
export var activetitle;
export var titlestring;
export var hastitle = false;

world.afterEvents.playerSpawn.subscribe((spawnData) => {
	// let { player, initialSpawn } = spawnData;
		// titleplayer = spawnData.player
		// titleplayername = titleplayer.nameTag
		titleCheck();
});

export async function titleCheck() {
	if (config.debuglog == true) { console.log("TITLE CHECK") }
	
	for (const player of allplayers) {
		if (!player) {
		if (config.debuglog == true) { console.log("player unedfined") }
      return }
		titleplayer = player;
			if (!titleplayer)	{
				if (config.debuglog == true) { console.log("titleplayer undefined") }
			return }
		titleplayername = titleplayer.name;
		titlestring = titleplayername.toString();
		console.log("TITLE CHECK:" , titleplayername);
		console.log([titleplayer.getEffect('village_hero')]);
		if (titlestring.includes("§"))
		{
		hastitle = true;
		if (config.debuglog == true) { console.log("TITLE CHECK:" , "PLAYER:" , titleplayername , "title" , activetitle ) }
		if (titleplayer.getEffect('village_hero') )
			{
				if (titlestring.includes("§gHERO§r"))
				{
					activetitle = titleplayer.getEffect('village_hero');
					// activetitle = titleplayer.getEffect('village_hero');
				if (config.debuglog == true) { console.log("TITLE CHECK:" , titleplayername , "title" , activetitle ) }
					hastitle = true;
				}
				if (titlestring.includes("HERO") == false)
				{
					activetitle = titleplayer.getEffect('village_hero');
					if (config.debuglog == true) { console.log(activetitle) }
					// titleplayer.nameTag = (`§gHERO ${[titleplayername]}§f`);
					// console.log(titleplayer.nameTag , "TITLE:" , activetitle );
					hastitle = true;
				}
			}
			
			if (titleplayer.getEffect('village_hero') == undefined) //&& hastitle == true)
			{
				// console.log("Player has leftover title");
				console.log(titlestring);
				if (titlestring.includes("HERO"))
				{
					// titleplayer.nameTag = (`${[titleplayer.name]}`);
					hastitle = false;
					console.log("removing old HERO title");
					console.log(titleplayername);
					
				}
			// console.log(titleplayer.nameTag);
			}
		}
		else {
			if (config.debuglog == true) { console.log("TITLE CHECK:" , titleplayername , "has no title") }
			hastitle = false;
			}
		}
}
