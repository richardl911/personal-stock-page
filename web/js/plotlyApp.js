let selectedChart = null;

function chart(name, x, y) {
  this.name = name;
  this.chartWindow = null;          // jQuery object
  this.chartEl = null;              // HTML object

  this.data = [];
  this.layout = {};
  this.config = {};

  this.pushDataToSet(x, y);
  this.setDefaultSettings();
  this.createGraph();
}

chart.prototype.createGraph = function() {
  if(this.chartEl) Plotly.purge(this.chartEl);
  if(this.chartWindow) this.chartWindow.remove(); 

  this.chartWindow =
    $('\
      <div class="chartWindow" style="width:750px;height:500px;padding:10px,10px;border:0px solid black">\
        <div style="background-color:blue;height:20px">\
          <span class="close" style="color:white">&times</span>\
        </div>\
        <div id="chart" style="width:100%;height:calc(100% - 20px)"></div>\
      </div>\
    '); 
  this.chartEl = $(this.chartWindow).children('#chart')[0];

  this.chartWindow.appendTo('body').draggable({stack : '*'}).resizable();

  this.chartWindow.find('.close').on('click', () => {
    this.hide();
  });

  // Resizing plotly handler
  this.chartWindow.on('resizestop', function(event, ui) {
    console.log('resizing');

    let rect = $(ui.element)[0].getBoundingClientRect();
    let localChart = $(ui.element).children('#chart')[0];

    Plotly.relayout(localChart, {width : rect.width, height : rect.height - 20});
  });

  this.chartWindow.on('click', () => {
    $('#newsTag > div').text(`Add news to ${this.name} graph`);
    $('#newsTag > [type="submit"]').val(`Add News to ${this.name}`);
    selectedChart = this;
  });


  Plotly.newPlot(this.chartEl, this.data, this.layout, this.config);
}

chart.prototype.pushDataToSet = function(x, y) {
  let data = {
    x : x,
    y : y,
    mode : 'scatter',
    hoverinfo : 'none',
  }
  this.data.push(data);
}


chart.prototype.setDefaultSettings = function() {
  this.layout = {
    title : `${this.name} Stock`,
    xaxis : {
      title : 'Date',
      fixedrange : true,
    },
    yaxis : {
      title: 'Price',
      fixedrange : true,
    },
    margin : {
      l : 40,
      r : 40,
      t : 60,
      b : 40,
    } 
  };

  this.config = {
    displayModeBar : false,
    responsive: true,
  };
}

chart.prototype.hide = function() {
  this.chartWindow.css({'display' : 'none'});
}

function getSelectedChart() {
  return selectedChart;
}
