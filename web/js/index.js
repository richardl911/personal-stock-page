document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();

  $('#save').on('click', () => {
    saveSettings();
  });

  $('#newsTag').on('submit', () => {
    event.preventDefault();

    let chart = getSelectedChart();
console.log(chart.name);

  });
});

function createFormListeners() {
  $('#createGraph').on('submit', () => {
    event.preventDefault();

    let stockSymbol = $('[name="stockSymbol"]').val();
    chartMap.add(stockSymbol.toLowerCase());
  });

  // test bench
  $('[name="stockSymbol"]').val('fb');
  $('#createGraph [type="submit"]').click();      //fixme - used for debugging
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
