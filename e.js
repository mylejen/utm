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

}
