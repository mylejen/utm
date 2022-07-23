const d = new Date();
let exdays = 90;
d.setTime(d.getTime() + (exdays*24*60*60*1000));
let expires = "expires="+ d.toUTCString();

var separate = window.location.hostname.split('.'); separate.shift();
var domainName = separate.join('.');
var utmparams = new URLSearchParams(window.location.search);

var utmSource = utmparams.get(decodeURIComponent("utm_source"));
var utmMedium = utmparams.get(decodeURIComponent("utm_medium"));
var utmCampaign = utmparams.get(decodeURIComponent("utm_campaign"));
var utmContent = utmparams.get(decodeURIComponent("utm_content"));
var utmTerm = utmparams.get(decodeURIComponent("utm_term"));
var utmID = utmparams.get(decodeURIComponent("utm_id"));
var utmRef = utmparams.get(decodeURIComponent("ref"));

document.cookie = "muSource=" + utmSource + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muMedium=" + utmMedium + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muCampaign=" + utmCampaign + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muContent=" + utmContent + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muTerm=" + utmTerm + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muID=" + utmID + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muRef=" + utmRef + ";" + expires + ";path=/; secure; domain=." + domainName;
