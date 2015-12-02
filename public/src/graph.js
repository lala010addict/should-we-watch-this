//Used This Example as a resource below --> http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
//Also this: --> http://codepen.io/Siddharth11/pen/YPMWeE

//Need Width, Height, Padding, Based on Object
//(Would like to use percentages for dynamic sizing based on browser)
var w = 1100;
var h = 400;
var padding = 25;
//We don't know where this will be yet, needs to change.
var data_url = {};
var epId = 1;
var episodedataset = [];
var ratingdataset = [];
var infoset = [];
var showName = '';
var seasonAvg = [];

angular.module('app.directive', [])
.directive('graph', function($parse, $window) {
  return {
    restrict: 'EA',
    template: '<section class="graph"><div id="graph"></div></section>',
    link: function(scope, elem, attrs) {
      scope.$watchCollection('results', function(newVal, oldVal) {
        data_url = newVal || {};
        drawGraph();
      });
    }
  };
});

var drawGraph = function() {

  //clear datasets if graphing new show changed
  if (data_url['Title'] !== showName) {
    console.log('reset');
    epId = 1;
    episodedataset = [];
    ratingdataset = [];
    infoset = [];
  }
  //update showName
  showName = data_url['Title'];

  // All purpose each function
  var each = function(input, callback) {
    if (input.constructor === Object) {
      for (var key in input) {
        callback(input[key], key, input);
      }
    } else {
      for (var i = 0; i < input.length; i++) {
        callback(input[i], i, input);
      }
    }
  };


  //Function for filling up the info dataset
  //Function for filling up the episode dataset
  //iterate over episodes and add data to d3 datasets
  var episodes = data_url["Episodes"] || {};
  each(episodes, function(episode, key) {
    if (episode["imdbRating"] !== "N/A") {
      //get episode data
      var epNum = parseInt(episode["Episode"]);
      var rating = parseFloat(episode["imdbRating"]);
      var showTitle = episode["Title"];
      var season = parseInt(data_url["Season"]);
      //fill the d3 dataset variables
      episodedataset.push([epId, rating]);
      ratingdataset.push(rating);
      infoset.push([showTitle, rating, season, epNum]);
      seasonAvg.push([season, rating]);
      epId++;
    }
  });

var seasonScore = [];

  //This reveals data when you mouse over nodes.
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Title:</strong> <span style='color:#2FFF4D'>" + d[0] + "</span>" + "<br>" + "<strong>Rating:</strong> <span style='color:#2FFF4D'>" + d[1] + "</span>" + "<br>" + "<strong>Season:</strong> <span style='color:#2FFF4D'>" + d[2] + "</span>" + "<br>" + "<strong>Episode:</strong> <span style='color:#2FFF4D'>" + d[3] + "</span>";
    });

  //Define Graph Space, Initialize d3 (This sets how big the div is)
  d3.selectAll('svg')
    .remove();
  $('#graph').empty();

  var svg = d3.select('#graph')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.call(tip);

  //Define Grid (inside), Initialize Scale and Axes of Graph (Using "g" element, tutorial here --> http://tutorials.jenkov.com/svg/g-element.html)
  /*x scale*/
  var xScale = d3.scale.linear()
    .domain([0, d3.max(episodedataset, function(d) {
      return d[0];
    })])
    .range([padding, w - padding]);

  /*y scale*/ //based on rating data set
  ratingdataset.sort();
  var yScale = d3.scale.linear()
    .domain([ratingdataset[0] - 0.2, ratingdataset[ratingdataset.length - 1] + 0.1])
    .range([h - padding, padding]);

  /*x axis*/
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  /*append x axis*/
  svg.append('g')
    .attr({
      'class': 'xaxis',
      'transform': 'translate(0,' + (h - padding) + ')'
    })
    .call(xAxis)
    .append("text")
    .attr("y", -12)
    .attr("x", w - 35)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Episode");

  /*y axis*/
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');
  /*append y axis*/
  svg.append('g')
    .attr({
      'class': 'yaxis',
      'transform': 'translate(' + padding + ',0)'
    })
    .call(yAxis)
    .append("text")
    .attr("y", 5)
    .attr("x", 40)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("IMDB Rating");

  //Draw Graph (Lines and Points)
  /*define line*/
  var lines = d3.svg.line()
    .x(function(d) {
      return xScale(d[0])
    })
    .y(function(d) {
      return yScale(d[1])
    })
    .interpolate('monotone');

  /*append line*/
  var path = svg.append('path')
    .attr({
      'd': lines(episodedataset),
      'class': 'lineChart'
    });

  svg.select('.lineChart')
    .style('opacity', 0)
    .transition()
    .duration(2500)
    .delay(1000)
    .style('opacity', 1);

  /*add points*/
  var points = svg.selectAll('circle')
    .data(episodedataset)
    .enter()
    .append('circle');

  /*point attributes*/
  points.attr('cy', 0)
    .transition()
    .duration(1500)
    .delay(function(d, i) {
      return (i * 100) + 500;
    })
    .ease('elastic')
    .attr({
      'cx': function(d) {
        return xScale(d[0]);
      },
      'cy': function(d) {
        return yScale(d[1]);
      },
      'r': 7,
      'class': 'datapoint',
      'id': function(d, i) {
        return i;
      }
    })
    .style('opacity', 1);

  d3.select('#graph svg')
    .append("text")
    .attr("x", w / 2)
    .attr("y", 14)
    .attr("text-anchor", "middle")
    .style("fill", "#2FFF4D")
    .text(showName);

