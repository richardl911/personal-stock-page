let uiColor = {
  blue : '#4B77BE',
  grey : '#333',
}

document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();

  $('#save').on('click', () => {
    saveSettings();
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

    $('#date').val('2017-08-25');
    $('#tag').val('Whole Food Merger');
    $('#summary').text('Amazon and Whole Food completed merger');
    $('#website').val('https://www.forbes.com/sites/jeffreydorfman/2017/08/25/amazon-and-whole-foods-merger-to-introduce-cross-platform-selling-and-lower-prices/#43c81d4a12f8');
    $('#addNews [type="submit"]').click();
  }, 2000);
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
