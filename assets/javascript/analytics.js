/* This procedure does a GET request
 * to place2be.io/analytics/URI to analyze traffic
 */
function httpGetAsync()
{
  var xmlHttp = new XMLHttpRequest();
  var URL = "https://place2be.io/analytics/"
  var URI = window.location.pathname;

  xmlHttp.onreadystatechange = function() { 
      /* NO OP */
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        console.log("URI bien envoyée");
  }
  xmlHttp.open("GET", URL + URI, true);
  xmlHttp.send(null);
}
httpGetAsync();
