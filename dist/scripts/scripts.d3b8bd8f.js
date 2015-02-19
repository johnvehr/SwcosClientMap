"use strict";angular.module("swcosClientMapApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","ui.bootstrap","ui.router","angular-chartist"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("swcosClientMapApp").controller("MapCtrl",["$scope","$http","$modal","$location","$log",function(a,b,c){var d="https://swcos-upload-engine.herokuapp.com/api/uploads";b.get(d).success(function(b){function d(a,b){var d={id:b.id,icon:"/images/swcos-marker.png",latitude:b.lat,longitude:b.lng,displaySiteData:function(){c.open({templateUrl:"displaySiteData.html",controller:"SiteModalCtrl",resolve:{site:function(){return b}}})}};return d}console.log(angular.fromJson(b)),a.sites=angular.fromJson(b),a.siteTotal=a.sites.length,a.siteSchools=["Nursing","Pharmacy","Medicine","Law","Dentistry","Social Work"],a.siteAffiliates=["Promise Heights","Child & Family Initiative","Seniors","Immigrant Communities","Community Schools","SWCOS","Family Stability"];var e=1,f=[];a.map={center:{latitude:39.2877623,longitude:-76.6185118},zoom:12,mapOptions:{scrollwheel:!1}},a.filterSchool=function(b){var c=[],e=[],f=[];if(b){for(var g in b)1==b[g]&&f.push(g);1>f?e=a.sites:angular.forEach(f,function(b){a.sites.map(function(a){a.hasOwnProperty(b)&&a[b]>0?e.push(a):console.log("log an error")})})}else e=a.sites;for(var h=0;h<e.length;h++)c.push(d(h,e[h]));a.siteMarkers=c},a.toggleSchool=function(b){if(1==f[b])f[b]=!1;else{e++;var c=e%2!=1?!0:!1;f[b]=c,e-=1}console.log(f),a.filterSchool(f)},a.filterSchool()})}]).controller("SiteModalCtrl",["$scope","$modalInstance","site",function(a,b,c){a.affiliateDetails=[{"Affiliate Name":"Promise Heights","Affiliate Description":"Promise Heights (PH), an initiative run out of the University of Maryland School of Social Work, aims to create a comprehensive child, family, and community-building model in the West Baltimore neighborhood of Upton/Druid Heights. This program provides children 0-21 with educational, social, physical, and economic opportunities that allow them to thrive and succeed in work and family life. It involves a partnership between the UMB School of Social Work, UMB School of Nursing, non-profit agencies, faith-based organizations, government, and communities in West Baltimore. The PH initiative is working in the Historic Samuel Coleridge-Taylor Elementary School, Furman L. Templeton Preparatory Academy, Booker T. Washington Middle School and Renaissance Academy High School.",Website:"http://promiseheights.net/","Contact Name":"Bronwyn Mayden","Contact Email":"BMAYDEN@ssw.umaryland.edu"},{"Affiliate Name":"Child & Family Initiatives","Affiliate Description":"The university has several courses that allow our students to interact with children, parents, staff and community members in Baltimore City Public Schools. UMB students doing tutoring, health or dental education and outreach bring insights back to their classes including Introduction to Clinical Medicine, Community/Public Health Nursing, Mediation Clinic (Carey School of Law), Behavioral Dentistry and Advanced Field Placement (School of Social Work).",Website:"","Contact Name":"Lisa Rawlings","Contact Email":"lrawlings@umarland.edu"},{"Affiliate Name":"Seniors","Affiliate Description":"The university has a number of courses that allow our students to interact with seniors. UMB students doing health and dental education, advocacy and outreach bring what they learn back to their courses in our Physical Therapy program, Community/Public Health Nursing, Introduction to Clinical Medicine, Behavioral Dentistry and Advanced Field Placement (School of Social Work).",Website:"","Contact Name":"Lisa Rawlings","Contact Email":"lrawlings@umarland.edu"},{"Affiliate Name":"Immigrant Communities","Affiliate Description":"The university has a number of courses that allow our students to interact with members of the immigrant community. UMB students doing health education, tutoring, outreach and advocacy bring what they learn back to courses in our Immigration Clinic (Carey School of Law), Introduction to Clinical Medicine, Community/Public Health Nursing and Advanced Field Placement (School of Social Work).",Website:"","Contact Name":"Lisa Rawlings","Contact Email":"lrawlings@umarland.edu"},{"Affiliate Name":"Community Schools","Affiliate Description":"A community school is a place and a set of strategic partnerships among a school and other community resources that promote student achievement, positive conditions for learning and the well-being of families and communities.  Through the work of a community-based partner such as UMB, each Community School leverages unique community resources to meet community needs, and maintains a core focus on children, while recognizing that children grow up in families and that families are integral parts of communities.  This integrated approach leads to student success, strong families and health communities.",Website:"","Contact Name":"Becky Davis","Contact Email":"swcos@ssw.umaryland.edu"},{"Affiliate Name":"SWCOS","Affiliate Description":"Social Work Community Outreach Service (SWCOS) prepares civic-minded social workers to serve in Baltimore’s communities and around the world. We provide our students with unique opportunities to work in communities, doing meaningful, innovative work; viewing individuals, families and communities through a social justice lens, whether the focus is clinical, policy, community organizing or program management.  SWCOS vision is that Baltimore and Maryland will become socially and economically more robust through sustained university-community partnerships that foster civic-minded leadership and innovative community-engaged education, service, and research.",Website:"http://um.umaryland.edu/swcos/","Contact Name":"Becky Davis","Contact Email":"swcos@ssw.umaryland.edu"},{"Affiliate Name":"Family Stability","Affiliate Description":"Family Stability focuses on lifting families out of crisis and moving them to self-sufficiency through homelessness prevention, shelter diversion and financial education. Led by United Way of Central Maryland, Family Stability programs were seeded with a grant from the Siemer Institute for Family Stability and is made possible by generous donors.",Website:"www.uwcm.org/family","Contact Name":"Becky Davis","Contact Email":"swcos@ssw.umaryland.edu"}],a.site=c,console.log(c);var d=function(){for(var b in c)a.affiliateDetails.map(function(d){d["Affiliate Name"]==b&&c[b]&&(a.site["Affiliate website"]=d.Website,a.site["Affiliate contact name"]=d["Contact Name"],a.site["Affiliate contact email"]=d["Contact Email"])})};d();var e=function(a,b){var d=[],e={};for(var f in c)!("students"!==b&&"discipline"!==b||("students"===b?"Medicine"!==f&&"Pharmacy"!==f&&"Nursing"!==f&&"Social Work"!==f&&"Law"!==f&&"Dentistry"!==f||!(e[f]=c[f]):"Mental Health"!==f&&"Advocacy"!==f&&"Community Organizing/Outreach"!==f&&"Educational Support/Tutoring"!==f&&"Public Health"!==f&&"Community Schools"!==f||!(e[f]=c[f])));console.log(e);for(var g in e)if(parseInt(e[g])>0&&0/0!=parseInt(e[g]))if("l_s"===a)d.push([g,e[g]]);else{d.push("l"===a?g:parseInt(e[g]))}return d};a.site&&(a.data={labels:["","","",""],series:e("s","students")},a.dataBySchool=e("l_s","students"),a.dataByDiscipline=e("l_s","discipline"),a.dataDiscipline={labels:["","","",""],series:e("s","discipline")});var f=0;for(var g in a.data.series)f+=a.data.series[g];a.stud_sum=f,console.log(a.stud_sum);var h=0;for(var g in a.dataDiscipline.series)h+=a.dataDiscipline.series[g];a.disc_sum=h,a.options={width:300,height:200},a.lifeData={labels:["Nation","State","This neighborhood"],series:[[78.7,79.7,73.4]]},a.incomeData={labels:["Nation","State","This neighborhood"],series:[[6e4,73e3,64e3]]},a.schoolData={labels:["Nation","State","This neighborhood"],series:[[5,4,3]]},a.barOptions={seriesBarDistance:15},a.barResponsiveOptions=[["screen and (min-width: 641px) and (max-width: 1024px)",{seriesBarDistance:10,axisX:{labelInterpolationFnc:function(a){return a}}}],["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(a){return a[0]}}}]],a.ok=function(){b.close()},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("swcosClientMapApp").service("map",function(){});