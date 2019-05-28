let chartMap = {
  map : {},
  add : function(symbol) {
    this.notInMap(symbol)
      .then((symbol) => { this.existInDatabase(symbol) })
      .then((symbol) => { this.createChart(symbol)})
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
  createChart : function(symbol) {
    this.map[symbol] = new chart(symbol);
  },
  getDataset : function(symbol) {


  }

}
