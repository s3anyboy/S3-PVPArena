import * as time from './Time.js'

// ARENA LOCATIONS
export const START_TICK = 100;
export const ARENA_X_SIZE = 30;
export const ARENA_Z_SIZE = 30;
export const ARENA_X_OFFSET = 0;
export const ARENA_Y_OFFSET = 0;
export const ARENA_Z_OFFSET = 0;
export const ARENA_X_LOC = 9985;
export const ARENA_Y_LOC = 63;
export const ARENA_Z_LOC = 10015;

// SPECTATOR BOX
export const SPECTATOR_X_OFFSET = 0;
export const SPECTATOR_Y_OFFSET = 0;
export const SPECTATOR_Z_OFFSET = 0;
export const SPECTATOR_X_LOC = 9960;
export const SPECTATOR_Y_LOC = 78;
export const SPECTATOR_Z_LOC = 9980;

// TEAM SPAWNS
export const RED_X_LOC = 10018;
export const RED_Y_LOC = 63;
export const RED_Z_LOC = 10008;

export const GREEN_X_LOC = 10000;
export const GREEN_Y_LOC = 63;
export const GREEN_Z_LOC = 10000;

export const BLUE_X_LOC = 9985;
export const BLUE_Y_LOC = 63;
export const BLUE_Z_LOC = 10015;

export const YELLOW_X_LOC = 9985;
export const YELLOW_Y_LOC = 63;
export const YELLOW_Z_LOC = 10015;

export const PURPLE_X_LOC = 9985;
export const PURPLE_Y_LOC = 63;
export const PURPLE_Z_LOC = 10015;

export const ORANGE_X_LOC = 10000;
export const ORANGE_Y_LOC = 63;
export const ORANGE_Z_LOC = 10000;

export const BLACK_X_LOC = 10000;
export const BLACK_Y_LOC = 63;
export const BLACK_Z_LOC = 10000;

export const WHITE_X_LOC = 10000;
export const WHITE_Y_LOC = 63;
export const WHITE_Z_LOC = 10000;

// General gametype config
export var scorelimit = 3 // Generic score limit (overwritten by gametype specific scores)
export var timelimit = 10 // PVP match time limit in minutes default - 10

export var alwaysday = false // PVP match day lock default - false
export var daycycle = true // PVP match day cycle default - true
export var weathercycle = true // PVP match weather cycle default - true

export var healthregen = true // Whether players can naturally regenrate health when full - default true

export var drowningdamage = true // PVP match drowning damage - default true
export var falldamage = true // PVP match fall damage - default true
export var firedamage = true // PVP match fire damage - default true
export var freezedamage = true // PVP match freeze damage - default true

export var insomnia = false // PVP match insomnia (phantom spawns) - default false



export var herobonus = true; // Whether players get Hero of the Village buff after winning a match default - true

// Slayer Config
export var killlimit = 10; // PVP match kill limit
export var punishdeaths = 0; // How many points to remove per player death default - 0
export var punishsd = -1; // How many points to remove per player selfdeath default - -1
export var dmtimelimit = 5; // Time limit for slayer default - 5

// CTF Config
export var flagstowin = 3; // CTF score limit default - 3
export var flaghomerule = true; // Whether a team must have their own flag in order to capture and enemy one - default true
export var flagreturninstant = false; // Whether the flag returns instantly after the player carrying it dies  - default true
export var flagreturntouch = false; // Whether the flag returns instantly after the player carrying it dies  - default false
// if both flagreturninstant and flagreturntouch are false, a player must physically pickup and return their own flag
export var ctftimelimit = 0; // Time limit for ctf

// Firefight Config
export var wavestowin = 7; // How many waves the players must survive to win
export var ffsurvival = true; // Whether to limit player lives/respawns
export var ffsharelives = true; // Whether players share lives or each have their own pool default - true
export var fflives = 7; // Number of player lives default - 7
export var bosswaves = true; // Whether to spawn boss waves
export var fftimelimit = 0; // Time limit for firefight matches default - 0 (no limit)
export var versusmode = false; // Whether to allow enemy player teams in firefight (direct combat) default - false
export var gambitmode = false; // Whether to allow enemy player temas in firefight (indirect competition) default - false
export var ffherobonus = true; // Whether players get Hero of the Village buff after successful firefight match

