Autocapture
=======
*A simple way to capture screendumps for user journeys*

Contact
-------
For questions or comments please contact david.durant@digital.cabinet-office.gov.uk (@cholten99)

Purpose
-------
The idea for this code came from watching someone do a show and tell using a giant diagram of linked screendumps to illustrate a user journey through a website. It occured to me that there must be a way to automate producing those picture files.

Usage
-------
As you move from page to page screendumps (including entered data) will be saved to your local machine as PNG files. The files for a particular user journey will all be named with the same server and start-time and differ in the last digit (increased as the used steps through the site).

Setup
-------

   * Put the autocapture_lib folder in the folder containing the pages you want to capture.
   * Add the following lines to the top of each one in the HEAD section (include jQuery only if it's not included already):

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery.js"></script>

    <!-- Autocapture -->
    <script type="text/javascript" src="../autocapture_lib/autocapture.js"></script>
    <script type="text/javascript" src="../autocapture_lib/FileSaver.js"></script>
    <script type="text/javascript" src="../autocapture_lib/html2canvas.js"></script>
    <script type="text/javascript" src="../autocapture_lib/canvas-to-blob.min.js"></script>

Configuration
-------

   * The jQuery events that the screendump fires on (currently 'beforeunload') can be changed in the jQuery onload function in autocapture.js
   * The files are named using the fileName function in autocapture.js which can be altered as needed

Caveats
-------

   * The examples only cover scenarios where there are individual static pages (no AJAX) but that could potentially still work if the right events are captured (see below)
   * So far this code has only been tested on Google Chrome
   * To capture the last screen of a transaction it may be necessary to hit page-reload

Acknowledgements
-------
This code relies on a number of libraries and code snippets including:
 
   * Cookie handling code : http://www.w3schools.com/js/js_cookies.asp
   * jQuery : http://jquery.com/
   * FileSaver.js : https://github.com/eligrey/FileSaver.js/
   * html2Canvas : http://html2canvas.hertzen.com/
   * html2blob : https://github.com/blueimp/JavaScript-Canvas-to-Blob

