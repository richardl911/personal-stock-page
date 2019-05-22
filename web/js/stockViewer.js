let apiKey = config.apiKey || '';



document.addEventListener('DOMContentLoaded', function() {
  createFormListeners();
});

function createFormListeners() {
  $('#apiKeyForm').on('submit', () => {
    event.preventDefault();
    apiKey = $('#apiKeyForm > input[name="apiKey"]').val();
  });
}

function getURL(dataSet) {
// "https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=YOURAPIKEY"
}
