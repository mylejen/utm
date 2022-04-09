lejen = document.querySelector("script[src*=utm\\@main]")
sasaran = lejen.getAttribute("sasaran")

var customDonationCurrentValue = Number(PageData.salesStats.total_amount_all);
var customDonationTargetValue = parseFloat(sasaran);
var customDonationPercentage = (customDonationCurrentValue / customDonationTargetValue) * 100;

$("#custom-donation-current-value").html(customDonationCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-target-value").html(customDonationTargetValue.toLocaleString(undefined, { minimumFractionDigits: 2 }));
$("#custom-donation-progress-bar").find(".progress-bar").css("width", (customDonationPercentage > 100 ? 100 : customDonationPercentage).toFixed(2) + "%").html(customDonationPercentage.toFixed(2) + "%");
