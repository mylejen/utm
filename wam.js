(function() {
  var domainsToDecorate = [
    'member.fames.my',
    'onpay.firz.my',
    'www.wabot.my',
    'dash.wabot.my',
    'dash2.wabot.my',
    'dash3.wabot.my',
    'dash4.wabot.my',
    'dash5.wabot.my',
    'dash6.wabot.my',
    'vip.wabot.my',
    'ctg.wabot.my',
    'docs.wabot.my',
    'dash.wabot.pro',
    'dash.wabot.plus',
    'dash.wabot.chat',
    'kliksini.my',
    'app.mleads.pro',
    'waform.my'
  ];
  var queryParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
    'utm_cid',
    'utm_placement',
    'ref'
  ];

  var links = document.querySelectorAll('a');

  for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
    for (var domainIndex = 0; domainIndex < domainsToDecorate.length; domainIndex++) {
      if (links[linkIndex].href.indexOf(domainsToDecorate[domainIndex]) > -1 && links[linkIndex].href.indexOf('#') === -1) {
        links[linkIndex].href = decorateUrl(links[linkIndex].href);
      }
    }
  }

  function decorateUrl(urlToDecorate) {
    var collectedQueryParams = [];

    var hasQueryParams = urlToDecorate.indexOf('?') !== -1;

    for (var queryIndex = 0; queryIndex < queryParams.length; queryIndex++) {
      var paramValue = getQueryParam(queryParams[queryIndex]);

      if (paramValue) {
        collectedQueryParams.push(queryParams[queryIndex] + '=' + paramValue);
      }
    }

    if (collectedQueryParams.length > 0) {
      urlToDecorate += hasQueryParams ? '&' : '?';
      urlToDecorate += collectedQueryParams.join('&');
    }

    return urlToDecorate;
  }

  function getQueryParam(name) {
    if ((name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search)) {
      return decodeURIComponent(name[1]);
    }
  }
})();


let checktarikh = document.getElementById("tarikh") !== null;
if (checktarikh) {
const now = new Date();
let days = new Array('Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu');
let months = new Array('Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember');
let date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
function fourdigits(number) {
return (number < 1000) ? number + 1900 : number; }
today = days[now.getDay()] + ", " + date + " " + months[now.getMonth()] + " " + (fourdigits(now.getYear())) ;
document.getElementById("tarikh").innerHTML = today;
}
