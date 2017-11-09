var countryName = [];
var globalRidershipCount = [];
var globalColors = [];

var boroughName = [];
var manhattanDelta = [];
var brooklynDelta = [];
var bronxDelta = [];
var queensDelta = [];

var year = [];
var fare = [];

$(document).ready(function() {
  // BUILD GLOBAL RIDERSHIP CHART
  $.ajax({
    url: 'data/global-ridership.json',
    type: 'GET',
    async: true,
    dataType: "json",
    success: function(data) {
      parseGlobalData(data);
    }
  });

  // BUILD TOTAL RIDERSHIP CHART
  $.ajax({
    url: 'data/annual-delta.json',
    type: 'GET',
    async: true,
    dataType: "json",
    success: function(data) {
      parseDeltaData(data);
    }
  });

  $('#example').on( 'click', 'tbody td:not(.child), tbody span.dtr-data', function (e) {
    // Ignore the Responsive control and checkbox columns
    if ( $(this).hasClass( 'control' )) {
        return;
    }
  } );

  $('#data-table').DataTable( {
      order: [7, 'asc'],
      ajax: {
          url: "data/ridership.json",
      },
      columns: [
        { data: "Station" },
        { data: "2011" },
        { data: "2012" },
        { data: "2013" },
        { data: "2014" },
        { data: "2015" },
        { data: "2016" },
        { data: "2016 Rank" },
        { data: "Borough" },
      ],
      select: true,
      responsive: true,
      columnDefs: [
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: -2 }
      ]
  } );

  // BUILD MTA FARE
  $.ajax({
    url: 'data/fare.json',
    type: 'GET',
    async: true,
    dataType: "json",
    success: function(data) {
      parseFareData(data);
    }
  });
});

function parseDeltaData(data) {
  $.each(data, function(i, item) {
    if (data[i].Borough == "Queens") {
      boroughName.push(data[i].Borough);
      queensDelta.push(data[i].twelve);
      queensDelta.push(data[i].thirteen);
      queensDelta.push(data[i].fourteen);
      queensDelta.push(data[i].fifteen);
      queensDelta.push(data[i].sixteen);
    } else if (data[i].Borough == "Manhattan") {
      boroughName.push(data[i].Borough);
      manhattanDelta.push(data[i].twelve);
      manhattanDelta.push(data[i].thirteen);
      manhattanDelta.push(data[i].fourteen);
      manhattanDelta.push(data[i].fifteen);
      manhattanDelta.push(data[i].sixteen);
    } else if (data[i].Borough == "Bronx") {
      boroughName.push(data[i].Borough);
      bronxDelta.push(data[i].twelve);
      bronxDelta.push(data[i].thirteen);
      bronxDelta.push(data[i].fourteen);
      bronxDelta.push(data[i].fifteen);
      bronxDelta.push(data[i].sixteen);
    } else if (data[i].Borough == "Brooklyn") {
      boroughName.push(data[i].Borough);
      brooklynDelta.push(data[i].twelve);
      brooklynDelta.push(data[i].thirteen);
      brooklynDelta.push(data[i].fourteen);
      brooklynDelta.push(data[i].fifteen);
      brooklynDelta.push(data[i].sixteen);
    }

  });
  chartDeltaData();
}

function chartDeltaData() {

  $('#annual-delta').highcharts({
    chart: {
      type: 'area',
      backgroundColor: '#F0F0F0',
      style: {
        fontFamily: 'Atlas Grotesk Web',
      }
    },
    title: {
      text: 'Change in Ridership from 2011-2016',
      style: {
        fontWeight: 'bold'
      }
    },
    yAxis: {
      title: {
        text: 'Ridership',
        style: {
          fontWeight: 'bold',
          color: 'black'
        }
      }
    },
    xAxis: {
      title: 'Year',
      categories: ["2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016"]
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
        // colorByPoint: true,
        name: "Bronx",
        data: bronxDelta
      },
      {
        name: "Manhattan",
        data: manhattanDelta
      },
      {
        name: "Brooklyn",
        data: brooklynDelta
      },
      {
        name: "Queens",
        data: queensDelta
      },
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        }
      }]
    }
  });
}

function parseFareData(data) {
  $.each(data, function(i, item) {
    year.push(data[i].Year);
    fare.push(data[i].Fare)
  });

  chartFareData();
}

function chartFareData() {

  $('#fare-data').highcharts({
    chart: {
      type: 'line',
      backgroundColor: '#F0F0F0',
      style: {
        fontFamily: 'Atlas Grotesk Web',
      }
    },
    title: {
      text: 'MTA Fares 1904-2017',
      style: {
        fontWeight: 'bold'
      }
    },
    yAxis: {
      title: {
        text: 'Single-Ride Cost (USD)',
        style: {
          fontWeight: 'bold',
          color: 'black'
        }
      }
    },
    xAxis: {
      title: 'Year',
      categories: year
    },
    legend: {
      enabled: false
    },
    series: [{
      // colorByPoint: true,
      name: "MTA Fare (Single-Ride)",
      data: fare
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}

function parseGlobalData(data) {
  $.each(data, function(i, item) {
    countryName.push(data[i].Country);
    globalRidershipCount.push(data[i].Ridership)
    if (data[i].Country == "New York City") {
      globalColors.push('#FD7422');
    } else {
      globalColors.push('#008fd5');
    }
  });

  chartGlobalRidership();
}

function chartGlobalRidership() {

  $('#global-ridership').highcharts({
    chart: {
      type: 'bar',
      backgroundColor: '#F0F0F0',
      style: {
        fontFamily: 'Atlas Grotesk Web',
      }
    },
    title: {
      text: 'NYC Transit\'s Rank Among Global Subway Systems',
      style: {
        fontWeight: 'bold'
      }
    },
    yAxis: {
      title: {
        text: 'Ridership (in billions)',
        style: {
          fontWeight: 'bold',
          color: 'black'
        }
      }
    },
    xAxis: {
      title: 'Country',
      categories: countryName
    },
    legend: {
      enabled: false
    },
    series: [{
      colorByPoint: true,
      colors: globalColors,
      data: globalRidershipCount
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}
