document.documentElement.style.scrollBehavior = "smooth";
var separate = window.location.hostname.split('.'); separate.shift();
var domainName = separate.join('.');
var utmparams = new URLSearchParams(window.location.search);
var textef2 = document.querySelector("label[for=extra_field_2]").textContent;
var textef3 = document.querySelector("label[for=extra_field_3]").textContent;

let utm_campaign = utmparams.get("utm_campaign")
let utm_source = utmparams.get("utm_source")
let utmSource = utmparams.get(encodeURIComponent("utm_source"));
let utmMedium = utmparams.get(encodeURIComponent("utm_medium"));
let utmCampaign = utmparams.get(encodeURIComponent("utm_campaign"));
let utmContent = utmparams.get(encodeURIComponent("utm_content"));
let utmTerm = utmparams.get(encodeURIComponent("utm_term"));
let utmID = utmparams.get(encodeURIComponent("utm_id"));
let utmRef = utmparams.get(encodeURIComponent("ref"));
let utmFirstCampaign = utmparams.get(encodeURIComponent("utm_campaign"));

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
let exdays = 360;
d.setTime(d.getTime() + (exdays*24*60*60*1000));
let expires = "expires="+ d.toUTCString();

if (utmSource !== null || utmMedium !== null || utmCampaign !== null || utmContent !== null || utmTerm !== null || utmID !== null || utmRef !== null) {
document.cookie = "muSource=" + utmSource + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muMedium=" + utmMedium + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muCampaign=" + utmCampaign + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muContent=" + utmContent + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muTerm=" + utmTerm + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muID=" + utmID + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muRef=" + utmRef + ";" + expires + ";path=/; secure; domain=." + domainName; }
if (utmFirstCampaign !== null) {
let cFirstCampaign = ('; '+document.cookie).split(`; muFirstCampaign=`).pop().split(';')[0];
if (cFirstCampaign == "" || cFirstCampaign == null || cFirstCampaign == "null") {
document.cookie = "muFirstCampaign=" + utmFirstCampaign + ";" + expires + ";path=/; secure; domain=." + domainName; }}
sessionStorage.setItem("hasRunAxios", "0");

lejen = document.querySelector("script[src*=utm\\@main]")
sasaran = lejen.getAttribute("sasaran")

var customDonationCurrentValue = Number(PageData.salesStats.total_amount_all);
var customDonationTargetValue = parseFloat(sasaran);
var customDonationPercentage = (customDonationCurrentValue / customDonationTargetValue) * 100;
$("#custom-donation-current-value").html(customDonationCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-target-value").html(customDonationTargetValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-progress-bar").find(".progress-bar").css("width", (customDonationPercentage > 100 ? 100 : customDonationPercentage).toFixed(2) + "%").html(customDonationPercentage.toFixed(2) + "%");
