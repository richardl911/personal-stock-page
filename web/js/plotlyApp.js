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
        <div class="collapsible" style="font-size:12px:height:12px">News Contents <span style="float:right;margin-right:10px;color:white">+</span></div>\
        <div class="newsBar" style="display:none;text-align:center">\
          <div><label>Date</label><input name="date" type="text" value="testDate" disabled></input></div>\
          <div><label>Chart Description</label><input name="tag" type="text" value="test2" disabled></input></div>\
          <div><label>Summary</label><textarea name="summary" rows="3" style="resize:none" disabled></textarea></div>\
          <div><label>Reference Website</label><input name="website" type="text" disabled></input></div>\
        </div>\
      </div>\
    '); 
  this.chartWindow.appendTo('body').draggable({stack : '*'}).resizable();

  this.chartEl = $(this.chartWindow).children('#chart')[0];
  this.newsBar = this.chartWindow.find('.newsBar');
  this.newsBarSign = this.chartWindow.find('.collapsible span');

  this.chartWindow.find('.close').on('click', () => {
    this.hide();
  });

  // Handler for more indepth news contents
  this.chartWindow.find('.collapsible').on('click', () => {
    let display = this.newsBar.css('display');
    if(display == 'none') {
      this.newsBar.css('display', 'block');
      this.newsBarSign.text('-');
    } else {
      this.newsBar.css('display', 'none');
      this.newsBarSign.text('+');
    }
  });

  // Resizing plotly handler
  this.chartWindow.on('resizestop', function(event, ui) {
    let rect = $(ui.element)[0].getBoundingClientRect();
    let localChart = $(ui.element).children('#chart')[0];

    Plotly.relayout(localChart, {width : rect.width, height : rect.height-20-22});    // fixme - need a better method of doing this
                                                                                      // 20 for top bar; 10+12 for news menu (12 font [5+5] padding)
  });

  // Get form access when chart is clicked
  this.chartWindow.on('click', () => {
    $('#blackOut').css('display', 'none');
    $('#addNews > p').text(`${this.name.toUpperCase()} News`);
    $('#addNews [type="submit"]').val(`Add News to ${this.name.toUpperCase()}`);
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
  this.annotation.push(createAnnotatedElement(testDate, this.getYFromX(testDate), 'Test1'));

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
  this.chartWindow.css('display', 'none');
}

chart.prototype.show = function() {
  this.chartWindow.css('display', 'block');
}


chart.prototype.addAnnotation = function(date, tag, summary, website) {
  this.annotatedHash[date] = [tag, summary, website];
  tag = tag == '' ? 'no tag' : tag;
  this.annotation.push(createAnnotatedElement(date, this.getYFromX(date), tag));   //fixme - how to handle double tags

  Plotly.relayout(this.chartEl, this.layout);
}

chart.prototype.getYFromX = function(date) {
  let indexOfX = this.data[0].x.indexOf(date);

  if(indexOfX == -1) return this.getClosetYFromX(date);     //fixme - need to handle weekend and holidays correctly

  return this.data[0].y[indexOfX];
}

chart.prototype.getClosetYFromX = function(date) {
  let [year, month, day] = date.split('-');
  let ref = new Date(year, month, day);

  let smallestDelta = +Infinity;
  let deltaIndex = 0;

  for(let index in this.data[0].x) {
    [year, month, day] = this.data[0].x[index].split('-');
    let curr = new Date(year, month, day);
    if(smallestDelta > Math.abs(curr-ref)) {
      deltaIndex = index;
      smallestDelta = Math.abs(curr-ref);
    }
  }

  return this.data[0].y[deltaIndex];
}

function getSelectedChart() {
  return selectedChart;
}

function createAnnotatedElement(x, y, shortTag) {
  return {
    x : x,
    y : y,
    xref : 'x',
    yref : 'y',
    text : shortTag,
    showarrow : true,
    arrowhead : 7,
    ax : 0,
    ay : -40,
  }
}



