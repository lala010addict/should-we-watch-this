//Used This Example as a resource below --> http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
//Also this: --> http://codepen.io/Siddharth11/pen/YPMWeE

//Need Width, Height, Padding, Based on Object 
//(Would like to use percentages for dynamic sizing based on browser)
var w = 800;
var h = 400;
var padding = 25;
//We don't know where this will be yet, needs to change.
var data_url = [{"Title":"Game of Thrones","Season":"1","Episodes":[{"Title":"Winter Is Coming","Released":"2011-04-17","Episode":"1","imdbRating":"8.1","imdbID":"tt1480055"},{"Title":"The Kingsroad","Released":"2011-04-24","Episode":"2","imdbRating":"7.8","imdbID":"tt1668746"},{"Title":"Lord Snow","Released":"2011-05-01","Episode":"3","imdbRating":"7.6","imdbID":"tt1829962"},{"Title":"Cripples, Bastards, and Broken Things","Released":"2011-05-08","Episode":"4","imdbRating":"7.7","imdbID":"tt1829963"},{"Title":"The Wolf and the Lion","Released":"2011-05-15","Episode":"5","imdbRating":"8.0","imdbID":"tt1829964"},{"Title":"A Golden Crown","Released":"2011-05-22","Episode":"6","imdbRating":"8.1","imdbID":"tt1837862"},{"Title":"You Win or You Die","Released":"2011-05-29","Episode":"7","imdbRating":"8.2","imdbID":"tt1837863"},{"Title":"The Pointy End","Released":"2011-06-05","Episode":"8","imdbRating":"7.9","imdbID":"tt1837864"},{"Title":"Baelor","Released":"2011-06-12","Episode":"9","imdbRating":"8.6","imdbID":"tt1851398"},{"Title":"Fire and Blood","Released":"2011-06-19","Episode":"10","imdbRating":"8.4","imdbID":"tt1851397"}],"Response":"True"},{"Title":"Game of Thrones","Season":"2","Episodes":[{"Title":"Winter Is Coming","Released":"2011-04-17","Episode":"1","imdbRating":"8.5","imdbID":"tt1480055"},{"Title":"The Kingsroad","Released":"2011-04-24","Episode":"2","imdbRating":"8.8","imdbID":"tt1668746"},{"Title":"Lord Snow","Released":"2011-05-01","Episode":"3","imdbRating":"8.6","imdbID":"tt1829962"},{"Title":"Cripples, Bastards, and Broken Things","Released":"2011-05-08","Episode":"4","imdbRating":"8.7","imdbID":"tt1829963"},{"Title":"The Wolf and the Lion","Released":"2011-05-15","Episode":"5","imdbRating":"9.0","imdbID":"tt1829964"},{"Title":"A Golden Crown","Released":"2011-05-22","Episode":"6","imdbRating":"9.1","imdbID":"tt1837862"},{"Title":"You Win or You Die","Released":"2011-05-29","Episode":"7","imdbRating":"9.2","imdbID":"tt1837863"},{"Title":"The Pointy End","Released":"2011-06-05","Episode":"8","imdbRating":"8.9","imdbID":"tt1837864"},{"Title":"Baelor","Released":"2011-06-12","Episode":"9","imdbRating":"8.6","imdbID":"tt1851398"},{"Title":"Fire and Blood","Released":"2011-06-19","Episode":"10","imdbRating":"9.4","imdbID":"tt1851397"}],"Response":"True"}];
var episodedataset = [];
var ratingdataset = [];
var infoset = [];
var title = [];

//This iterates over the data_url to input the Episode Rating Data as points into the graph.
var each = function(input, callback){
  if(input.constructor === Object){
    for(var key in input){
      callback(input[key], key, input);
    }
  }else{
    for(var i = 0; i < input.length; i++){
      callback(input[i], i, input);
    }
  }
};

each(data_url, function(element, key){
  each(element, function(item, key){
    if(key === "Title"){
        title.push(element[key]);
      }
  });
});
//Function for filling up the info dataset

