import * as teams from './PVPTeams.js';
import * as pvp from './PVPArenaHandler.js';

// --- DO NOT EDIT ABOVE THIS LINE ---
// User CONFIG OPTIONS: 
// Default Settings are listed in [Square Brackets] for reference

// TimeZone Calculation
export var TZOffset = -6; // User TimeZone UTC offset (Hours) [0]
export const Hemisphere = "North"; // User Hemisphere (North/South) [North]

export var arena = pvp.arena;
export var arena1 = "Blockfort";
export var arena2 = "Jungle Gym";
export var arena3 = "Blockout";
export var arena4 = "Triangle Top";
export var arena5 = "Triangle Village";
export var arena6 = 1;

// ARENA LOCATIONS
export const ARENA_X_SIZE = 30; // UNUSED
export const ARENA_Z_SIZE = 30; // UNUSED
export const ARENA_X_LOC = 9985;
export const ARENA_Y_LOC = 63;
export const ARENA_Z_LOC = 10015;
export const ARENA_X_OFFSET = 0;
export const ARENA_Y_OFFSET = 0;
export const ARENA_Z_OFFSET = 0;

// ARENA2 LOCATIONS
export const ARENA2_X_SIZE = 30; // UNUSED
export const ARENA2_Z_SIZE = 30; // UNUSED
export const ARENA2_X_LOC = 9985;
export const ARENA2_Y_LOC = 63;
export const ARENA2_Z_LOC = 10015;
export const ARENA2_X_OFFSET = 0;
export const ARENA2_Y_OFFSET = 0;
export const ARENA2_Z_OFFSET = 0;

// ARENA3 LOCATIONS
export const ARENA3_X_SIZE = 30; // UNUSED
export const ARENA3_Z_SIZE = 30; // UNUSED
export const ARENA3_X_LOC = 9967;
export const ARENA3_Y_LOC = 100;
export const ARENA3_Z_LOC = 10179;
export const ARENA3_X_OFFSET = 0;
export const ARENA3_Y_OFFSET = 0;
export const ARENA3_Z_OFFSET = 0;

// ARENA4 LOCATIONS
export const ARENA4_X_SIZE = 30; // UNUSED
export const ARENA4_Z_SIZE = 30; // UNUSED
export const ARENA4_X_LOC = 9929;
export const ARENA4_Y_LOC = 66;
export const ARENA4_Z_LOC = 10062;
export const ARENA4_X_OFFSET = 0;
export const ARENA4_Y_OFFSET = 0;
export const ARENA4_Z_OFFSET = 0;

// ARENA5 LOCATIONS
export const ARENA5_X_SIZE = 30; // UNUSED
export const ARENA5_Z_SIZE = 30; // UNUSED
export const ARENA5_X_LOC = 9930;
export const ARENA5_Y_LOC = 110;
export const ARENA5_Z_LOC = 10058;
export const ARENA5_X_OFFSET = 0;
export const ARENA5_Y_OFFSET = 0;
export const ARENA5_Z_OFFSET = 0;

// HORDE ARENA LOCATION
export const HORDE_ARENA_X_LOC = 9985;
export const HORDE_ARENA_Y_LOC = 62;
export const HORDE_ARENA_Z_LOC = 9980;
export const HORDE_ARENA_X_OFFSET = 0;
export const HORDE_ARENA_Y_OFFSET = 0;
export const HORDE_ARENA_Z_OFFSET = 0;

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
export var scorelimit = 3 // Generic score limit (usually overwritten by gametype specific scores)
export var timelimit = 10 // PVP match time limit in minutes [10]

// Gametype World/Weather
export var alwaysday = false // PVP match day lock [false]
export var daycycle = true // PVP match day cycle [true]
export var weathercycle = true // PVP match weather cycle [true]
export var insomnia = false // PVP match insomnia (phantom spawns) [false]

// Gametype Player Damage
export var healthregen = true // Whether players can naturally regenrate health [true]
export var drowningdamage = true // PVP match drowning damage [true]
export var falldamage = false // PVP match fall damage [true]
export var firedamage = true // PVP match fire damage [true]
export var freezedamage = true // PVP match freeze damage [true]


export var pvpherobonus = true; // Whether players get Hero of the Village buff after winning a match [true]
export var pvplootbonus = false; // Whether players get a loot bonus after winning a match [true]
export var pvpxpkillbonus = false; // Whether players get an XP bonus after killing a player in PVP [false]
export var pvpxpwinbonus = true; // Whether players get an XP bonus after winning a match [true]

// Boss Kill Bonus

export var bossherobonus = true; // Whether players get Hero of the Village buff after killing a boss [true]
export var bosslootbonus = false; // Whether players get a loot bonus after killing a boss [true]
export var bossxpkillbonus = false; // Whether players get an XP bonus after killing a boss [false]


// Slayer Config
export var killlimit = 5; // PVP match kill limit [10]
export var punishdeaths = 0; // How many points to remove per player death [0]
export var punishsd = -1; // How many points to remove per player selfdeath [-1]
export var dmtimelimit = 5; // Time limit for slayer [10]

// CTF Config
export var flagstowin = 3; // CTF score limit [3]
export var flaghomerule = true; // Whether a team must have their own flag in order to capture and enemy one [true]
export var flagreturninstant = true; // Whether the flag returns instantly after the player carrying it dies  [true]
export var flagreturntouch = false; // Whether the flag returns instantly after the player carrying it dies  [false]
	// If both flagreturninstant and flagreturntouch options are false, a player must physically pickup and return their own flag
export var forceflagmainhand = false; // Whether to force a player with the flag to hold it in their mainhand [false]
export var forceflagoffhand = false; // Whether to force a player with the flag to hold it in their offhand [false]
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

// Trackers Config
export var trackcreativekills = true; // Whether to count kills for players in creative mode [false]
export var defaulttracker = true; // fake [true]
export var temptracker = false; // whether a tracker is being temporarily displayed [false]

export var logallkills = true; // Whether to log all kills in private chat for each player [true]
export var announceallkills = true; // Whether to announce all kills in public chat for every player [false]

export var logallblocks = false; // Whether to log all blocks placed/broken in private chat for each player  [false]
export var announceallblocks = false; // Whether to announce all blocks placed/broken in public chat for every player [false]

export var logallscoreupdate = false; // Whether to log every score update in private chat for each player [false]
export var logscoreupdate = false; // Whether to log generic score update in private chat for each player [false]
export var announceleaderchange = true; // Whether to log everytime a score leader is changed in public chat [true]
export var logleaderscorechange = false; // Whether to log everytime a score is updated in private chat for each player [false]
export var announceleaderscorechange = false; // Whether to log everytime a score is updated in public chat [false]


export var showdeathboard = true; // Whether to temporarily show the death tracker when a player dies outside of a PVP match [true]

// DEBUG Server Console Logging
export var debuglog = true; // Enables server debug console logging [false]
export var debuglogallkills = true; // Whether to log all kills in the server log [false]
export var debuglogplayerkills = true; // Whether to log all player kills in the server log [false]
export var debuglogallblocks = true; // Whether to log all blocks placed/broken in the server log [false]