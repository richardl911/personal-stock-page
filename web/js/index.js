let uiColor = {
  blue : '#4B77BE',
  grey : '#333',
}

document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();

  $('#save').on('click', () => {
    saveSettings();
  });

  $('#newsTag').on('submit', () => {
    event.preventDefault();

    let date = $('#date').val();
    if(invalidDate(date)) {
      alert('Error : Invalid date. Must be in YYYY-MM-DD format');
      return;
    }

    let tag = $('#tag').val();
    let summary = $('#summary').text();
    let website = $('#website').val();

    let chart = getSelectedChart();

    chart.addAnnotation(date, tag, summary, website);
  });
});

function createFormListeners() {
  $('#createGraph').on('submit', () => {
    event.preventDefault();

    let stockSymbol = $('[name="stockSymbol"]').val();
    chartMap.add(stockSymbol.toLowerCase());
  });


  // Highlights clicked menu and display subMenu
  $('#menu li .menuItem').on('click', () => {
    $('#menu .menuItem').css('background-color', uiColor.grey);
    $(event.target).css('background-color', uiColor.blue);

    let index = $(event.target).parent().index();
    $('#subMenu > li').css('display', 'none');
    $(`#subMenu > li:nth-child(${index+1})`).css('display', 'block');
  });



  // test bench
  $('[name="stockSymbol"]').val('fb');
  $('#createGraph [type="submit"]').click();      //fixme - used for debugging

  $('#date').val('2015-10-09');
  $('#short').val('test');
  $('#summary').text('some kind of long long summary here');
  $('#website').val('www.google.com');
  setTimeout( () => {
    $('.chartWindow').first().click()
  }, 5000);


//  $('[name="stockSymbol"]').val('aapl');
//  $('#createGraph [type="submit"]').click();      //fixme - used for debugging
}

let content = 'hello word';
function saveSettings() {
  let blob = new Blob([content], {type: 'text/plain'});
  let anchor = document.createElement('a');
  let fileName = $('input[name="fileName"]').val();

  anchor.download = (fileName || 'stockSettings') + '.json';
  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
  anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
  anchor.click();
}

function invalidDate(date) {
  if(date.split('-').length != 3) return false;

  let [year, month, day] = date.split('-');

  if(isNaN(year) || isNaN(month) || isNaN(day)) return false;
}
