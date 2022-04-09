var para = new URLSearchParams(window.location.search);
var utm_campaign = para.get("utm_campaign")
var utm_source = para.get("utm_source")

if (para.get("utm_campaign")){
sessionStorage.setItem('utm_campaign', para.get("utm_campaign"))};

if (para.get("utm_source")){
sessionStorage.setItem('utm_source', para.get("utm_source"))};

utm_campaign = sessionStorage.utm_campaign
utm_source = sessionStorage.utm_source

let field2 = document.getElementById("extra_field_2")
field2.value = utm_source

let field3 = document.getElementById("extra_field_3")
field3.value = utm_campaign
