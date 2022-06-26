const element = document.getElementById("onpay-order-form");
let hrefString = element.getAttribute("data-url");
var newhrefString = element.setAttribute("data-url", hrefString + window.location.search);
