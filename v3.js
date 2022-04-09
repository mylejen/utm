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

lejen = document.querySelector("script[src*=utm\\@main]")
sasaran = lejen.getAttribute("sasaran")

var customDonationCurrentValue = Number(PageData.salesStats.total_amount_all);
var customDonationTargetValue = parseFloat(sasaran);
var customDonationPercentage = (customDonationCurrentValue / customDonationTargetValue) * 100;

$("#custom-donation-current-value").html(customDonationCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-target-value").html(customDonationTargetValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-progress-bar").find(".progress-bar").css("width", (customDonationPercentage > 100 ? 100 : customDonationPercentage).toFixed(2) + "%").html(customDonationPercentage.toFixed(2) + "%");
