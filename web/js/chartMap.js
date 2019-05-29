let chartMap = {
  map : {},
  add : function(symbol) {
    this.notInMap(symbol)
      .then((symbol) => { return this.existInDatabase(symbol) })
      .then((symbol) => { return this.getDataset(symbol) })
      .then((obj) => { return this.createChart(obj.symbol, obj.dataset) })
      .catch((error) => { console.log(error); });

  },
  notInMap : function(symbol) {
    return new Promise((resolve, reject) => {
        if(this.map[symbol] !== undefined) reject();
        else resolve(symbol);
      }).catch(() => {
        throw(`Error : There is already a chart with ${symbol}`);
      });
  },
  existInDatabase : function(symbol) {
    let url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`;
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
        throw(error);
      }); 
  },
  getDataset : function(symbol) {
    let url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`;

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
    this.map[symbol] = new chart(symbol, dataset.x, dataset.y);
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

