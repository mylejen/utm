document.documentElement.style.scrollBehavior = "smooth";
var separate = window.location.hostname.split('.'); separate.shift();
var domainName = separate.join('.');
var utmparams = new URLSearchParams(window.location.search);
var textef2 = document.querySelector("label[for=extra_field_2]").textContent;
var textef3 = document.querySelector("label[for=extra_field_3]").textContent;

var utm_campaign = utmparams.get("utm_campaign")
var utm_source = utmparams.get("utm_source")
var utmSource = utmparams.get(encodeURIComponent("utm_source"));
var utmMedium = utmparams.get(encodeURIComponent("utm_medium"));
var utmCampaign = utmparams.get(encodeURIComponent("utm_campaign"));
var utmContent = utmparams.get(encodeURIComponent("utm_content"));
var utmTerm = utmparams.get(encodeURIComponent("utm_term"));
var utmID = utmparams.get(encodeURIComponent("utm_id"));
var utmRef = utmparams.get(encodeURIComponent("ref"));
var utmFirstCampaign = utmparams.get(encodeURIComponent("utm_campaign"));

if (utmparams.get("utm_campaign")){
sessionStorage.setItem('utm_campaign', utmparams.get("utm_campaign"))};

if (utmparams.get("utm_source")){
sessionStorage.setItem('utm_source', utmparams.get("utm_source"))};

utm_campaign = sessionStorage.utm_campaign
utm_source = sessionStorage.utm_source

if (textef2 == "Source") {
document.querySelector("label[for=extra_field_2]").style.display = "none";
document.querySelector("input[id=extra_field_2]").style.display = "none";
let field2 = document.getElementById("extra_field_2")
field2.value = utm_source
}

if (textef3 == "Campaign" || textef3 == "Ref" || textef3 == "Rujukan") {
document.querySelector("label[for=extra_field_3]").style.display = "none";
document.querySelector("input[id=extra_field_3]").style.display = "none";
let field3 = document.getElementById("extra_field_3")
field3.value = utm_campaign
}

const d = new Date();
let exdays = 90;
d.setTime(d.getTime() + (exdays*24*60*60*1000));
let expires = "expires="+ d.toUTCString();

document.cookie = "muSource=" + utmSource + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muMedium=" + utmMedium + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muCampaign=" + utmCampaign + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muContent=" + utmContent + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muTerm=" + utmTerm + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muID=" + utmID + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muRef=" + utmRef + ";" + expires + ";path=/; secure; domain=." + domainName;
const cFirstCampaign = ('; '+document.cookie).split(`; muFirstCampaign=`).pop().split(';')[0];
if (cFirstCampaign == "" || cFirstCampaign == null || cFirstCampaign == "null") {
document.cookie = "muFirstCampaign=" + utmFirstCampaign + ";" + expires + ";path=/; secure; domain=." + domainName; }
sessionStorage.setItem("hasRunAxios", "0");

lejen = document.querySelector("script[src*=utm\\@main]")
sasaran = lejen.getAttribute("sasaran")

let total_amount_all = null;
let PageData = null;
var customDonationCurrentValue = Number(PageData.salesStats.total_amount_all);
var customDonationTargetValue = parseFloat(sasaran);
var customDonationPercentage = (customDonationCurrentValue / customDonationTargetValue) * 100;

console.log("1: " + total_amount_all)
console.log("2: " + PageData)
console.log("3: " + customDonationCurrentValue)


$("#custom-donation-current-value").html(customDonationCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-target-value").html(customDonationTargetValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-progress-bar").find(".progress-bar").css("width", (customDonationPercentage > 100 ? 100 : customDonationPercentage).toFixed(2) + "%").html(customDonationPercentage.toFixed(2) + "%");
