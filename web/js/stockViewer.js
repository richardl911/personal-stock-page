let apiKey = config.apiKey || '';
const urlBase = 'https://www.quandl.com/api/v3/datasets/WIKI/'


document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();
});

function createFormListeners() {
  $('#apiKeyForm').on('submit', () => {
    event.preventDefault();
//    apiKey = $('#apiKeyForm > input[name="apiKey"]').val();
    checkValidKey();
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
