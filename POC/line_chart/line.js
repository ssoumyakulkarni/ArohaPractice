// set the dimensions and margins of the graph
var margin = {top: 50, right: 20, bottom: 50, left: 80},
width = 700 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// parse the date / time
//var parseTime = d3.timeParse("%d-%b-%y");
var parseDate = d3.timeParse("%B-%Y");
//console.log(parseDate("August-2019"))
//var formatDate = d3.timeParse("%b-Y%");
// set the ranges
var x = d3.scaleTime().range([0, width]);
//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
//var x = d3.scaleBand().range([50, 750]);
var y = d3.scaleLinear().range([height, 0]);


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
.attr("transform", "translate("+ margin.left +"," + margin.top + ")");

    svg.append("text")
    .attr("class","title")
    .attr('x', width/2)
    .attr('y', -20)
    .text("Sales chart")

    // Get the data
d3.json("line.json", function(error, sale) {
    if (error) throw error;

    data = [];
    for(a in sale.result){
        data.push(sale.result[a])
    }

    // format the data
    data.forEach(function(d) {
    d.key = parseDate(d.key);
    //console.log(d.key)
    //d.key = d.key
    d.value = +d.value;
    });

    function sortByDateAscending(a, b) {
        // Dates will be cast to numbers automagically:
        return a.key - b.key;
    }
    
    data = data.sort(sortByDateAscending);

    console.log(data)


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.key; }));
    console.log(d3.extent(data, function(d) { return d.key; }))
    //x.domain(data.map(function(d) { return d.key; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.key); })
        .y(function(d) { return y(d.value); });


    // Add the valueline path.
    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", valueline);


    const xaxistickformat = number =>
                                d3.format('.3s')(number);

    // Add the X Axis
    var xaxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %y")).ticks(11))
    var xaxis1 = xaxis.selectAll("text")  
        .attr("transform", "rotate(-45)")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .style("font-size","13px")
                    .attr("dy", "-.15em")
                    .style("font-family","sans-serif");

    var xaxis2 = xaxis1.append('text')
            .attr("class", "axis-label")
            .attr('y', 100)
            .attr('x', 100)
            .attr("fill", "black")
            .text('Months')
                    

    // Add the Y Axis
    var yaxis = svg.append("g")
                    .call(d3.axisLeft(y).tickFormat(xaxistickformat))
                    .attr("transform", "translate(0, 0)");
    yaxis.selectAll('.tick line')
                    .remove()

    yaxis.append('text')
            .attr("class", "Yaxis-label")
            .attr('y', -50)
            .attr('x', -150)
            .attr("fill", "black")
            .attr("transform", "rotate(-90)")
            .text('Amount In Millions');



    var formatTime = d3.timeFormat("%B %Y")

    var number = d3.format(".3s")
    // Add the scatterplot
    svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.key); })
    .attr("cy", function(d) { return y(d.value); })
    .on("mouseover", function(d) {   
        d3.select(this).attr("r", 6)
                        .attr("fill", "orange")   
        div.transition()        
            .duration(200)      
            .style("opacity", .9);      
        div .html(formatTime(d.key) + "<br/>"  + number(d.value))   
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        })                  
    .on("mouseout", function(d) {  
        d3.select(this).attr("r", 3.5)
        .attr("fill", "black")    
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });













});