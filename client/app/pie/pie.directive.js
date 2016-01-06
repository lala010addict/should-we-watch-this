'use strict';

var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius,
    padding = 25,
    data_url = false,
    epId = 1,
    showName = '',
    seasonAvg = [],
    ratingScale = [],
    seasonColor = [];


angular.module('tvshowAppApp')
  .directive('pie', ['$parse', '$window', function($parse, $window) {
    return {
        restrict: 'EA',
        template: '<section class="pie"><div id="pie"></div></section>',
        link: function(scope, elem, attrs) {
            scope.$watchCollection('pie', function(newVal, oldVal) {
                data_url = newVal || false;
                if (data_url !== false) {
                    epId = 1;
                    seasonAvg = [];
                    showName = data_url['Title'];
                    ratingScale = [];
                    drawPie();
                }
            });
        }
    };
}]);
var generateRandomColor = function() {
	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}
var drawPie = function() {
    //clear datasets if new show changed

    // All purpose each function
    var each = function(collection, iterator) {
        // works for arrays
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                iterator(collection[i], i, collection);
            }
        } else {
          for(var key in collection){
            iterator(collection[key], key, collection);
          }
        }
    };


    //Function for filling up the info dataset
    //Function for filling up the episode dataset
    //iterate over episodes and add data to d3 datasets
    var allSeasons = data_url || {};
    each(allSeasons, function(seasonData) {
    		var season = seasonData[0];
        var seasonTotal = 0;
        var episodeNumber = 0;
        var showTitle = season["Title"];
        var seasonNum = parseInt(season["Season"]);
        var episodes = season["Episodes"];
        each(episodes, function(episode) {
            if (episode["imdbRating"] !== "N/A") {
                var episoderating = Number(episode["imdbRating"]);
                if (typeof episoderating === 'number') {
                    seasonTotal += episoderating;
                }
                episodeNumber ++;
            }
        })
        if (seasonTotal !== 0) {
            var seasonAvgRating = Math.round((seasonTotal / episodeNumber)*100)/100;
            seasonAvg.push([showTitle, seasonNum, seasonAvgRating, false, seasonData[1]])
            ratingScale.push(seasonAvgRating)
        };
    });
    var scale = function(ratings) {
    	var minRating;
    	var maxRating;
    	for (var i = 0; i < ratings.length; i++) {
    		if (minRating === undefined) {
    			minRating = ratings[i];
    		}
    		if (maxRating === undefined) {
    			maxRating = ratings[i];
    		}
    		if (ratings[i] < minRating) {
    			minRating = ratings[i];
    		} else if (ratings[i] > maxRating) {
    			maxRating = ratings[i];
    		}
    	}
	    minRating -= 0.5;
	    maxRating += 0.5;
	    var difference = maxRating - minRating;
	    each(seasonAvg, function(array) {
	    	array[3] = ((array[2] - minRating) / difference);
	    });
	  }
    scale(ratingScale);
    var avgScore = function() {
        var totalScore = 0;
        var numberofSeasons = 0;
        each(seasonAvg, function(season) {
            totalScore += season[2];
            numberofSeasons ++; 
        });
        return Math.round((totalScore/numberofSeasons)*100)/100;
    };
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d[3]; });
    
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) { 
            return (radius - innerRadius) * (d.data[3]) + innerRadius; 
            });

    var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Title:</strong> <span style='color:"+ d.data[4] +"'>" + d.data[0] + "</span>" + "<br>" + "<strong>Season:</strong> <span style='color:"+ d.data[4] +"'>" + d.data[1] + "</span>" + "<br>" + "<strong>Rating</strong> <span style='color:"+ d.data[4] +"'>" + d.data[2] + "</span>";
        });
    // $('#pie').remove();

    var svgPie = d3.select('#pie')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svgPie.call(tip);

		d3.select('#pie svg')
		    .append("text")
		    .attr("x", width / 2)
		    .attr("y", 12)
		    .attr("text-anchor", "middle")
		    .style("fill", "rgba(88, 84, 142, 0.61)")
		    .attr("font-size", "15px")
		    .text("Overall Rating by Season(s)");

    // var outerPath = svgPie.selectAll(".outlineArc")
    //     .data(pie(seasonAvg))
    //     .enter().append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "gray")
    //     .attr("class", "outlineArc")
    //     .attr("d", outlineArc);

    var path = svgPie.selectAll(".solidArc")
        .data(pie(seasonAvg))
        .enter().append("path")
        .attr("fill", function(d) { return d.data[4]})
        .attr("class", "solidArc")
        .attr("stroke", "rgba(44, 65, 167, 0.14)")
        .attr("d", arc) 
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .style('stroke-width', 2); 
    // calculate the weighted mean score
    var score = avgScore() || "Hello";
    if (score !== 'Hello') {
        svgPie.append("svg:text")
        		.attr("fill", function(d) { return "#B6839E"})
            .attr("class", "aster-score")
               .attr("font-size", "20px")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(score);
    }
};
