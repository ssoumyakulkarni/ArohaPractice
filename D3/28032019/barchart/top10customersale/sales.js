var margin = {top: 40, right: 40, bottom: 220, left: 110},
width = 750 - margin.left - margin.right,
height = 530 - margin.top - margin.bottom;



var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);
var colorScale = d3.scale.category10();


var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");
//.tickFormat()


var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.tickFormat(d3.format('.3s'));

var svg = d3.select("body").append("svg")

 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)


.append("g")
.attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");

d3.json("sales.json", function(error, data) {

    data.forEach(function(d) {
        d.Amount = +d.Amount;
        d.Party_Name = d.Party_Name;
    });
    console.log(d3.max(data, function(d) { return d.Amount; }))
    
x.domain(data.map(function(d) { return d.Party_Name; }));
y.domain([0, d3.max(data, function(d) { return d.Amount; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-60)" );

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value ($)");

svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d) { return x(d.Party_Name); })
    .attr("width", x.rangeBand()-7)
    .attr("y", function(d) { return y(d.Amount); })
    .attr("height", function(d) { return height - y(d.Amount); });

});
