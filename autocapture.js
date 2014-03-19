
// TBD!!!!!!
// 1) Use cookie functions from PageClone to add page number to file name (1 for index.html, otherwise add one for each time called)
// 2) Time the mass of included libraries to reduce to the minimum number of included files
// 3) Load as many JS files as possible (including jQuery) in the autocapture.js file
// 4) Write up how it works in the README.rd (get github to create one)
// 5) Push to github and host at pagoda
// 6) Send to Transformation, AD, user research, etc

// jQuery onload function
$(function() {
    $(window).on('beforeunload', function(){
		screenDump();
    });
});

// Cookie code more-or-less cribbed from : http://www.w3schools.com/js/js_cookies.asp
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
	var firstPart = location.href.substring(7).replace(/\./g, "_").replace(/\//g, "_");
	
	var date = new Date();
    var options = {
		weekday: "short", year: "numeric", month: "short",
		day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
    }
	var secondPart = date.toLocaleTimeString("en-us", options).replace(/,/g, "").replace(/ /g, "_");

    var lastChar = location.href.slice(-1);
    var last10Chars = location.href.slice(-10);
	
	var thirdPart;
    if ((lastChar == "/") || (last10Chars == "index.html")) {
       thirdPart = "1";
       SetCookie(firstPart, 1, 1);
    } else {
      thirdPart = GetCookie(firstPart);
      SetCookie(firstPart, thirdPart+1, 1);
    }

	
	return(firstPart + secondPart + "_" + thirdPart);
}

// Screendump
function screenDump() {
	html2canvas(document.body, {
		onrendered: function(canvas) {
			canvas.toBlob(function(blob) {
fileName = fileName();
				saveAs(blob, fileName);
			});			
		}
	});
}