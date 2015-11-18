//Used This Example as a resource below --> http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
//Need Width, Height, Padding, Based on Object 
//(Would like to use percentages for dynamic sizing based on browser)
var w = 900;
var h = 300;
var pad = 10;
//We don't know where this will be yet, needs to change.
var Data_url = '/data.json';

//Define Graph Space, Initialize d3 (This sets how big the div is)
var svg = d3.select('#graph')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

//Define Grid (inside), Initialize Scale and Axes of Graph
var x = d3.scale.linear().domain([0,20]).range([0, w]),
    y = d3.scale.linear().domain([0, 9]).range([0, h]);

var xAxis = d3.svg.axis().scale(x).orient("bottom")
            .ticks(8/*placeholder*//*the total episode length - 1*/)
            .tickFormat(function (d){
              return [0,1,2,3,4,5,6,7,8,9,10][d];
            }),
    yAxis = d3.svg.axis().scale(y).orient("left")
            .ticks(10)
            .tickFormat(function (d){
              return [0,1,2,3,4,5,6,7,8,9,10][d];
            });
//Array.apply(null, Array(20/*placeholder*/)).map(function (_, i) {return i;})
//Draw Graph (Using "g" element, tutorial here --> http://tutorials.jenkov.com/svg/g-element.html)
svg.append("g")
   .attr('transform', 'translate(0, '+(h-pad)+")")
   .call(xAxis);

svg.append("g")
   .attr('transform', 'translate(0, '+(h-pad)+")")
   .call(yAxis);

svg.append("text")
    .text("Loading ...")
    .attr("x", function () { return w/2; })
    .attr("y", function () { return h/2-5; });












