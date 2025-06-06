document.documentElement.style.scrollBehavior = "smooth";

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
	    
	    	var cAudience = localStorage.getItem('muAudience');
	    	
	    	var cFbc = localStorage.getItem('_fbc');
	    	if (cFbc == "" || cFbc == null || cFbc == "null" || cFbc == "undefined") { var cFbc = getCookie("_fbc"); }
	    
		var cFbp = localStorage.getItem('_fbp');
	    	if (cFbp == "" || cFbp == null || cFbp == "null" || cFbp == "undefined") { var cFbp = getCookie("_fbp"); }
	    	
		var cTtp = localStorage.getItem('_ttp');
	    	if (cTtp == "" || cTtp == null || cTtp == "null" || cTtp == "undefined") { var cTtp = getCookie("_ttp"); }
	    
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
			    	var cAudience = getCookie("muAudience");
			    
				// var cRef = getCookie("muRef");
			    	var cRef = "cookies";

		    		}	
		
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
			  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://webhook.site/lejen', true);
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
	    utmcid: cCID,
	    audience: cAudience
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

// Since 21 Okt 2022
// Add Audience Params on 8 Okt 2023
// Updated to new webhook url on 27 May 2025
