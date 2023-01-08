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

// FOR COMPLETE PAYMENT

if (window.location.href.indexOf("payment_completion") > -1) {

    initMuTrack();

    function initMuTrack() {

	    function getCookie(name) {
    		var cookieArr = document.cookie.split(";");
    		for(var i = 0; i < cookieArr.length; i++) {
        		var cookiePair = cookieArr[i].split("=");
        		if(name == cookiePair[0].trim()) {
            	return decodeURIComponent(cookiePair[1]); } } 
		    return null;
	    	}
	    
		var cSource = localStorage.getItem('muSource');
		var cMedium = localStorage.getItem('muMedium');

		var cCampaign = localStorage.getItem('muCampaign');
		var cFirstCampaign = localStorage.getItem('muFirstCampaign');

		var cContent = localStorage.getItem('muContent');
		var cTerm = localStorage.getItem('muTerm');

		var cID = localStorage.getItem('muID');
	    	var cPlacement = localStorage.getItem('muPlacement');
	    	var cCID = localStorage.getItem('muCID');
	    
		// var cRef = localStorage.getItem('muRef');
	    	var cRef = "local";
	   
	    	    if (cSource == "" || cSource == null || cSource == "null") {

				var cSource = getCookie("muSource");
				var cMedium = getCookie("muMedium");

				var cCampaign = getCookie("muCampaign");
				var cFirstCampaign = getCookie("muFirstCampaign");

				var cContent = getCookie("muContent");
				var cTerm = getCookie("muTerm");

				var cID = getCookie("muID");
			    	var cPlacement = getCookie("muPlacement");
			    	var cCID = getCookie("muCID");
			    
				// var cRef = getCookie("muRef");
			    	var cRef = "cookies";

		    		}
			    
				var cFbc = getCookie("_fbc");
				var cFbp = getCookie("_fbp");
				var cTtp = getCookie("_ttp");
	    
				var kb_email = localStorage.getItem('W_EML');
				var kb_name = localStorage.getItem('W_UN');
	    
	    var searchParams = new URLSearchParams(window.location.href.split("?")[1]);
	    var kb_orderid = searchParams.get("order_id");
	    
	    for (var i = 0; i < window.dataLayer.length; i++) {
		    if (window.dataLayer[i].status !== undefined) {
			    var status = window.dataLayer[i].status;
			    var content_name = window.dataLayer[i].content_name;
			    var transactionId = window.dataLayer[i].transactionId;
			    var transactionTotal = window.dataLayer[i].transactionTotal;
			    var transactionAffiliation = window.dataLayer[i].transactionAffiliation;
			    break;
		    }
	    }

		
	   	function text(url) { return fetch(url).then(res => res.text()); }
		// function convertToFloat(value) { return parseFloat(value.replace(",", "")); }

		var currenturl = window.location.protocol + "//" + window.location.host + window.location.pathname
		let myuseragent = navigator.userAgent;
		unixTimestamp = Math.floor(Date.now() / 1000)
	    
	    // btotal = transactionTotal
	    // ftotal = convertToFloat(btotal)
	    

	if (status == true) {
		   text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
		     let ipRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/
		     let myipaddress = data.match(ipRegex)[0];

	var hasRunAxios = sessionStorage.getItem("hasRunAxios");
	var numAxios = Number(localStorage.getItem('numAxios'));

		  if (hasRunAxios !== "1") {
		    numAxios = numAxios + 1;
		    localStorage.setItem('numAxios', numAxios.toString());
		    var numAxios = Number(localStorage.getItem('numAxios'));

	 var pabblyid = "IjU3NjMwNTZlMDYzNzA0MzU1MjZkNTUzMiI_3D_pc"
	 
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://connect.pabbly.com/workflow/sendwebhookdata/' + pabblyid, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
	    status: status,
	    contentname: content_name,
	    transactionId: transactionId,
	    total: transactionTotal,
	    transactionAffiliation: transactionAffiliation,
	    orderid: kb_orderid,
	    email: kb_email,
	    name: kb_name,
	    url: currenturl,
	    timestamp: unixTimestamp,
	    ipaddress: myipaddress,
	    useragent: myuseragent,
	    totalrun: numAxios,
	    utmsource: cSource,
	    utmmedium: cMedium,
	    utmcampaign: cCampaign,
	    utmcontent: cContent,
	    utmterm: cTerm,
	    utmid: cID,
	    ref: cRef,
	    utmfirstcampaign: cFirstCampaign,
	    utmplacement: cPlacement,
	    utmcid: cCID,
	    fbc: cFbc,
	    fbp: cFbp,
	    ttp: cTtp
   }));
    xhr.onload = function() {
     var data = JSON.parse(this.responseText);
      console.log(data);
    };
		sessionStorage.setItem("hasRunAxios", "1");
		localStorage.setItem("hasRunAxios", "1");
		  }

             });

         }
    // }
};

}


// 9 Jan 2023
