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

  var csaDemographics = [
  {
    "CSA":"Allendale/Irvington/S. Hilton",
    "Median Household Income (2008-2012)":" 33,177.66 ",
    "Life Expectancy (2012)":70.4,
    "Absent (2012)":14.7
  },
  {
    "CSA":"Beechfield/Ten Hills/West Hills",
    "Median Household Income (2008-2012)":" 50,135.12 ",
    "Life Expectancy (2012)":74.7,
    "Absent (2012)":10.3
  },
  {
    "CSA":"Belair-Edison",
    "Median Household Income (2008-2012)":" 46,743.28 ",
    "Life Expectancy (2012)":72.5,
    "Absent (2012)":14.9
  },
  {
    "CSA":"Brooklyn/Curtis Bay/Hawkins Point",
    "Median Household Income (2008-2012)":" 33,526.36 ",
    "Life Expectancy (2012)":69.5,
    "Absent (2012)":24
  },
  {
    "CSA":"Canton",
    "Median Household Income (2008-2012)":" 84,978.14 ",
    "Life Expectancy (2012)":77.4,
    "Absent (2012)":13.2
  },
  {
    "CSA":"Cedonia/Frankford",
    "Median Household Income (2008-2012)":" 39,556.12 ",
    "Life Expectancy (2012)":72.8,
    "Absent (2012)":13.5
  },
  {
    "CSA":"Cherry Hill",
    "Median Household Income (2008-2012)":" 22,980.54 ",
    "Life Expectancy (2012)":68.8,
    "Absent (2012)":19.5
  },
  {
    "CSA":"Chinquapin Park/Belvedere",
    "Median Household Income (2008-2012)":" 42,852.96 ",
    "Life Expectancy (2012)":74.9,
    "Absent (2012)":6.3
  },
  {
    "CSA":"Claremont/Armistead",
    "Median Household Income (2008-2012)":" 31,970.51 ",
    "Life Expectancy (2012)":72.7,
    "Absent (2012)":12.4
  },
  {
    "CSA":"Clifton-Berea",
    "Median Household Income (2008-2012)":" 24,883.93 ",
    "Life Expectancy (2012)":66.4,
    "Absent (2012)":21.6
  },
  {
    "CSA":"Cross-Country/Cheswolde",
    "Median Household Income (2008-2012)":" 55,840.22 ",
    "Life Expectancy (2012)":84.2,
    "Absent (2012)":6.3
  },
  {
    "CSA":"Dickeyville/Franklintown",
    "Median Household Income (2008-2012)":" 32,487.00 ",
    "Life Expectancy (2012)":73.4,
    "Absent (2012)":10.7
  },
  {
    "CSA":"Dorchester/Ashburton",
    "Median Household Income (2008-2012)":" 36,715.14 ",
    "Life Expectancy (2012)":74,
    "Absent (2012)":13.2
  },
  {
    "CSA":"Downtown/Seton Hill",
    "Median Household Income (2008-2012)":" 41,365.85 ",
    "Life Expectancy (2012)":65,
    "Absent (2012)":14
  },
  {
    "CSA":"Edmondson Village",
    "Median Household Income (2008-2012)":" 37,537.56 ",
    "Life Expectancy (2012)":73.5,
    "Absent (2012)":18.4
  },
  {
    "CSA":"Fells Point",
    "Median Household Income (2008-2012)":" 73,083.92 ",
    "Life Expectancy (2012)":76.8,
    "Absent (2012)":13.8
  },
  {
    "CSA":"Forest Park/Walbrook",
    "Median Household Income (2008-2012)":" 36,737.15 ",
    "Life Expectancy (2012)":73.4,
    "Absent (2012)":17
  },
  {
    "CSA":"Glen-Fallstaff",
    "Median Household Income (2008-2012)":" 37,344.66 ",
    "Life Expectancy (2012)":78.5,
    "Absent (2012)":6.1
  },
  {
    "CSA":"Greater Charles Village/Barclay",
    "Median Household Income (2008-2012)":" 28,899.22 ",
    "Life Expectancy (2012)":75.1,
    "Absent (2012)":11.4
  },
  {
    "CSA":"Greater Govans",
    "Median Household Income (2008-2012)":" 38,396.20 ",
    "Life Expectancy (2012)":74.3,
    "Absent (2012)":10.1
  },
  {
    "CSA":"Greater Mondawmin",
    "Median Household Income (2008-2012)":" 38,912.26 ",
    "Life Expectancy (2012)":71.7,
    "Absent (2012)":14
  },
  {
    "CSA":"Greater Roland Park/Poplar Hill",
    "Median Household Income (2008-2012)":" 107,668.13 ",
    "Life Expectancy (2012)":84.4,
    "Absent (2012)":2.8
  },
  {
    "CSA":"Greater Rosemont",
    "Median Household Income (2008-2012)":" 26,892.76 ",
    "Life Expectancy (2012)":70.1,
    "Absent (2012)":13.7
  },
  {
    "CSA":"Greenmount East",
    "Median Household Income (2008-2012)":" 21,224.50 ",
    "Life Expectancy (2012)":67.4,
    "Absent (2012)":18.9
  },
  {
    "CSA":"Hamilton",
    "Median Household Income (2008-2012)":" 59,540.33 ",
    "Life Expectancy (2012)":75.4,
    "Absent (2012)":11.9
  },
  {
    "CSA":"Harbor East/Little Italy",
    "Median Household Income (2008-2012)":" 30,283.28 ",
    "Life Expectancy (2012)":72.5,
    "Absent (2012)":15
  },
  {
    "CSA":"Harford/Echodale",
    "Median Household Income (2008-2012)":" 53,957.94 ",
    "Life Expectancy (2012)":76.2,
    "Absent (2012)":10
  },
  {
    "CSA":"Highlandtown",
    "Median Household Income (2008-2012)":" 63,801.47 ",
    "Life Expectancy (2012)":74.4,
    "Absent (2012)":15.6
  },
  {
    "CSA":"Howard Park/West Arlington",
    "Median Household Income (2008-2012)":" 37,094.58 ",
    "Life Expectancy (2012)":75,
    "Absent (2012)":15.2
  },
  {
    "CSA":"Inner Harbor/Federal Hill",
    "Median Household Income (2008-2012)":" 83,496.50 ",
    "Life Expectancy (2012)":77.8,
    "Absent (2012)":13.2
  },
  {
    "CSA":"Lauraville",
    "Median Household Income (2008-2012)":" 57,895.04 ",
    "Life Expectancy (2012)":75,
    "Absent (2012)":10.8
  },
  {
    "CSA":"Loch Raven",
    "Median Household Income (2008-2012)":" 46,721.88 ",
    "Life Expectancy (2012)":75.9,
    "Absent (2012)":8.8
  },
  {
    "CSA":"Madison/East End",
    "Median Household Income (2008-2012)":" 29,695.49 ",
    "Life Expectancy (2012)":67.4,
    "Absent (2012)":27.1
  },
  {
    "CSA":"Medfield/Hampden/Woodberry/Remington",
    "Median Household Income (2008-2012)":" 55,999.40 ",
    "Life Expectancy (2012)":75.9,
    "Absent (2012)":10.9
  },
  {
    "CSA":"Midtown",
    "Median Household Income (2008-2012)":" 36,750.99 ",
    "Life Expectancy (2012)":76,
    "Absent (2012)":14.3
  },
  {
    "CSA":"Midway/Coldstream",
    "Median Household Income (2008-2012)":" 30,821.91 ",
    "Life Expectancy (2012)":67.9,
    "Absent (2012)":21.3
  },
  {
    "CSA":"Morrell Park/Violetville",
    "Median Household Income (2008-2012)":" 43,529.60 ",
    "Life Expectancy (2012)":72.7,
    "Absent (2012)":16.5
  },
  {
    "CSA":"Mount Washington/Coldspring",
    "Median Household Income (2008-2012)":" 85,405.68 ",
    "Life Expectancy (2012)":81.7,
    "Absent (2012)":6.1
  },
  {
    "CSA":"North Baltimore/Guilford/Homeland",
    "Median Household Income (2008-2012)":" 78,921.41 ",
    "Life Expectancy (2012)":83.2,
    "Absent (2012)":3.6
  },
  {
    "CSA":"Northwood",
    "Median Household Income (2008-2012)":" 56,023.79 ",
    "Life Expectancy (2012)":76.2,
    "Absent (2012)":9.7
  },
  {
    "CSA":"Oldtown/Middle East",
    "Median Household Income (2008-2012)":" 13,478.16 ",
    "Life Expectancy (2012)":74,
    "Absent (2012)":13.7
  },
  {
    "CSA":"Orangeville/East Highlandtown",
    "Median Household Income (2008-2012)":" 41,122.22 ",
    "Life Expectancy (2012)":72.9,
    "Absent (2012)":19.2
  },
  {
    "CSA":"Patterson Park North & East",
    "Median Household Income (2008-2012)":" 52,465.51 ",
    "Life Expectancy (2012)":71.7,
    "Absent (2012)":23.3
  },
  {
    "CSA":"Penn North/Reservoir Hill",
    "Median Household Income (2008-2012)":" 28,724.28 ",
    "Life Expectancy (2012)":69.9,
    "Absent (2012)":19.4
  },
  {
    "CSA":"Pimlico/Arlington/Hilltop",
    "Median Household Income (2008-2012)":" 30,030.99 ",
    "Life Expectancy (2012)":69.1,
    "Absent (2012)":10.7
  },
  {
    "CSA":"Poppleton/The Terraces/Hollins Market",
    "Median Household Income (2008-2012)":" 19,277.12 ",
    "Life Expectancy (2012)":67.1,
    "Absent (2012)":22.2
  },
  {
    "CSA":"Sandtown-Winchester/Harlem Park",
    "Median Household Income (2008-2012)":" 24,006.35 ",
    "Life Expectancy (2012)":68.8,
    "Absent (2012)":15.5
  },
  {
    "CSA":"South Baltimore",
    "Median Household Income (2008-2012)":" 85,172.62 ",
    "Life Expectancy (2012)":75,
    "Absent (2012)":21.9
  },
  {
    "CSA":"Southeastern",
    "Median Household Income (2008-2012)":" 30,968.12 ",
    "Life Expectancy (2012)":74,
    "Absent (2012)":5.4
  },
  {
    "CSA":"Southern Park Heights",
    "Median Household Income (2008-2012)":" 26,949.47 ",
    "Life Expectancy (2012)":69.2,
    "Absent (2012)":13.5
  },
  {
    "CSA":"Southwest Baltimore",
    "Median Household Income (2008-2012)":" 28,085.24 ",
    "Life Expectancy (2012)":67.8,
    "Absent (2012)":20.8
  },
  {
    "CSA":"The Waverlies",
    "Median Household Income (2008-2012)":" 31,385.59 ",
    "Life Expectancy (2012)":72,
    "Absent (2012)":13.1
  },
  {
    "CSA":"Upton/Druid Heights",
    "Median Household Income (2008-2012)":" 14,784.62 ",
    "Life Expectancy (2012)":67.3,
    "Absent (2012)":22.2
  },
  {
    "CSA":"Washington Village/Pigtown",
    "Median Household Income (2008-2012)":" 44,933.22 ",
    "Life Expectancy (2012)":69.8,
    "Absent (2012)":23.6
  },
  {
    "CSA":"Westport/Mount Winans/Lakeland",
    "Median Household Income (2008-2012)":" 42,726.73 ",
    "Life Expectancy (2012)":72.8,
    "Absent (2012)":14.9
  },
  {
    "CSA":"Baltimore City",
    "Median Household Income (2008-2012)":" 40,803.00 ",
    "Life Expectancy (2012)":73.9,
    "Absent (2012)":15.1
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
               siteData = {},
                csaData = {};

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
        }
      }

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

    var csaFunc = function(cat_){
      var csaVal;
      for(var i=0;i<csaDemographics.length;i++){
        if(csaDemographics[i].CSA == site.CSA){
          if(cat_ === 'life' || cat_ === 'income') {
            csaVal = cat_ === 'life' ? csaDemographics[i]['Life Expectancy (2012)'] : parseInt(csaDemographics[i]['Median Household Income (2008-2012)'].replace(/,/g,''));
          }
          if(cat_ === 'absent'){
            csaVal = csaDemographics[i]['Absent (2012)'];
          }
        }
      }

    return csaVal
    }

    if($scope.site){
      //PIE CHARTS
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

      //BAR CHARTS
      //csaFunc IS BASED OFF DATA COMPILED FROM http://bniajfi.org/vital_signs/data_downloads/

      //LIFE EXPECTANCY
      //STATE  http://dhmh.maryland.gov/vsa/Documents/12annual.pdf
      //NATION http://www.cdc.gov/nchs/fastats/life-expectancy.htm
      $scope.lifeData = {
        labels: ['Nation', 'State', 'This neighborhood'],
        series: [
        [78.7,79.7,csaFunc('life')]
        ]
      }

      //MEDIAN INCOME
      //NATION & STATE http://factfinder.census.gov/
      $scope.incomeData = {
        labels: ['Nation', 'State', 'This neighborhood'],
        series: [
        [60000,73000,csaFunc('income')]
        ]
      }

      //SCHOOL ABSENTEEISM
      //NATION & STATE N/A
      //TBD CITY 12.7 http://bniajfi.org/community/Baltimore%20City/
      $scope.schoolData = {
        labels: ['Nation(N/A)','State(N/A)','This neighborhood'],
        series: [
        [0, 0, csaFunc('absent')],
        ]
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
  }

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
