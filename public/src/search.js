var key = 'api_key=2c8a02fa36fb5299dcd97bbc84609899';
var ImgPath = "http://image.tmdb.org/t/p/";
//var urls = ["", "/cgi-bin/LWP.pl?url=http://en.wikipedia.org", ""];
var RTkey = "pfwh96pvezces4nybpv7qf8f";



angular.module('app.autocomplete', [])
  .directive('autocomplete', ['$http', function($http) {
    return function(scope, elem, attrs) {
          var element = angular.element(elem)[0];
  console.log(element)
    element.autocomplete({
        minLength: 2,
        delay: 200,
        source: function(request, response) {
          var url = "http://api.themoviedb.org/3/search/tv?api_key=2c8a02fa36fb5299dcd97bbc84609899" + request.term;
          $http.get(url).success(function(data) {
            response(data.results);
          });
        },
        focus: function(event, ui) {
          element.val(ui.item.name);
          return false;
        },
        select: function(event, ui) {
          scope.queryId.selected = ui.item.value;
          scope.$apply;
          return false;
        },
        change: function(event, ui) {
          if (ui.item === null) {
            scope.queryId.selected = null;
          }
        }
      }).data("autocomplete")._renderItem = function(ul, item) {
        console.log(item)
        var inner_html = "<a><img width='45' height='68' src=" + ImgPath + "w92" + tv.poster_path + "> <strong>" + tv.name + "</strong>  " + tv.first_air_date + " </a>";

        return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a>" + item.label + "</a>")
          .appendTo(ul);
      };
    }
  }])


.directive('blur', function() {
  return function(scope, elem, attrs) {
    elem.bind('blur', function() {
      scope.$apply(attrs.blur);
    });
  };
});



// ((function($) {
//   var films = $("#Films")
//   console.log(films)
//   films.autocomplete({

//     source: function(request, response) {
//       $.getJSON("http://api.themoviedb.org/3/search/tv?" + key, {
//         query: request.term
//       }, function(tvs) {
//         response(tvs.results);

//       });
//     },
//     minLength: 2,
//     delay: 200,
//     focus: function(event, tv) {
//       //an item is being focussed on
//       $(this).val(tv.item.name);
//       return false;
//     }

//   }).data("uiAutocomplete")._renderItem = function(ul, tv) {
//     console.log(tv)
//     if (tv.poster_path) {
//       var inner_html = "<a><img width='45' height='68' src=" + ImgPath + "w92" + tv.poster_path + "> <strong>" + tv.name + "</strong>  " + tv.first_air_date + " </a>";
//       return $("<li></li>")
//         .data("item.autocomplete", tv)
//         .append(inner_html)
//         .appendTo(ul);
//     } else {

//       var inner_html = "<a> <strong>" + tv.name + "</strong>  " + tv.first_air_date + " </a>";
//       return $("<li></li>")
//         .data("item.autocomplete", tv)
//         .append(inner_html)
//         .appendTo(ul);
//     }

//   };



// }))(jQuery);
