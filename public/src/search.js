var key = 'api_key=2c8a02fa36fb5299dcd97bbc84609899';
var ImgPath = "http://image.tmdb.org/t/p/";
var urls = ["", "/cgi-bin/LWP.pl?url=http://en.wikipedia.org", ""];
var RTkey = "pfwh96pvezces4nybpv7qf8f";

angular.module('app.autocomplete', [])
  .directive('autocomplete', ['$http', function($http) {
    return function(scope, elem, attrs) {
      //    var element = angular.element(elem)[0];
      // console.log(elem)
      elem.autocomplete({

        minLength: 2,
        delay: 200,
        source: function(request, response) {
          // var url = "https://api.themoviedb.org/3/search/tv?api_key=2c8a02fa36fb5299dcd97bbc84609899&query=" 
          // + request.term;
          // console.log(request.term)
          $http({
            method: "JSONP",
            url: "https://api.themoviedb.org/3/search/tv?api_key=2c8a02fa36fb5299dcd97bbc84609899&query=" + request.term + '&callback=JSON_CALLBACK'

          }).success(function(data) {
            response(data.results);
          });
        },

        focus: function(event, ui) {

          elem.val(ui.item.name);

          //  console.log(ui.item.name)
          return false;
        },
        select: function(event, ui) {
          scope.query = ui.item.name;
          console.log(scope.query)
          scope.submit(ui.item.name)
            //  console.log( ui.item.name)
            //  scope.$apply;
          return false;
        },
        change: function(event, ui) {
          if (ui.item === null) {
            scope.queryId.selected = null;
          }
        }
      }).data("uiAutocomplete")._renderItem = function(ul, item) {


        if (item.poster_path) {
          var inner_html = "<a><img width='45' height='68' src=" + ImgPath + "w92" + item.poster_path + "> <strong>" + item.name + "</strong>  " + item.first_air_date + " </a>";
          return $("<li></li>")
            .data("ui-autocomplete-item", item)
            .append(inner_html)
            .appendTo(ul);
        } else {

          var inner_html = "<a> <strong>" + item.name + "</strong>  " + item.first_air_date + " </a>";
          return $("<li></li>")
            .data("ui-autocomplete-item", item)
            .append(inner_html)
            .appendTo(ul);
        }


      };


    }
  }]);










// .directive('blur', function() {
//   return function(scope, elem, attrs) {
//     elem.bind('blur', function() {
//       scope.$apply(attrs.blur);
//     });
//   };
// });
