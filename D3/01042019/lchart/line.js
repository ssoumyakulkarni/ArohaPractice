// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 220, left: 50},
width = 960 - margin.left - margin.right,
height = 520 - margin.top - margin.bottom;

// parse the date / time
//var parseTime = d3.timeParse("%d-%b-%y");
// set the ranges
// var x = d3.scaleTime().range([0, width]);
//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var x = d3.scaleBand().range([50, 750]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
.x(function(d) { return x(d.Party_Name); })
.y(function(d) { return y(d.Amount); });



var div = d3.select("body").append("div")   
.attr("class", "tooltip")               
.style("opacity", 0);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("class","text")
    .attr('x', width/2)
    .attr('y', 5)
    .text("Sales chart")

    // Get the data
d3.json("myjson.json", function(error, data) {
if (error) throw error;

// format the data
data.forEach(function(d) {
//d.date = parseTime(d.date);
d.Party_Name = d.Party_Name
d.Amount = +d.Amount;
});

// Scale the range of the data
//x.domain(d3.extent(data, function(d) { return d.Party_Name; }));
x.domain(data.map(function(d) { return d.Party_Name; }));
y.domain([0, d3.max(data, function(d) { return d.Amount; })]);

// Add the valueline path.
svg.append("path")
.data([data])
.attr("class", "line")
.attr("d", valueline);

// Add the X Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")	
   // .attr("class", "xaxisB")
    .attr("transform", "rotate(-90)")
                 .style("text-anchor", "end")
                 .attr("dx", "-.8em")
                 .style("font-size","13px")
                 .attr("dy", "-.15em")
                 .style("font-family","sans-serif");
                

// Add the Y Axis
svg.append("g")
.call(d3.axisLeft(y))
.attr("transform", "translate("+ margin.left +", 0)");




   // Add the scatterplot
   svg.selectAll("dot")
   .data(data)
 .enter().append("circle")
   .attr("r", 3.5)
   .attr("cx", function(d) { return x(d.Party_Name); })
   .attr("cy", function(d) { return y(d.Amount); })
   .on("mouseover", function(d) {      
    div.transition()        
        .duration(200)      
        .style("opacity", .9);      
    div .html(d.Party_Name + "<br/>"  + d.Amount)   
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY - 28) + "px");    
    })                  
.on("mouseout", function(d) {       
    div.transition()        
        .duration(500)      
        .style("opacity", 0);   
});













});
