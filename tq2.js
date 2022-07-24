var script = document.createElement("script");
script.setAttribute("src", "https://unpkg.com/axios/dist/axios.min.js");
script.setAttribute("type", "text/javascript");
var scriptIP = document.createElement("script").setAttribute("src", "https://l2.io/ip.js?var=myip");
document.head.appendChild(script);
document.head.appendChild(scriptIP);
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
            	return decodeURIComponent(cookiePair[1]); } } return null; }

				var cSource = getCookie("muSource");
				var cMedium = getCookie("muMedium");
				var cCampaign = getCookie("muCampaign");
				var cContent = getCookie("muContent");
				var cTerm = getCookie("muTerm");
				var cID = getCookie("muID");
				var cRef = getCookie("muRef");

		let myipaddress = myip
		let myuseragent = navigator.userAgent;
		
		fromUrl = document.querySelector("script[src*=utm\\@main]");
		uid = fromUrl.getAttribute("uid")
		email = fromUrl.getAttribute("email")
		name = fromUrl.getAttribute("name")
		phone = fromUrl.getAttribute("phone")
		menunggu = fromUrl.getAttribute("menunggu")
		disahkan = fromUrl.getAttribute("disahkan")
		invoice = fromUrl.getAttribute("invoice")
		btotal = fromUrl.getAttribute("total")
		total = convertToFloat("btotal")
		proid = fromUrl.getAttribute("proid")
		proname = fromUrl.getAttribute("proname")
		bproprice = fromUrl.getAttribute("proprice")
		proprice = convertToFloat("bproprice")
		proqty = fromUrl.getAttribute("proqty")
		var pabblyid = fromUrl.getAttribute("pabblyid")

		 function convertToFloat(value) {
			  return parseFloat(value.replace(",", "")); }

	if (disahkan == 1) {
        axios.post('https://connect.pabbly.com/workflow/sendwebhookdata/' + pabblyid, {
      uid: uid,
      email: email,
      name: name,
	    phone: phone,
	    menunggu: menunggu,
	    disahkan: disahkan,
	    invoice: invoice,
	    total: total,
	    proid: proid,
	    proname: proname,
	    proprice: proprice,
	    proqty: proqty,
	    cSource: cSource,
	    cMedium: cMedium,
	    cCampaign: cCampaign,
	    cContent: cContent,
	    cTerm: cTerm,
	    cID: cID,
	    cRef: cRef,
	    ipaddress: myipaddress,
	    useragent: myuseragent,
        })
		    .then(function (response) {
    		      console.log(response);
  		});
		}
    }
};
