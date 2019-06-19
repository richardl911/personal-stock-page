let chartMap = {
  apiKey : 'pk_19b96c0c6c344188b05b6f6566ae4782',       // fixme
  map : {},
  add : function(symbol) {
    return this.notInMap(symbol)
      .then((symbol) => { return this.existInDatabase(symbol) })
      .then((symbol) => { return this.getDataset(symbol) })
      .then((obj) => { return this.createChart(obj.symbol, obj.dataset) })
      .catch((error) => { alert(error); console.log(error); });
  },
  notInMap : function(symbol) {
    return new Promise((resolve, reject) => {
        if(this.map[symbol] !== undefined) {
          this.map[symbol].show();
          reject();
        } else {
          resolve(symbol);
        }
      }).catch(() => {
        throw(`Error : There is already a chart with ${symbol}`);
      });
  },
  existInDatabase : function(symbol) {
    let url = `https://cloud.iexapis.com/stable/stock/${symbol}/delayed-quote?token=${this.apiKey}`;
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onload = function(){

          if(this.status != 200) reject(`Error ${this.status} : ${this.statusText}`);
          else resolve(symbol);
        }

        xhr.error = function() {
          reject('Error with xhr')
        }

        xhr.open('GET', url);
        xhr.send();

      }).catch((error) => {
        throw(`Error : -${symbol.toUpperCase()}- is an invalid stock symbol`);
      }); 
  },
  getDataset : function(symbol) {
    let url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/5y?token=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if(this.status != 200) {
          reject(`Error ${this.status} : ${this.statusText}`);
        } else {
          try {
            let dataset = JSON.parse(this.response);
            resolve({symbol : symbol, dataset : dataset});
          } catch {
            reject('Invalid response structure');
          }
        }
      }

      xhr.error = function() {
        reject('Error with xhr');
      }

      xhr.open('GET', url);
      xhr.send();

    }).catch((error) => {
      throw(error);
    });
  },
  createChart : function(symbol, dataset) {
    dataset = iexDatasetFilter(dataset);
    this.map[symbol] = new chart(symbol.toUpperCase(), dataset.x, dataset.y);
  },
}

function iexDatasetFilter(dataset) {
  let plotlySet = {
    x : [],
    y : [],
  }

  for(let data of dataset) {
    plotlySet.x.push(data.date);
    plotlySet.y.push(data.close);
  }
  return plotlySet;
}

function getAllAnnotations() {
  let annotations = {};

  for(let stockSymbol in chartMap.map) {
    let annotation = chartMap.map[stockSymbol].getAnnotations();
    annotations[stockSymbol] = annotation;
  }

  return annotations;
}
