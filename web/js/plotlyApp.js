let selectedChart = null;
let mainColor = '#4B77FE'

function chart(name, x, y) {
  this.name = name;
  this.chartWindow = null;          // jQuery object
  this.chartEl = null;              // HTML object

  this.annotatedHash = {};
  this.annotation = [];
  this.data = [];
  this.layout = {};
  this.config = {};

  this.minY = 0;
  this.maxY = 0;

  this.pushDataToSet(x, y);
  this.setDefaultSettings();
  this.createGraph();
}

chart.prototype.createGraph = function() {
  if(this.chartEl) Plotly.purge(this.chartEl);
  if(this.chartWindow) this.chartWindow.remove(); 

  this.chartWindow =
    $('\
      <div class="chartWindow" style="width:750px">\
        <div style="background-color:#4B77BE;height:20px">\
          <span class="close" style="color:white">&times</span>\
        </div>\
        <div id="chart"></div>\
        <button class="collapsible">News Contents</button>\
        <div class="newsBar">\
          <div> Date : YYYY/MM/DD </div>\
        </div>\
      </div>\
    '); 
  this.chartEl = $(this.chartWindow).children('#chart')[0];

  this.chartWindow.appendTo('body').draggable({stack : '*'}).resizable();

  this.chartWindow.find('.close').on('click', () => {
    this.hide();
  });

  // Resizing plotly handler
  this.chartWindow.on('resizestop', function(event, ui) {
    let rect = $(ui.element)[0].getBoundingClientRect();
    let localChart = $(ui.element).children('#chart')[0];

    Plotly.relayout(localChart, {width : rect.width, height : rect.height-20});
  });

  // Get form access when chart is clicked
  this.chartWindow.on('click', () => {
    $('#newsTag > div').text(`Add news to ${this.name} graph`);
    $('#newsTag > [type="submit"]').val(`Add News to ${this.name}`);
    selectedChart = this;
  });

  

  Plotly.newPlot(this.chartEl, this.data, this.layout, this.config);
}

chart.prototype.pushDataToSet = function(x, y) {
  this.minY = Math.min(...y);
  this.maxY = Math.max(...y);

  let data = {
    x : x,
    y : y,
    mode : 'scatter',
    hoverinfo : 'none',
  }
  this.data.push(data);
}


chart.prototype.setDefaultSettings = function() {
  let testDate = "2016-05-04";
  this.annotation.push(createAnnotatedElement(testDate, this.getYFromX(testDate)));

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
      l : 50,
      r : 40,
      t : 40,
      b : 60,
    },
    annotations : this.annotation,
  };

  this.config = {
    displayModeBar : false,
    responsive: true,
  };
}

chart.prototype.hide = function() {
  this.chartWindow.css({'display' : 'none'});
}

chart.prototype.addAnnotation = function(date, tag, summary, website) {
  this.annotatedHash[date] = [tag, summary, website];

  this.annotation.push(createAnnotatedElement(date, this.getYFromX(date)));

  Plotly.relayout(this.chartEl, this.layout);
}

chart.prototype.getYFromX = function(date) {
  let indexOfX = this.data[0].x.indexOf(date);

  if(indexOfX == -1) return this.min;     //fixme - need to handle weekend and holidays correctly

  return this.data[0].y[indexOfX];
}

function getSelectedChart() {
  return selectedChart;
}

function createAnnotatedElement(x, y) {
  return {
    x : x,
    y : y,
    xref : 'x',
    yref : 'y',
    text : 'Annotation Text',
    showarrow : true,
    arrowhead : 7,
    ax : 0,
    ay : -40,
  }
}



