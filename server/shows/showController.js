var request = require('superagent');

var showController = function (Show) {

  var getData = function (req, res) {
    var url = 'http://www.omdbapi.com/?';
    var query = req.query || '';

    var getShow = function (callback) {
      var num = 1;
      return request
      .get(url)
     // .query({season: num})
      .query(query)
      //query {t: queryString, type: 'series', season: seasonNumber}
      .end(function (err, results) {
        if (err) console.log(err);
        console.log(results.body);
        callback(results.body);
      });
    };

    getShow(function (data) {
     // console.log("data: " , data);
      // if True, or more seasons 
      // get(show())
      res.json(data);
    }); 
  };

  return {
    getData: getData
  };
};

module.exports = showController;