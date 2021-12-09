var para = new URLSearchParams(window.location.search);
var utm_campaign = para.get("utm_campaign")

if (para.get("utm_campaign")){
sessionStorage.setItem('utm_campaign', para.get("utm_campaign"))};
console.log(utm_campaign)

utm_campaign = sessionStorage.utm_campaign
let note = document.getElementById("extra_field_3")
note.value = utm_campaign
