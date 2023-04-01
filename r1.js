var checklejenyta = document.querySelector('script[src*="utm"]').getAttribute("yta") !== null;

if (checklejenyta) {
var lejenUrl = document.querySelector('script[src*="utm"]');
var lejenyta = lejenUrl.getAttribute("yta");
var lejengdn = lejenUrl.getAttribute("gdn");
var lejengsn = lejenUrl.getAttribute("gsn");

let urlParamsNew = new URLSearchParams(window.location.search);
let utmC = urlParamsNew.get('utm_campaign');

let element = document.getElementById("onpay-order-form");
let dataUrl = element.getAttribute("data-url");

if (utmC && utmC.includes('YTA')) {
let newDataUrl = element.setAttribute("data-url", lejenyta);
}

else if (utmC && utmC.includes('GDN')) {
let newDataUrl = element.setAttribute("data-url", lejengdn);
}

else if (utmC && utmC.includes('GSN')) {
let newDataUrl = element.setAttribute("data-url", lejengsn);
}

}

// 1 Apr 2023
