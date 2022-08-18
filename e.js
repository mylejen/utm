let checkDataUrl = document.getElementById("onpay-order-form") !== null;

if (checkDataUrl) {
let element = document.getElementById("onpay-order-form");
let hrefString = element.getAttribute("data-url");
let newhrefString = element.setAttribute("data-url", hrefString + window.location.search);

}
