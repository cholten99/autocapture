
// jQuery onload function
$(function() {
  // Set up the event to capture screendumps on
  $(window).on('beforeunload', function() {
    screenDump();
  });
});

function SetCookie(cookieName, value, days) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + days);
  var cookieValue = escape(value) + ((days==null) ? "" : "; expires=" + expireDate.toUTCString() + "; path=/");
  document.cookie = cookieName + "=" + cookieValue;
}

// Get cookie function
function GetCookie(cookieName) {
  var allCookies = document.cookie;

  // Check if it's in the list but not the first
  var start = allCookies.indexOf(" " + cookieName + "=");
  if (start == -1) {
    // Check if it's the first
    start = allCookies.indexOf(cookieName + "=");
  }
  var value = null;
  // If we've still not found it it's not in there
  if (start != -1) {
    start = allCookies.indexOf("=", start) + 1;
    var end = allCookies.indexOf(";", start);
    if (end == -1) {
      end = allCookies.length;
    }
    value = unescape(allCookies.substring(start, end));
  }
  return value;
}

// File name generator
function fileName() {

  var hostPart = location.host;

  var lastChar = location.href.slice(-1);
  var last10Chars = location.href.slice(-10);

  if ((lastChar == "/") || (last10Chars == "index.html")) {
    // Set up the first name for this run of screendumps
    var date = new Date();
    var options = {
      weekday: "short", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
    }
    var datePart = date.toLocaleTimeString("en-us", options).replace(/,/g, "").replace(/ /g, "_");

    SetCookie(hostPart, datePart + "_1", 1);

    return(hostPart + "_" + datePart + "_1.png");

  } else {
    var cookieVal = GetCookie(hostPart);
    var numValArray = cookieVal.match(/\d+$/);
    var numValString = numValArray[0];
    var numValStringLenght = numValString.length;
    var newNumVal = parseInt(numValString) + 1;
    var strippedString = cookieVal.slice(0, (cookieVal.length - numValStringLenght));
    var newCookieVal = strippedString + newNumVal;

    SetCookie(hostPart, newCookieVal, 1);
    return(hostPart + "_" + newCookieVal + ".png");
  }

}

// Screendump
function screenDump() {
  html2canvas(document.body, {
    onrendered: function(canvas) {
      canvas.toBlob(function(blob) {
        saveAs(blob, fileName());
      });      
    }
  });
}
