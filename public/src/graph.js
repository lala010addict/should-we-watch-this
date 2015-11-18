//Used This Example as a resource below --> http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
//Also this: --> http://codepen.io/Siddharth11/pen/YPMWeE

//Need Width, Height, Padding, Based on Object 
//(Would like to use percentages for dynamic sizing based on browser)
var w = 800;
var h = 400;
var padding = 25;
//We don't know where this will be yet, needs to change.
var data_url = {"Title":"Game of Thrones","Season":"1","Episodes":[{"Title":"Winter Is Coming","Released":"2011-04-17","Episode":"1","imdbRating":"8.1","imdbID":"tt1480055"},{"Title":"The Kingsroad","Released":"2011-04-24","Episode":"2","imdbRating":"7.8","imdbID":"tt1668746"},{"Title":"Lord Snow","Released":"2011-05-01","Episode":"3","imdbRating":"7.6","imdbID":"tt1829962"},{"Title":"Cripples, Bastards, and Broken Things","Released":"2011-05-08","Episode":"4","imdbRating":"7.7","imdbID":"tt1829963"},{"Title":"The Wolf and the Lion","Released":"2011-05-15","Episode":"5","imdbRating":"8.0","imdbID":"tt1829964"},{"Title":"A Golden Crown","Released":"2011-05-22","Episode":"6","imdbRating":"8.1","imdbID":"tt1837862"},{"Title":"You Win or You Die","Released":"2011-05-29","Episode":"7","imdbRating":"8.2","imdbID":"tt1837863"},{"Title":"The Pointy End","Released":"2011-06-05","Episode":"8","imdbRating":"7.9","imdbID":"tt1837864"},{"Title":"Baelor","Released":"2011-06-12","Episode":"9","imdbRating":"8.6","imdbID":"tt1851398"},{"Title":"Fire and Blood","Released":"2011-06-19","Episode":"10","imdbRating":"8.4","imdbID":"tt1851397"}],"Response":"True"};
var dataset = [];

//Define Graph Space, Initialize d3 (This sets how big the div is)
var svg = d3.select('#graph')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

//This iterates over the data_url to input the data as points into the graph.
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
  if(key === "Episodes"){
    var episodes = data_url["Episodes"];
   each(episodes, function(element, key){
    var set = episodes[key];
    var temp = [];
    each(set,function(element, key){
      if(temp.length === 2){
        dataset.push(temp);
      }
      if(key === "Episode"){
        var a = parseInt(set[key]);
        temp.push(a);
      }
      if(key === "imdbRating"){
        var b = parseFloat(set[key]);
        temp.push(b);
      }
    });
  });  
  }
});

//Define Grid (inside), Initialize Scale and Axes of Graph (Using "g" element, tutorial here --> http://tutorials.jenkov.com/svg/g-element.html)
/*x scale*/
var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {
        return d[0];
    })])
    .range([padding, w - padding]);
/*y scale*/
var yScale = d3.scale.linear()
    .domain([0, 10])
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
          'd': lines(dataset),
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
        .data(dataset)
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





//Array.apply(null, Array(20/*placeholder*/)).map(function (_, i) {return i;})

// //Define Grid (inside), Initialize Scale and Axes of Graph
// var x = d3.scale.linear().domain([0,20]).range([0, w]),
//     y = d3.scale.linear().domain([0, 9]).range([0, h]);

// var xAxis = d3.svg.axis().scale(x).orient("bottom")
//             .ticks(8/*placeholder*//*the total episode length - 1*/)
//             .tickFormat(function (d){
//               return [0,1,2,3,4,5,6,7,8,9,10][d];
//             }),
//     yAxis = d3.svg.axis().scale(y).orient("left")
//             .ticks(10)
//             .tickFormat(function (d){
//               return [0,1,2,3,4,5,6,7,8,9,10][d];
//             });
            
// //Array.apply(null, Array(20/*placeholder*/)).map(function (_, i) {return i;})
// //Draw Graph (Using "g" element, tutorial here --> http://tutorials.jenkov.com/svg/g-element.html)
// svg.append("g")
//    .attr('transform', 'translate(0, '+(h-pad)+")")
//    .call(xAxis);

// svg.append("g")
//    .attr('transform', 'translate(0, '+(h-pad)+")")
//    .call(yAxis);

// svg.append("text")
//     .text("Loading ...")
//     .attr("x", function () { return w/2; })
//     .attr("y", function () { return h/2-5; });












