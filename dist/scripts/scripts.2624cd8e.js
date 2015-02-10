"use strict";angular.module("swcosClientMapApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("swcosClientMapApp").controller("MapCtrl",["$scope","$http","$location","$log",function(a,b){b.get("http://localhost:9000/api/uploads").success(function(b){function c(a,b){var c={id:b.id,icon:"/images/swcos-marker.png",latitude:b.lat,longitude:b.lng,displaySiteData:function(){$modal.open({templateUrl:"displaySiteData.html",controller:"SiteModalCtrl",resolve:{site:function(){return b}}})}};return c}console.log(angular.fromJson(b)),a.sites=angular.fromJson(b),a.siteTotal=a.sites.length,a.siteSchools=["Nursing","Pharmacy","Medicine","Law","Dentistry","Social Work"],a.siteAffiliates=["Promise Heights","Child & Family Initiative","Seniors","Immigrant Communities","Community Schools","SWCOS","Family Stability"];var d=1,e=[];a.map={center:{latitude:39.2877623,longitude:-76.6185118},zoom:12},a.filterSchool=function(b){var d=[],e=[],f=[];if(b){for(var g in b)1==b[g]&&f.push(g);1>f?e=a.sites:angular.forEach(f,function(b){a.sites.map(function(a){a.hasOwnProperty(b)&&a[b]>0?e.push(a):console.log("log an error")})})}else e=a.sites;for(var h=0;h<e.length;h++)d.push(c(h,e[h]));a.siteMarkers=d},a.toggleSchool=function(b){if(1==e[b])e[b]=!1;else{d++;var c=d%2!=1?!0:!1;e[b]=c,d-=1}console.log(e),a.filterSchool(e)},a.filterSchool()})}]).controller("SiteModalCtrl",["$scope","$modalInstance","site",function(a,b,c){a.site=c,console.log(c);var d=function(a,b){var d=[],e={};for(var f in c)!("students"!==b&&"discipline"!==b||("students"===b?"Medicine"!==f&&"Pharmacy"!==f&&"Nursing"!==f&&"Social Work"!==f||!(e[f]=c[f]):"Mental Health"!==f&&"Advocacy"!==f&&"Community Organizing/Outreach"!==f&&"Educational Support/Tutoring"!==f&&"Public Health"!==f&&"Community Schools"!==f||!(e[f]=c[f])));for(var g in e)if(parseInt(e[g])>0&&0/0!=parseInt(e[g])){d.push("l"===a?g:parseInt(e[g]))}return d};a.site&&(a.data={series:d("s","students")},a.dataOutLabels=d("l","students"),a.dataDiscipline={series:d("s","discipline")},a.dataDisciplineOutLabels=d("l","discipline"));var e=0;for(var f in a.data.series)e+=a.data.series[f],a.stud_sum=e;var g=0;for(var f in a.dataDiscipline.series)g+=a.dataDiscipline.series[f],a.disc_sum=g;a.options={width:300,height:200},a.lifeData={labels:["Nation","State","Here"],series:[[78.7,79.7,73.4]]},a.incomeData={labels:["Nation","State","Here"],series:[[6e4,73e3,64e3]]},a.schoolData={labels:["Nation","State","Here"],series:[[5,4,3]]},a.barOptions={seriesBarDistance:15},a.barResponsiveOptions=[["screen and (min-width: 641px) and (max-width: 1024px)",{seriesBarDistance:10,axisX:{labelInterpolationFnc:function(a){return a}}}],["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(a){return a[0]}}}]],a.ok=function(){b.close()},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("swcosClientMapApp").service("map",function(){});