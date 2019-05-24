let apiKey = config.apiKey || '';
const urlBase = 'https://www.quandl.com/api/v3/datasets/WIKI/'


document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();

  $('#save').on('click', () => {
    saveSettings();
  });

});

function createFormListeners() {
  $('#apiKeyForm').on('submit', () => {
    event.preventDefault();
//    apiKey = $('#apiKeyForm > input[name="apiKey"]').val();
    checkValidKey();
  });

  $('#createGraph').on('submit', () => {
    event.preventDefault();


  });

}


function checkValidKey(apiKey) {
  getDataSet('FB')
    .then((response, xhr) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDataSet(stockSymbol) {
  // ie : "https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=YOURAPIKEY"
  let url = `${urlBase}${stockSymbol}/data.json?api_key=${apiKey}`
  let xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if(xhr.readyState != 4) return;

      if(xhr.status >= 200 && xhr.status < 300) resolve(xhr.response, xhr)
      else reject({status: xhr.status, statusText: xhr.statusText});
    };

    xhr.open('GET', url);
    xhr.send();

  });
}

function getURLKey() {

}

function joinParameters() {

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
