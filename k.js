document.documentElement.style.scrollBehavior = "smooth";

if (window.location.href.indexOf("payment_completion") === -1) {

var separate = window.location.hostname.split('.'); separate.shift();
var domainName = separate.join('.');
var utmparams = new URLSearchParams(window.location.search);

let utm_campaign = utmparams.get("utm_campaign")
let utm_source = utmparams.get("utm_source")
let utm_ref = utmparams.get("ref")

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

if (utmparams.get("ref")){
sessionStorage.setItem('utm_ref', utmparams.get("ref")) };

utm_campaign = sessionStorage.utm_campaign
utm_source = sessionStorage.utm_source
utm_ref = sessionStorage.utm_ref

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


let checkbuttonclassname = document.getElementsByClassName("buttonscroll") !== null;
if (checkbuttonclassname) {
	let buttonClassName = document.getElementsByClassName("buttonscroll");
	for(var index=0; index < buttonClassName.length; index++){
		let hrefbuttonscroll = buttonClassName[index].hash;
		buttonClassName[index].href = window.location.href.split("#")[0] + hrefbuttonscroll;
	}
}

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
  
}
