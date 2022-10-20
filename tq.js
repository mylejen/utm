document.documentElement.style.scrollBehavior = "smooth";

/* var dbjs = document.createElement("script");
    dbjs.setAttribute("src", "https://cdn.jsdelivr.net/gh/mylejen/utm@latest/db1.min.js");
    dbjs.setAttribute("type", "text/javascript");
    document.body.appendChild(dbjs);

dbjs.onload = () => {
    if (document.readyState !== "loading") {
        initMuTrack();
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            initMuTrack();
        });
    }
*/
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
		
	   	function text(url) { return fetch(url).then(res => res.text()); }
		function convertToFloat(value) { return parseFloat(value.replace(",", "")); }

		var currenturl = window.location.protocol + "//" + window.location.host + window.location.pathname
		let myuseragent = navigator.userAgent;
		unixTimestamp = Math.floor(Date.now() / 1000)
	    
	    btotal = total
	    ftotal = convertToFloat(btotal)
	    
	    bproprice = proprice
	    fproprice = convertToFloat(bproprice)

	if (disahkan == 1) {
		   text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
		     let ipRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/
		     let myipaddress = data.match(ipRegex)[0];

	var hasRunAxios = sessionStorage.getItem("hasRunAxios");
	var numAxios = Number(localStorage.getItem('numAxios'));

		  if (hasRunAxios !== "1") {
		    numAxios = numAxios + 1;
		    localStorage.setItem('numAxios', numAxios.toString());
		    var numAxios = Number(localStorage.getItem('numAxios'));

	var checklejentoken = document.querySelector('script[src*="utm"]').getAttribute("token") !== null;
			  
			  if (checklejentoken) {
				  var lejenUrl = document.querySelector('script[src*="utm"]');
				  var lejentoken = lejenUrl.getAttribute("token");

if (lejentoken == "MSP" || lejentoken == "RASU" || lejentoken == "MSU" || lejentoken == "SAA" || lejentoken == "STGR" || lejentoken == "STI" || lejentoken == "ATIQ" || lejentoken == "MATAN" || lejentoken == "MBP" || lejentoken == "MFK" || lejentoken == "SJH" || lejentoken == "MAM" || lejentoken == "MPJ" || lejentoken == "PUSU" || lejentoken == "MAJ" || lejentoken == "MPK" || lejentoken == "MUQA" || lejentoken == "MTC" || lejentoken == "YEZP" || lejentoken == "ADDIN16" || lejentoken == "ADDINMN" || lejentoken == "PEMATAP" || lejentoken == "WADAH" || lejentoken == "MACB" || lejentoken == "PNAB" || lejentoken == "KECHIL" || lejentoken == "MUSTA" || lejentoken == "MKCE") {
	
	var pabblyid = "IjU3NjAwNTZiMDYzMTA0MzE1MjZhNTUzNCI_3D_pc"
	
	}  else { var pabblyid = "IjU3NjAwNTZiMDYzMTA0MzE1MjZhNTUzNCI_3D_pc" }
			  
			  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://connect.pabbly.com/workflow/sendwebhookdata/' + pabblyid, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
	    uid: uid,
	    email: email,
	    name: name,
	    phone: phone,
	    status: disahkan,
	    invoice: invoice,
	    total: ftotal,
	    productid: proid,
	    productname: proname,
	    productprice: fproprice,
	    productquantity: proqty,
	    user: lejentoken,
	    // offlineeventid: offlineeventid,
	    // metapixelid: metapixelid,
	    // adaccountid: adaccountid,
	    // audienceid: audienceid,
	    url: currenturl,
	    timestamp: unixTimestamp,
	    ipaddress: myipaddress,
	    useragent: myuseragent,
	    utmsource: cSource,
	    utmmedium: cMedium,
	    utmcampaign: cCampaign,
	    utmcontent: cContent,
	    utmterm: cTerm,
	    utmid: cID,
	    ref: cRef,
	    utmfirstcampaign: cFirstCampaign,
	    totalrun: numAxios,
	    fbc: cFbc,
	    fbp: cFbp,
	    ttp: cTtp,
	    utmplacement: cPlacement,
	    utmcid: cCID
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
    }
};

// 21 Okt 2022
