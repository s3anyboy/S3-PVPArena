import * as time from './Time.js'
import * as teams from './PVPTeams.js'

// DO NOT EDIT ABOVE THIS LINE


// User CONFIG OPTIONS: 
// Default Settings are listed in [Square Brackets] for reference

// ARENA LOCATIONS
export const ARENA_X_SIZE = 30; // UNUSED
export const ARENA_Z_SIZE = 30; // UNUSED
export const ARENA_X_LOC = 9985;
export const ARENA_Y_LOC = 63;
export const ARENA_Z_LOC = 10015;
export const ARENA_X_OFFSET = 0;
export const ARENA_Y_OFFSET = 0;
export const ARENA_Z_OFFSET = 0;

// SPECTATOR BOX
export const SPECTATOR_X_LOC = 9960;
export const SPECTATOR_Y_LOC = 78;
export const SPECTATOR_Z_LOC = 9980;
export const SPECTATOR_X_OFFSET = 0;
export const SPECTATOR_Y_OFFSET = 0;
export const SPECTATOR_Z_OFFSET = 0;

// TEAMS
var RANDOM_TEAM = 0;

export var RED_TEAM_ALLOWED = true; // Whether players can join this team [true]
export var RED_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const RED_X_LOC = 10018;
export const RED_Y_LOC = 63;
export const RED_Z_LOC = 10008;

export var BLUE_TEAM_ALLOWED = true;
export var BLUE_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const BLUE_X_LOC = 10017;
export const BLUE_Y_LOC = 63;
export const BLUE_Z_LOC = 9953;

export var GREEN_TEAM_ALLOWED = true;
export var GREEN_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const GREEN_X_LOC = 10000;
export const GREEN_Y_LOC = 63;
export const GREEN_Z_LOC = 10000;

export var YELLOW_TEAM_ALLOWED = true;
export var YELLOW_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const YELLOW_X_LOC = 9953;
export const YELLOW_Y_LOC = 63;
export const YELLOW_Z_LOC = 9953;

export var PURPLE_TEAM_ALLOWED = true;
export var PURPLE_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const PURPLE_X_LOC = 9953;
export const PURPLE_Y_LOC = 63;
export const PURPLE_Z_LOC = 10007;

export var ORANGE_TEAM_ALLOWED = true;
export var ORANGE_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const ORANGE_X_LOC = 10000;
export const ORANGE_Y_LOC = 63;
export const ORANGE_Z_LOC = 10000;

export var BLACK_TEAM_ALLOWED = true;
export var BLACK_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const BLACK_X_LOC = 10000;
export const BLACK_Y_LOC = 63;
export const BLACK_Z_LOC = 10000;

export var WHITE_TEAM_ALLOWED = true;
export var WHITE_TEAM_OVERRIDE = RANDOM_TEAM; // If players cannot join this team which team they are placed on instead [RANDOM_TEAM]
export const WHITE_X_LOC = 10000;
export const WHITE_Y_LOC = 63;
export const WHITE_Z_LOC = 10000;

// General gametype config
export var scorelimit = 3 // Generic score limit (overwritten by gametype specific scores)
export var timelimit = 10 // PVP match time limit in minutes default 10

// Gametype World/Weather
export var alwaysday = false // PVP match day lock [false]
export var daycycle = true // PVP match day cycle [true]
export var weathercycle = true // PVP match weather cycle [true]
export var insomnia = false // PVP match insomnia (phantom spawns) [false]

// Gametype Player Damage
export var healthregen = true // Whether players can naturally regenrate health [true]
export var drowningdamage = true // PVP match drowning damage [true]
export var falldamage = true // PVP match fall damage [true]
export var firedamage = true // PVP match fire damage [true]
export var freezedamage = true // PVP match freeze damage [true]


export var herobonus = true; // Whether players get Hero of the Village buff after winning a match [true]
export var lootbonus = false; // Whether players get a loot bonus after winning a match [true]
export var xpkillbonus = false; // Whether players get an XP bonus after killing a player in PVP [false]
export var xpwinbonus = true; // Whether players get an XP bonus after winning a match [true]

// Slayer Config
export var killlimit = 10; // PVP match kill limit
export var punishdeaths = 0; // How many points to remove per player death [0]
export var punishsd = -1; // How many points to remove per player selfdeath [-1]
export var dmtimelimit = 5; // Time limit for slayer [10]

// CTF Config
export var flagstowin = 3; // CTF score limit default 3
export var flaghomerule = true; // Whether a team must have their own flag in order to capture and enemy one [true]
export var flagreturninstant = true; // Whether the flag returns instantly after the player carrying it dies  [true]
export var flagreturntouch = false; // Whether the flag returns instantly after the player carrying it dies  [false]
// If both flagreturninstant and flagreturntouch options are false, a player must physically pickup and return their own flag
export var forceflagcarry = false; // Whether to force a player with the flag to hold it in their mainhand [false]
export var ctftimelimit = 15; // Time limit for ctf [15]

// Firefight Config
export var wavestowin = 7; // How many waves the players must survive to win
export var ffsurvival = true; // Whether to limit player lives/respawns
export var ffsharelives = true; // Whether players share lives or each have their own pool [true]
export var fflives = 7; // Number of player lives [7]
export var ffbosswaves = true; // Whether to spawn boss waves
export var fftimelimit = 0; // Time limit for firefight matches [0] (no limit)
export var ffversusmode = false; // Whether to allow enemy player teams in firefight (direct combat) [false]
export var ffgambitmode = false; // Whether to allow enemy player temas in firefight (indirect competition) [false]
export var ffherobonus = true; // Whether players get Hero of the Village buff after successful firefight match [true]

// Trackers config
export var logallkills = true; // Whether to private log all kills in chat for each player [true]
export var announceallkills = true; // Whether to publically annouce all kills in chat for every player [false]