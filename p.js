let lejen2 = document.querySelector('script[src*="utm"]')
let linkcode = lejen2.getAttribute("linkcode")
let checklejen2 = linkcode !== null;

if (checklejen2) {
var currentURL = new URL(window.location.href);
var searchParams = new URLSearchParams(currentURL.search);

if (!searchParams.has("whatsapp_link_code")) {
searchParams.append("whatsapp_link_code", linkcode);
currentURL.search = searchParams;
window.location.href = currentURL.toString();
}
}
