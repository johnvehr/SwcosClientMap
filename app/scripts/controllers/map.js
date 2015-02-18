'use strict';

/**
 * @ngdoc function
 * @name swcosClientMapApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the swcosClientMapApp
 */
angular.module('swcosClientMapApp')
  .controller('MapCtrl', function ($scope,$http,$modal,$location,$log) {

    //$scope.map = { center: { latitude: 39.2877623, longitude: -76.6185118 }, zoom: 12 };
    var local_env = 'http://localhost:9000/api/uploads';
    var prod_env = 'https://swcos-upload-engine.herokuapp.com/api/uploads';

    $http.get(prod_env).success(function(sites){
      console.log(angular.fromJson(sites))
      $scope.sites = angular.fromJson(sites)
      $scope.siteTotal = $scope.sites.length
      $scope.siteSchools = [
        "Nursing",
        "Pharmacy",
        "Medicine",
        "Law",
        "Dentistry",
        "Social Work"
      ]
      $scope.siteAffiliates = [
        "Promise Heights",
        "Child & Family Initiative",
        "Seniors",
        "Immigrant Communities",
        "Community Schools",
        "SWCOS",
        "Family Stability"
      ]

      var toggle = 1,
      toggleData = [];

      $scope.map = { center: { latitude: 39.2877623, longitude: -76.6185118 }, zoom: 12, mapOptions: {scrollwheel: false}};


      function buildSiteMarkers(i,site){
        var ret = {
          id: site.id,
          icon: '/images/swcos-marker.png',
          //icon: '/images/swcos-marker.9bdfd030.png',
          latitude: site.lat,
          longitude: site.lng,
          displaySiteData: function(){
            var modalInstance = $modal.open({
              templateUrl: 'displaySiteData.html',
              controller: 'SiteModalCtrl',
              resolve: {
                site: function(){
                  return site;
                }
              }
            });

          }
        }
        return ret;
      }

      $scope.filterSchool = function(param){
        var markerData = [],
            filtered = [], //reset filter array
            dataForFilter = [];

        if(!param){
          filtered = $scope.sites;
        }else {
          for(var key in param){
            if(param[key] == true) {
              dataForFilter.push(key)
            }
          }
          if(dataForFilter < 1){
            filtered = $scope.sites;
          }else {
          angular.forEach(dataForFilter,function(v,k){
            $scope.sites.map(function(site){
              if(site.hasOwnProperty(v) && site[v] > 0){
                filtered.push(site)
              }else {
                console.log('log an error')
              }
            })
          })
        }

        //console.log(filtered)

        }

      /*  var markerData = [];
              //filtered = [];
            console.log("Filtered:")
            console.log(filtered)

        if(!param) {
          filtered = $scope.sites;
        }else {
          $scope.sites.map(function(site){
            if(site.hasOwnProperty(param)){
              if(site[param] > 0){
                filtered.push(site)
              }
            }else {
              console.log("Could not find ")
            }
          })

        }*/

        for(var i=0;i<filtered.length;i++){
          markerData.push(buildSiteMarkers(i,filtered[i]))
        }

        $scope.siteMarkers = markerData

      }//END FILTER SCHOOL FUNC

      $scope.toggleSchool = function(param){
        if(toggleData[param] == true){
          toggleData[param] = false;
        }else{
          toggle++
          var toggleStat = (toggle % 2) != 1 ? true : false
          toggleData[param] = toggleStat;
          toggle -= 1;
        }
        console.log(toggleData)
        $scope.filterSchool(toggleData);
      }

      $scope.filterSchool()
    })
  })

  .controller('SiteModalCtrl', function($scope,$modalInstance, site){

    $scope.affiliateDetails = [
      {
        "Affiliate Name": "Promise Heights",
        "Affiliate Description": "Promise Heights (PH), an initiative run out of the University of Maryland School of Social Work, aims to create a comprehensive child, family, and community-building model in the West Baltimore neighborhood of Upton/Druid Heights. This program provides children 0-21 with educational, social, physical, and economic opportunities that allow them to thrive and succeed in work and family life. It involves a partnership between the UMB School of Social Work, UMB School of Nursing, non-profit agencies, faith-based organizations, government, and communities in West Baltimore. The PH initiative is working in the Historic Samuel Coleridge-Taylor Elementary School, Furman L. Templeton Preparatory Academy, Booker T. Washington Middle School and Renaissance Academy High School.",
        "Website": "http://promiseheights.net/",
        "Contact Name": "Bronwyn Mayden",
        "Contact Email": "BMAYDEN@ssw.umaryland.edu"
      },
      {
        "Affiliate Name": "Child & Family Initiatives",
        "Affiliate Description": "The university has several courses that allow our students to interact with children, parents, staff and community members in Baltimore City Public Schools. UMB students doing tutoring, health or dental education and outreach bring insights back to their classes including Introduction to Clinical Medicine, Community/Public Health Nursing, Mediation Clinic (Carey School of Law), Behavioral Dentistry and Advanced Field Placement (School of Social Work).",
        "Website": "",
        "Contact Name": "Lisa Rawlings",
        "Contact Email": "lrawlings@umarland.edu"
      },
      {
        "Affiliate Name": "Seniors",
        "Affiliate Description": "The university has a number of courses that allow our students to interact with seniors. UMB students doing health and dental education, advocacy and outreach bring what they learn back to their courses in our Physical Therapy program, Community/Public Health Nursing, Introduction to Clinical Medicine, Behavioral Dentistry and Advanced Field Placement (School of Social Work).",
        "Website": "",
        "Contact Name": "Lisa Rawlings",
        "Contact Email": "lrawlings@umarland.edu"
      },
      {
        "Affiliate Name": "Immigrant Communities",
        "Affiliate Description": "The university has a number of courses that allow our students to interact with members of the immigrant community. UMB students doing health education, tutoring, outreach and advocacy bring what they learn back to courses in our Immigration Clinic (Carey School of Law), Introduction to Clinical Medicine, Community/Public Health Nursing and Advanced Field Placement (School of Social Work).",
        "Website": "",
        "Contact Name": "Lisa Rawlings",
        "Contact Email": "lrawlings@umarland.edu"
      },
      {
        "Affiliate Name": "Community Schools",
        "Affiliate Description": "A community school is a place and a set of strategic partnerships among a school and other community resources that promote student achievement, positive conditions for learning and the well-being of families and communities.  Through the work of a community-based partner such as UMB, each Community School leverages unique community resources to meet community needs, and maintains a core focus on children, while recognizing that children grow up in families and that families are integral parts of communities.  This integrated approach leads to student success, strong families and health communities.",
        "Website": "",
        "Contact Name": "Becky Davis",
        "Contact Email": "swcos@ssw.umaryland.edu"
      },
      {
        "Affiliate Name": "SWCOS",
        "Affiliate Description": "Social Work Community Outreach Service (SWCOS) prepares civic-minded social workers to serve in Baltimore’s communities and around the world. We provide our students with unique opportunities to work in communities, doing meaningful, innovative work; viewing individuals, families and communities through a social justice lens, whether the focus is clinical, policy, community organizing or program management.  SWCOS vision is that Baltimore and Maryland will become socially and economically more robust through sustained university-community partnerships that foster civic-minded leadership and innovative community-engaged education, service, and research.",
        "Website": "http://um.umaryland.edu/swcos/",
        "Contact Name": "Becky Davis",
        "Contact Email": "swcos@ssw.umaryland.edu"
      },
      {
        "Affiliate Name": "Family Stability",
        "Affiliate Description": "Family Stability focuses on lifting families out of crisis and moving them to self-sufficiency through homelessness prevention, shelter diversion and financial education. Led by United Way of Central Maryland, Family Stability programs were seeded with a grant from the Siemer Institute for Family Stability and is made possible by generous donors.",
        "Website": "www.uwcm.org/family",
        "Contact Name": "Becky Davis",
        "Contact Email": "swcos@ssw.umaryland.edu"
      }
    ]

    $scope.site = site;
    console.log(site)

    var siteAffil_ = function(){
      for(var key in site){
        $scope.affiliateDetails.map(function(affil){
          if(affil['Affiliate Name'] == key && site[key]){
            $scope.site['Affiliate website'] = affil['Website'];
            $scope.site['Affiliate contact name'] = affil['Contact Name'];
            $scope.site['Affiliate contact email'] = affil['Contact Email'];
          }
        })
      }
    }
    siteAffil_();

    var dataFunc = function(ls,cat_){
      var siteDataArray = [],
               siteData = {};
      for(var key in site){
        if(cat_ === 'students' || cat_ === 'discipline'){
          if(cat_ === 'students'){
            if(
              key === 'Medicine' || key === 'Pharmacy' ||
              key === 'Nursing' || key === 'Social Work' ||
              key === 'Law' || key === 'Dentistry'
              ){
              siteData[key] = site[key]
            }
          }else{
            if(
              key === 'Mental Health' || key === 'Advocacy' ||
              key === 'Community Organizing/Outreach' || key === 'Educational Support/Tutoring' ||
              key === 'Public Health' || key === 'Community Schools'){
                siteData[key] = site[key]
              }
          }
        }/*else if(cat_ === 'local') {

          for(var i=0;i<neighborhoods.length;i++){
            var toMatch = neighborhoods[i].Neighborhoods.replace(/\//g, ",").split(",");
            toMatch.forEach(function(x){
              console.log(x);
            })
          }
        }*/
      }
      console.log(siteData)
      for(var k in siteData){
        if(parseInt(siteData[k]) > 0 && parseInt(siteData[k]) != NaN) {
          if(ls === 'l_s'){
            siteDataArray.push([k,siteData[k]])
          }else{
            var siteReturn = ls === 'l' ? siteDataArray.push(k) : siteDataArray.push(parseInt(siteData[k]))
          }
        }
      }

     return siteDataArray
    }

    if($scope.site){
      $scope.data = {
        //labels: dataFunc('l','students'), if labels are ever desired
        labels: ['','','',''],
        series: dataFunc('s','students')
      }
      $scope.dataBySchool = dataFunc('l_s','students')
      $scope.dataByDiscipline = dataFunc('l_s','discipline')
      $scope.dataDiscipline = {
        //labels: dataFunc('l','discipline'),
        labels: ['','','',''],
        series: dataFunc('s','discipline')
      }
    }

    var totalStudents = 0;
    for(var i in $scope.data.series){
      totalStudents += $scope.data.series[i];
    }
    $scope.stud_sum = totalStudents;
    console.log($scope.stud_sum)

    var totalDisciplines = 0;
    for(var i in $scope.dataDiscipline.series){
      totalDisciplines += $scope.dataDiscipline.series[i];
    }
    $scope.disc_sum = totalDisciplines

    $scope.options = {
      width: 300,
      height: 200
    };

    $scope.lifeData = {
      labels: ['Nation', 'State', 'This neighborhood'],
      series: [
      [78.7,79.7,73.4]
      //dataFunc('x','local')
      ]
    }//Life Expectancy

    $scope.incomeData = {
      labels: ['Nation', 'State', 'This neighborhood'],
      series: [
      [60000,73000,64000]
      ]
    }//Household Income

    $scope.schoolData = {
      labels: ['Nation','State','This neighborhood'],
      series: [
      [5, 4, 3],
      ]
    }//School Absenteeism

    $scope.barOptions = {
      seriesBarDistance: 15
    };

    $scope.barResponsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }]
    ];

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  })
