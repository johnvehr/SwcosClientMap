# SwcosClientMap
Client Map for UMB students in Baltimore via Angular/Google Maps/Bootstrap.

CLIENT EMBEDDING
------------------
This map is designed to be inserted into seperate and distinct sites, while cmaking all calls to a central code repository on the UMB IIS server set up for this project. Exact places that this (front end) embed code will live is TBD, so all testing on embedding/etc done on a vanilla drupal install.
- Use code from embed.html file to insert the map anywhere needed.
- This application primarily uses TWBS (bootstrap) styles/classes. Some classes necessarily are applied to the body, but efforts have been made to wrap most in an app specific wrapper. Possibility exists of platform specific conflicts, but hopefully minor.
- Files (js/css/etc) are being served from the UM IIS server set up for this project (http://134.192.116.210/node/SwcosClientMap)
- This application is responsive to a point, but definitely looks better in wider pages.

Local server install for build/troubleshooting/etc
------------------

**Setup**
  * `npm install`
  * `bower install`
  * `grunt serve`
  
**Troubleshooting**
  - check the angular-chartist, vs ng-chartist on index.html

**Additional bower modules**
  * `bower install angular-google-maps --save`
  * `bower install angular-chartist --save`
  * `bower install angular-ui-router --save`
  * `add miseed ones that get thrown`

**Port**
  * `localhost:8000`

**EndPoint on Server**
  * get "/api/uploads"

**TODO for next phase**
  - Properly set env. variables
  - Add units to bar graph chartist-events in view ensureUnit() in SiteModalCtrl
  - Move any json off controller to own file
