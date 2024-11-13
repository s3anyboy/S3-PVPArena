
// TimeZone Calculation
import * as config from './PVPUserConfig.js'; // import user timezone and hemisphere settings
var TZOffset; 
var Hemisphere; 
TZOffset = config.TZOffset; 
Hemisphere = config.Hemisphere;

// Calculate milliseconds from hours
export const MSSec = 1000; // Milliseconds per second
export const SecMin = 60; // Seconds per minute
export const MSMin = (MSSec * SecMin); // Milliseconds per minute
export const MinHour = 60; // Minutes per hour
export const MSHour = (MSSec * SecMin * MinHour); // Milliseconds per hour
export const TZOffsetMS =  (MSHour * TZOffset); // User TimeZone offset (milliseconds)
  
// Java reported time
export var JavaTimeDate = new Date();
// console.log(JavaTimeDate); // Output Java Time/Date to console

export var JavaTime = JavaTimeDate.getTime();
// console.log(JavaTimeDate); // Outputs Time/Date

export var JavaMonth = JavaTimeDate.getUTCMonth();

// UTC time/date
export var UTCYear = JavaTimeDate.getUTCFullYear();
// console.log(UTCYear); // Outputs Year

export var UTCDate = JavaTimeDate.getUTCDate();
// console.log(UTCDate); // Outputs Date

export var UTCHour = JavaTimeDate.getUTCHours();
// console.log(UTCHour); // Outputs Hours

// Local time/date
export var LocalTimeDate = new Date(JavaTime + TZOffsetMS); //Add the JavaTime (milliseconds) and TZOffsetMS
console.log(LocalTimeDate); // Outputs Local Time/Date

export var LocalYear = LocalTimeDate.getUTCFullYear();
// console.log(LocalYear); // Outputs Local Year

export var LocalMonth = (LocalTimeDate.getUTCMonth() + 1);
// console.log(LocalMonth); // Outputs Local Month

export var LocalDate = LocalTimeDate.getUTCDate();
// console.log(LocalDate); // Outputs Local Date

export var LocalHour = LocalTimeDate.getUTCHours();
// console.log(LocalHour); // Outputs Local Hour

// Months
export const Jan = new Date("1");
export const Feb = new Date("2");
export const Mar = new Date("3");
export const Apr = new Date("4");
export const May = new Date("5");
export const Jun = new Date("6");
export const Jul = new Date("7");
export const Aug = new Date("8");
export const Sep = new Date("9");
export const Oct = new Date("10");
export const Nov = new Date("11");
export const Dec = new Date("12");

