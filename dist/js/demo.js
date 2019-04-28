/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */


function updateChart(res) {
  window.graphData = {};
  res.forEach((val) => {
    // Filtering by index
    if($('#index').val()) {
      if(val.Index != $('#index').val()) {
        return;
      }
    }

    if($('#country').val()) {
      if(val.Country != $('#country').val()) {
        return;
      }
    }
    
    if(!window.graphData[val.Country]) {
      window.graphData[val.Country] = [];
    }

    window.graphData[val.Country][val.Year - 2005] = val.Value;
  });

  
  const colors = [
    'rgba(150, 99, 132, 0.5)',
    'rgba(0, 255, 132, 0.5)',
    'rgba(180, 49, 132, 0.5)',
    'rgba(255, 99, 32, 0.5)',
    'rgba(255, 199, 132, 0.5)',
    'rgba(25, 199, 132, 0.5)',
    'rgba(25, 9, 132, 0.5)',
    'rgba(255, 155, 132, 0.5)',
    'rgba(2, 255, 32, 0.5)',
  ];

  const datasets = [];
  const scatterDatasets = [];
  let counter = 0;
  for (let i in window.graphData) {

    datasets.push({
      label: i,
      data: window.graphData[i],
      borderColor: [
        colors[counter++]
      ],
      backgroundColor: [
        colors[counter]
      ]
    });
  }

  lineChart.data.datasets = datasets;
  lineChart.update();
}



$(() => {
  $('#index').change(() => {
    updateChart(window.allData);
  });

  $('#country').change(() => {
    updateChart(window.allData);
  });
})


  /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */

    //--------------
    //- AREA CHART -
    //--------------

    // Get context with jQuery - using jQuery's .get() method.
    // var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    // var areaChart = new Chart(areaChartCanvas);
    labels = [];
    for(let i = 2005; i < 2017; i++) {
      labels.push(i);
    }
    var areaChartData = {
      labels: labels,
      datasets: [
      ]
    };

    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };

    //Create the line chart
    // areaChart.Line(areaChartData, areaChartOptions);

    //-------------
    //- LINE CHART -
    //--------------
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    window.lineChart = new Chart(lineChartCanvas, {
      type: 'line',

      data: areaChartData
    });
    var lineChartOptions = areaChartOptions;
    lineChartOptions.datasetFill = false;
    // lineChart.Line(areaChartData, lineChartOptions);
    
    $.get('https://raw.githubusercontent.com/devgrigor/admin-panel-infovis/master/data/final.json')
    .then(res => {
      
      res = JSON.parse(res);
      window.allData = res;
      const indexes = {};
      const countries = {};

      res.forEach(val => {
        indexes[val.Index] = true;
        countries[val.Country] = true;
      });

      for(let i in indexes) {
        $('#index').append(`<option>${i}</option>`);
      }

      for(let i in countries) {
        $('#country').append(`<option>${i}</option>`);
      }

      updateChart(window.allData);

      console.log(window.graphData);
    });

    var scatterCanvas = $("#scatterChart").get(0).getContext("2d");

    var data = [{
                x: 5,
                y: 4,
                pointRadius: 5
            }, {
                x: 2,
                y: 14
            },
            {
                x: 4,
                y: 12
            },
            {
                x: 2,
                y: 10
            },
            {
                x: 3,
                y: 4
            },
            {
                x: 3,
                y: 5
            },
            {
                x: 3,
                y: 8
            },
            {
                x: 6,
                y: 12
     
      }]; // Add data values to array
      // End Defining data
      var options = {responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
      };

      // End Defining data
      window.scatterChart = new Chart(scatterCanvas, {
          type: 'scatter',
          data: {
              datasets: [{
                pointRadius: 5,
                label: 'Population', // Name the series
                data: data, // Specify the data values array
                borderColor: '#2196f3', // Add custom color border            
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            }]
          },
          options: options
      });