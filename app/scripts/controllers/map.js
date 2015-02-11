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

    $http.get(local_env).success(function(sites){
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

      $scope.map = { center: { latitude: 39.2877623, longitude: -76.6185118 }, zoom: 12 };

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
    $scope.site = site;
    console.log(site)

    var dataFunc = function(ls,cat_){
      var siteDataArray = [],
               siteData = {};
      for(var key in site){
        if(cat_ === 'students' || cat_ === 'discipline'){
          if(cat_ === 'students'){
            if(
              key === 'Medicine' || key === 'Pharmacy' ||
              key === 'Nursing' || key === 'Social Work'){
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

      for(var k in siteData){
        if(parseInt(siteData[k]) > 0 && parseInt(siteData[k]) != NaN) {
          var siteReturn = ls === 'l' ? siteDataArray.push(k) : siteDataArray.push(parseInt(siteData[k]))
        }
      }

     return siteDataArray
    }

    if($scope.site){
      $scope.data = {
        //labels: dataFunc('l','students'),
        labels: ['','','',''],
        series: dataFunc('s','students')
      }
      $scope.dataOutLabels = dataFunc('l','students')
      console.log($scope.dataOutLabels)
      $scope.dataDiscipline = {
        //labels: dataFunc('l','discipline'),
        labels: ['','','',''],
        series: dataFunc('s','discipline')
      }
      $scope.dataDisciplineOutLabels = dataFunc('l','discipline')
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
      labels: ['Nation', 'State', 'Here'],
      series: [
      [78.7,79.7,73.4]
      //dataFunc('x','local')
      ]
    }//Life Expectancy

    $scope.incomeData = {
      labels: ['Nation', 'State', 'Here'],
      series: [
      [60000,73000,64000]
      ]
    }//Household Income

    $scope.schoolData = {
      labels: ['Nation','State','Here'],
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
