var script = document.createElement("script");
script.setAttribute("src", "https://unpkg.com/axios/dist/axios.min.js");
script.setAttribute("type", "text/javascript");
document.head.appendChild(script);
document.documentElement.style.scrollBehavior = "smooth";

script.onload = () => {
    if (document.readyState !== "loading") {
        initMuTrack();
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            initMuTrack();
        });
    }

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
		fromUrl = document.querySelector("script[src*=utm\\@latest]");
		uid = fromUrl.getAttribute("uid")
		email = fromUrl.getAttribute("email")
		name = fromUrl.getAttribute("name")
		phone = fromUrl.getAttribute("phone")
		menunggu = fromUrl.getAttribute("menunggu")
		disahkan = fromUrl.getAttribute("disahkan")
		invoice = fromUrl.getAttribute("invoice")
		btotal = fromUrl.getAttribute("total")
		total = convertToFloat(btotal)
		proid = fromUrl.getAttribute("proid")
		proname = fromUrl.getAttribute("proname")
		bproprice = fromUrl.getAttribute("proprice")
		proprice = convertToFloat(bproprice)
		proqty = fromUrl.getAttribute("proqty")
		user = fromUrl.getAttribute("user")
		oid = fromUrl.getAttribute("oid")
		pid = fromUrl.getAttribute("pid")
		actid = fromUrl.getAttribute("actid")
		audid = fromUrl.getAttribute("audid")
		var pabblyid = fromUrl.getAttribute("hookid")
		var unixTimestamp = Math.floor(Date.now() / 1000)

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

   axios.post('https://connect.pabbly.com/workflow/sendwebhookdata/' + pabblyid, {
	    uid: uid,
	    email: email,
	    name: name,
	    phone: phone,
	    status: disahkan,
	    invoice: invoice,
	    total: total,
	    productid: proid,
	    productname: proname,
	    productprice: proprice,
	    productquantity: proqty,
	    user: user,
	    offlineeventid: oid,
	    metapixelid: pid,
	    adaccountid: actid,
	    audienceid: audid,
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
        })
		    .then(function (response) {
    		      // console.log(response);
  		});

		sessionStorage.setItem("hasRunAxios", "1");
		localStorage.setItem("hasRunAxios", "1");
		  }

             });

         }
    }
};

// 1 August 2022
// For Backup Purpose