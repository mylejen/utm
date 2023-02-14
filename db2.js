var utmparams = new URLSearchParams(window.location.search);

let codeid = utmparams.get("code")
let clientid = utmparams.get("client")
var text;

switch(codeid) {
  case "MSP":
    text = "873510686873021";
    break;
  case "RASU":
    text = "538732970905881";
    break;
  case "MSU":
    text = "945586025999480";
    break;
  case "SAA":
    text = "252529159874390";
    break;
  case "STGR":
    text = "1129052037502528";
    break;
  case "MKCE":
    text = "4987550448029766";
    break;
  case "MAE":
    text = "336527064537802";
    break;
  case "MAG":
    text = "1312952619212599";
    break;
  case "SSP":
    text = "937251370294676";
    break;
  case "MBK":
    text = "1020998575176152";
    break;
  case "STDP":
    text = "154998180106824";
    break;
  case "MFK":
    text = "658756635114612";
    break;
  case "MPJ":
    text = "702954030512180";
    break;
  case "MSU":
    text = "945586025999480";
    break;
  case "MAM":
    text = "2100239220305646";
    break;
  case "PUSU":
    text = "2201530289889804";
    break;
  case "MAJ":
    text = "852456298811610";
    break;
  case "MUQA":
    text = "473540640376159";
    break;
  case "MTC":
    text = "757851621576266";
    break;
  case "MACB":
    text = "931674137501762";
    break;
  case "PNAB":
    text = "1028554644447003";
    break;
  case "KECHIL":
    text = "3076721852545641";
    break;
  case "KITABANTU":
    text = "2236272876632539";
    break;
  case "MTAF":
    text = "749693639348949";
    break;

  default:
    text = "1984176871680514";
}

var checklejenlooker = document.querySelector('script[src*="utm"]').getAttribute("reportid") !== null;

if (checklejenlooker) {

var lejenUrl = document.querySelector('script[src*="utm"]');
var reportid = lejenUrl.getAttribute("reportid");
var pageid = lejenUrl.getAttribute("pageid");

var reportUrl = "https://lookerstudio.google.com/embed/reporting/" + reportid + "/page/" + pageid + "?params=%7B%22ds55.adAccount%22:%22" + text + "%22%7D";

} else {

var reportUrl = "https://google.com";

}
