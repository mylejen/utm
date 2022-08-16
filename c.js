document.documentElement.style.scrollBehavior = "smooth";
var separate = window.location.hostname.split('.'); separate.shift();
var domainName = separate.join('.');
var utmparams = new URLSearchParams(window.location.search);

let checkef2 = document.querySelector("label[for=extra_field_2]") !== null;
if (checkef2) { var textef2 = document.querySelector("label[for=extra_field_2]").textContent;
}

let checkef3 = document.querySelector("label[for=extra_field_3]") !== null;
if (checkef3) { var textef3 = document.querySelector("label[for=extra_field_3]").textContent;
}

let utm_campaign = utmparams.get("utm_campaign")
let utm_source = utmparams.get("utm_source")

let localutmSource = utmparams.get("utm_source")
let utmSource = encodeURIComponent(localutmSource);

let localutmMedium = utmparams.get("utm_medium")
let utmMedium = encodeURIComponent(localutmMedium);

let localutmCampaign = utmparams.get("utm_campaign")
let utmCampaign = encodeURIComponent(localutmCampaign);

let localutmFirstCampaign = utmparams.get("utm_campaign")
let utmFirstCampaign = encodeURIComponent(localutmFirstCampaign);

let localutmContent = utmparams.get("utm_content")
let utmContent = encodeURIComponent(localutmContent);

let localutmTerm = utmparams.get("utm_term")
let utmTerm = encodeURIComponent(localutmTerm);

let localutmID = utmparams.get("utm_id")
let utmID = encodeURIComponent(localutmID);

let localutmRef = utmparams.get("ref")
let utmRef = encodeURIComponent(localutmRef);

let localutmPlacement = utmparams.get("utm_placement")
let utmPlacement = encodeURIComponent(localutmPlacement);

let localutmCID = utmparams.get("utm_cid")
let utmCID = encodeURIComponent(localutmCID);

if (utmparams.get("utm_campaign")){
sessionStorage.setItem('utm_campaign', utmparams.get("utm_campaign")) };

if (utmparams.get("utm_source")){
sessionStorage.setItem('utm_source', utmparams.get("utm_source")) };

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

if (utmSource !== null || utmMedium !== null || utmCampaign !== null || utmContent !== null || utmTerm !== null || utmID !== null) {

document.cookie = "muSource=" + utmSource + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muMedium=" + utmMedium + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muCampaign=" + utmCampaign + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muContent=" + utmContent + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muTerm=" + utmTerm + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muID=" + utmID + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muRef=" + utmRef + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muPlacement=" + utmPlacement + ";" + expires + ";path=/; secure; domain=." + domainName;
document.cookie = "muCID=" + utmCID + ";" + expires + ";path=/; secure; domain=." + domainName;

localStorage.setItem('muSource', localutmSource);
localStorage.setItem('muMedium', localutmMedium);
localStorage.setItem('muCampaign', localutmCampaign);
localStorage.setItem('muContent', localutmContent);
localStorage.setItem('muTerm', localutmTerm);
localStorage.setItem('muID', localutmID);
localStorage.setItem('muRef', localutmRef);
localStorage.setItem('muPlacement', localutmPlacement);
localStorage.setItem('muCID', localutmCID);

}

if (utmFirstCampaign !== null) {
  
let cFirstCampaign = ('; '+document.cookie).split(`; muFirstCampaign=`).pop().split(';')[0];

      if (cFirstCampaign == "" || cFirstCampaign == null || cFirstCampaign == "null") {
          localStorage.setItem('muFirstCampaign', localutmFirstCampaign);
          document.cookie = "muFirstCampaign=" + utmFirstCampaign + ";" + expires + ";path=/; secure; domain=." + domainName;
          }
          
}

sessionStorage.setItem("hasRunAxios", "0");
localStorage.setItem("hasRunAxios", "0");

function text(url) { return fetch(url).then(res => res.text()); }

text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
let ipRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/
let myipaddress = data.match(ipRegex)[0];
let currenturl = window.location.protocol + "//" + window.location.host

if (myipaddress == "183.171.27.151") {
alert('Sorry, contact admin to access');
window.location = currenturl; }
});

let checkbuttonscroll = document.getElementById("buttonscroll") !== null;
if (checkbuttonscroll) {
let hrefscroll = document.getElementById("buttonscroll").hash;
document.getElementById("buttonscroll").href = window.location.href.split("#")[0] + hrefscroll;
}

let checktarikh = document.getElementById("tarikh") !== null;
if (checktarikh) {
const now = new Date();
let days = new Array('Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu');
let months = new Array('Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember');
let date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
function fourdigits(number) {
return (number < 1000) ? number + 1900 : number; }
today = days[now.getDay()] + ", " + date + " " + months[now.getMonth()] + " " + (fourdigits(now.getYear())) ;
document.getElementById("tarikh").innerHTML = today;
}

let lejen = document.querySelector('script[src*="utm"]')
let sasaran = lejen.getAttribute("sasaran")
let checklejen = sasaran !== null;

if (checklejen) {
var customDonationCurrentValue = Number(PageData.salesStats.total_amount_all);
var customDonationTargetValue = parseFloat(sasaran);
var customDonationPercentage = (customDonationCurrentValue / customDonationTargetValue) * 100;
$("#custom-donation-current-value").html(customDonationCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-target-value").html(customDonationTargetValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-progress-bar").find(".progress-bar").css("width", (customDonationPercentage > 100 ? 100 : customDonationPercentage).toFixed(2) + "%").html(customDonationPercentage.toFixed(2) + "%"); }
