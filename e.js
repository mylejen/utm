let checkDataUrl = document.getElementById("onpay-order-form") !== null;

if (checkDataUrl) {

  let currentUrl = window.location.href;
  let element = document.getElementById("onpay-order-form");
  let hrefString = element.getAttribute("data-url");

  if (currentUrl.toLowerCase().includes("sms")) {

    let newCampaignName = currentUrl.replace(/^https?:\/\/[^/]+/, '').split('/')[1];
    let newhrefString = element.setAttribute("data-url", hrefString + "?utm_source=sms&utm_medium=broadcast&utm_campaign=" + newCampaignName);

  } else {

    let newhrefString = element.setAttribute("data-url", hrefString + window.location.search);

  }

// Cookies from iframe domain
  
  function getDomainFromUrl(url) {
    var parsedUrl = new URL(url);
    return parsedUrl.hostname;
  }

  var iframeDomain = getDomainFromUrl(hrefString);

    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        var allowedOrigin = "https://" + iframeDomain;  // Replace with your iframe domain

        if (event.origin !== allowedOrigin) {
            console.log("Origin not allowed");
            return;
        }

        if (event.data === "requestCookies") {
            var cookies = {
                _ttp: getCookie("_ttp"),
                _fbc: getCookie("_fbc"),
                _fbp: getCookie("_fbp")
            };
            event.source.postMessage({ cookies: cookies }, event.origin);
        }
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;  // Returns null if the cookie doesn't exist
    }

}


