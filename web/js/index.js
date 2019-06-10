let uiColor = {
  blue : '#4B77BE',
  grey : '#333',
}

document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();

  // Save listener
  $('#save').on('click', () => {
    saveSettings();
  });

  // Load listener
  $('#load').on('click', () => {
    let file = $('#loadLoc').prop('files')[0];
    if(!file) {
      alert('Error : No file was selected');
      return;
    }
    loadSettings(file);
  });


  $('#addNews').on('submit', () => {
    event.preventDefault();

    let date = $('#date').val();
    if(invalidDate(date)) {
      alert('Error : Invalid date. Must be in YYYY-MM-DD format');
      return;
    }

    // Grab data
    let tag = $('#tag').val();
    let summary = $('#summary').val();
    let website = $('#website').val();

    // Add annotation
    let chart = getSelectedChart();
    chart.addAnnotation(date, tag, summary, website);

    // Clear form
    $('#date').val('');
    $('#tag').val('');
    $('#summary').val('');
    $('#website').val('');
  });
});

function createFormListeners() {
  $('#addGraph').on('submit', () => {
    event.preventDefault();
    let stockSymbol = $('[name="stockSymbol"]').val();
    chartMap.add(stockSymbol.toLowerCase());
  });


  // Highlights clicked menu and display subMenu
  $('#menu li .menuItem').on('click', () => {
    // Make all item similar color
    $('#menu .menuItem').css('background-color', uiColor.grey);
    // Color clicked item
    $(event.target).css('background-color', uiColor.blue);

    // Display closing icon
    $('#subMenu div').css('display', 'block');

    // Display subMenu
    let index = $(event.target).parent().index();
    $('#subMenu > li, #blackOut').css('display', 'none');
    $(`#subMenu > li:nth-child(${index+2})`).css('display', 'block');

    // Black out subMenu if no chart is selected
    if(index == 1 && getSelectedChart() == null) {       // fixme
      let rect = $('#addNews')[0].getBoundingClientRect();
      $('#blackOut').css({height : rect.height, display : 'block'});
    }
  });

  // Close subMenu
  $('#subMenu .close').on('click', () => {
    // Close subMenu
    $('#subMenu > *').css('display', 'none');

    // Update main menu to default color
    $('#menu .menuItem').css('background-color', uiColor.grey);
  });
return;
  // test bench
  $('#menu').click();
  $('#addGraph [name="stockSymbol"]').val('amzn');
  $('#addGraph [type="submit"]').submit();

  setTimeout( () => {
    $('#chart').click();

    $('#date').val('2015-12-04');
    $('#tag').val('Test 2');
    $('#summary').text('something really really really long here');
    $('#website').val('www.google.com');
    $('#addNews [type="submit"]').click();
  }, 2000);
}

function saveSettings() {
  let contents = JSON.stringify(getSavedObject(), null, 2);
  let blob = new Blob([contents], {type: 'text/plain'});
  let anchor = document.createElement('a');
  let fileName = $('input#saveName').val();

  anchor.download = (fileName || 'stockSettings') + '.json';
  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
  anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
  anchor.click();
}

function loadSettings(file) {
  let fileReader = new FileReader();

  fileReader.onerror = function() {
    alert(`Error : ${this.error}`);
  }

  fileReader.onload = function() {
    try {
      let file = JSON.parse(this.result);
      if(file.app != 'stockPage') throw('Wrong file.  Must load a stockPage configation.');
      loadAnnotations(file);
    } catch(error) {
      alert(`Error : ${error}`);
    }
  }

  fileReader.readAsText(file);
}

function invalidDate(date) {
  if(date.split('-').length != 3) return false;

  let [year, month, day] = date.split('-');

  if(isNaN(year) || isNaN(month) || isNaN(day)) return false;
}

function getSavedObject() {
  let savedObject = {
    app : 'stockPage',
    version : 1,
    revision : 0,
    annotations : getAllAnnotations(),
  }

  return savedObject;
}

async function loadAnnotations(file) {
  let version = `${file.version}.${file.revision}`;

  for(let stockSymbol in file.annotations) {
    if(chartMap.map[stockSymbol] == undefined) await chartMap.add(stockSymbol);
    for(let annotation of file.annotations[stockSymbol])
      chartMap.map[stockSymbol].addAnnotation(...annotation);
  }
}