svg.selectAll('circle').data(infoset).on('mouseover', tip.show).on('mouseout', tip.hide);
  
  var trendLine = function() {
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var len = episodedataset.length;

    each(episodedataset, function(item, index) {
      x1 += item[0];
    });

    each(episodedataset, function(item, index) {
      y1 += item[1];
    });

    each(episodedataset, function(item, index) {
      x2 += (item[0] * item[1]);
    });

    each(episodedataset, function(item, index) {
      y2 += (item[0] * item[0]);
    });

    var slope = (((len * x2) - (x1 * y1)) / ((len * y2) - (x1 * x1)))
    var intercept = ((y1 - (slope * x1)) / len)
    var xLabels = episodedataset.map(function(d) {
      return d[0];
    });
    var xSeries = d3.range(1, xLabels.length + 1);
    var ySeries = episodedataset.map(function(d) {
      return d[1];
    });
    var a1 = xLabels[0];
    var b1 = slope + intercept;
    var a2 = xLabels[xLabels.length - 1];
    var b2 = slope * xSeries.length + intercept;
    var trendData = [
      [a1, b1, a2, b2]
    ];
    var trendLine = svg.select()
    var trendline = svg.selectAll(".trendline")
      .data(trendData);

    trendline.enter()
      .append("line")
      .attr("class", "trendline")
      .attr("x1", function(d) {
        return xScale(d[0]);
      })
      .attr("y1", function(d) {
        return yScale(d[1]);
      })
      .attr("x2", function(d) {
        return xScale(d[2]);
      })
      .attr("y2", function(d) {
        return yScale(d[3]);
      })
      .style("stroke", "rgb(47,255,77)")   
    //ShouldI function
    var avg = y1 / len;
    if (avg >= 7) {
      if (slope > .05) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("You're Missing Out!");
      } else if(slope > 0){
        d3.select('#graph svg')
          .append("text")
          .attr("x", w/2)             
          .attr("y", 350)
          .attr("text-anchor", "middle") 
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Yes!");
        }else if (slope < 0 && slope > -0.03) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Sure");
      } else if (slope < 0 && slope > -0.04) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Meh.");
      } else {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Eeeeh...");
      }
    } else {
      if (slope > .05) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Go For It!");
      } else if (slope > 0.03) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Yup");
      } else if (slope > 0) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("Eeeeh...");
      } else if (slope < 0 && slope > -0.04) {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("No.");
      } else {
        d3.select('#graph svg')
          .append("text")
          .attr("x", w / 2)
          .attr("y", 350)
          .attr("text-anchor", "middle")
          .style("fill", "#2FFF4D")
          .attr("font-size", "34px")
          .text("HAHAHA...Oh You were Serious...");
      }        
    }
  };
  //d3.select('#graph svg').text('');
  if (data_url["Title"] !== undefined){
    trendLine(); 
  }
};
