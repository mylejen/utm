(function() {
  var domainsToDecorate = [
          'member.fames.my', //add or remove domains (without https or trailing slash)
          'onpay.firz.my',
          'wabot.my',
          'www.wabot.my',
          'dash.wabot.my',
          'dash2.wabot.my',
          'dash3.wabot.my',
          'vip.wabot.my',
          'ctg.wabot.my',
          'docs.wabot.my',
          'onpay.udhiyamecca.com',
          'udhiyamecca.com',
          'onpay.utskorban.com',
          'utskorban.com'
      ],
      queryParams = [
          'utm_source',
          'utm_medium',
          'utm_campaign',
          'utm_content',
          'utm_term',
          'utm_id',
          'utm_cid',
          'utm_placement',
          'ref'
      ]
  // do not edit anything below this line
  var links = document.querySelectorAll('a'); 

// check if links contain domain from the domainsToDecorate array and then decorates
  for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
      for (var domainIndex = 0; domainIndex < domainsToDecorate.length; domainIndex++) { 
          if (links[linkIndex].href.indexOf(domainsToDecorate[domainIndex]) > -1 && links[linkIndex].href.indexOf("#") === -1) {
              links[linkIndex].href = decorateUrl(links[linkIndex].href);
          }
      }
  }
// decorates the URL with query params
  function decorateUrl(urlToDecorate) {
      urlToDecorate = (urlToDecorate.indexOf('?') === -1) ? urlToDecorate + '?' : urlToDecorate + '&';
      var collectedQueryParams = [];
      for (var queryIndex = 0; queryIndex < queryParams.length; queryIndex++) {
          if (getQueryParam(queryParams[queryIndex])) {
              collectedQueryParams.push(queryParams[queryIndex] + '=' + getQueryParam(queryParams[queryIndex]))
          }
      }
      return urlToDecorate + collectedQueryParams.join('&');
  }

  // borrowed from https://stackoverflow.com/questions/831030/
  // a function that retrieves the value of a query parameter
  function getQueryParam(name) {
      if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search))
          return decodeURIComponent(name[1]);
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