each(data_url, function(item, index){
    each(item, function(element, key){
  if(key === "Episodes"){
    var episodes = item["Episodes"];
    each(episodes, function(element, key){
    var set = episodes[key];
    var temp = [];
    each(set,function(element, key){
      if(temp.length === 2){
        infoset.push(temp);
      }
      if(key === "Title"){
        temp.push(set[key]);
      }
      if(key === "imdbRating"){
        var a = parseFloat(set[key]);
        temp.push(a);
      }
    });
  });  
  }
});
});

var epCount = 1;
//Function for filling up the episode dataset
each(data_url, function(item, index){
    each(item, function(element, key){
    if(key === "Episodes"){
      var episodes = item["Episodes"];
     each(episodes, function(element, key){
      var set = episodes[key];
      var temp = [];
      each(set,function(element, key){
        if(temp.length === 2){
          episodedataset.push(temp);
        }
        if(key === "Episode"){
          var a = epCount;
          epCount++;
          temp.push(a);
        }
        if(key === "imdbRating"){
          var b = parseFloat(set[key]);
          temp.push(b);
          ratingdataset.push(b);
        }
      });
    });  
    }
  });
});

var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
var len = episodedataset.length;
each(episodedataset, function(item, index){
  x1 += item[0];
});
each(episodedataset, function(item, index){
  y1 += item[1];
});
each(episodedataset, function(item, index){
  x2 += (item[0] * item[1]);
});
each(episodedataset, function(item, index){
  y2 += (item[0] * item[0]);
});
var slope = (((len*x2) - (x1*y1))/((len*y2)-(x1*x1)))
var intercept = ((y1 -(slope*x1))/len)

var xLabels = episodedataset.map(function (d) { return d[0]; });
var xSeries = d3.range(1, xLabels.length + 1);
var ySeries = episodedataset.map(function(d) { return d[1]; });
var a1 = xLabels[0];
var b1 = slope + intercept;
var a2 = xLabels[xLabels.length - 1];
var b2 = slope * xSeries.length + intercept;
var trendData = [[a1,b1,a2,b2]];
console.log(slope);
//This reveals data when you mouse over nodes.
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Title:</strong> <span style='color:#2FFF4D'>" + d[0] + "</span>" + "<br>" + "<strong>Rating:</strong> <span style='color:#2FFF4D'>" + d[1] + "</span>";
  })

//Define Graph Space, Initialize d3 (This sets how big the div is)
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
/*y scale*///based on rating data set
ratingdataset.sort();
var yScale = d3.scale.linear()
    .domain([ratingdataset[0] - 0.2, ratingdataset[ratingdataset.length-1] + 0.1])
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
        .attr("x", w-35)
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
  .attr("x", w/2)             
  .attr("y", 14)
  .attr("text-anchor", "middle") 
  .style("fill", "#2FFF4D")
  .text(title[0]);


function trendLine(){
  var trendLine = svg.select()
  var trendline = svg.selectAll(".trendline")
      .data(trendData);
      
    trendline.enter()
      .append("line")
      .attr("class", "trendline")
      .attr("x1", function(d) { return xScale(d[0]); })
      .attr("y1", function(d) { return yScale(d[1]); })
      .attr("x2", function(d) { return xScale(d[2]); })
      .attr("y2", function(d) { return yScale(d[3]); })
      .style("stroke", "rgb(47,255,77)")  
}
 

svg.selectAll('circle').data(infoset).on('mouseover', tip.show).on('mouseout', tip.hide)
function shouldI (){
  var avg = y1 / len;
  if (avg >= 7){
    if(slope > .05){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("YES!");
    }
    else if(slope < 0 && slope > -0.03){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Sure");
    }
    else if(slope < 0 && slope > -0.04){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Meh.");
    }
    else {
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Eeeeh...");
    }
  }
  else {
    if(slope > .05){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Go For It!");
    }
  else if(slope > 0.03){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Yup");
    }
  else if(slope > 0){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("Eeeeh...");
    }
  else if(slope < 0 && slope > -0.04){
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("No.");
    }
  else {
    d3.select('#graph svg')
    .append("text")
    .attr("x", w/2)             
    .attr("y", 350)
    .attr("text-anchor", "middle") 
    .style("fill", "#2FFF4D")
    .attr("font-size", "34px")
    .text("HAHAHA...Oh You were Serious...");
    }
  }
};

var interval = (len * 100) + 1400 
setTimeout(trendLine, interval);
setTimeout(shouldI, interval+1000);

