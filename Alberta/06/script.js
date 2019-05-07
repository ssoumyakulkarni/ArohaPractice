d3.json('data.json', function (error,data) {

    function tabulate(data, columns) {
          var table = d3.select('body').append('table')
          var thead = table.append('thead')
          var	tbody = table.append('tbody');
  
          // append the header row
          thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
              .text(function (column) { return column; });
  
          // create a row for each object in the data
          var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');
  
          // create a cell in each row for each column
          var cells = rows.selectAll('td')
            .data(function (row) {
              return columns.map(function (column) {
                return {column: column, value: row[column]};
              });
            })
            .enter()
            .append('td')
              .text(function (d) { return d.value; });
  
        return table;
      }
  
      // render the table(s)
      tabulate(data, ['vitemname', 'totalsales','ABC_category_sales','profit','ABC_category_profit']); // 2 column table
   
  });


//pie1 code
var margin = {top: 50, right: 20, bottom: 20, left: 20},
width = 800- margin.left - margin.right,
height = 600 - margin.top - margin.bottom,
radius = 200;

var canvas1 = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 200 +", " + height/2 + ")");
    
var color = d3.scaleOrdinal()
        .range(['#47d147', '#1a75ff', '#e64d00', '#ff9900', '#F0F8FF', '#E6E6FA', '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#00BFFF', '#B0C4DE', '#1E90FF', '#6495ED', '#4682B4']);

var arc = d3.arc()
    .innerRadius(radius-10)
    .outerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50); 

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Amount; })

d3.json("pie1.json", function(error, sale){
if(error) throw error;

data = [];
for(a in sale.result){
    data.push(sale.result[a]);
}


data.forEach(function(d) {
    d.Amount = +d.counts;
    d.Party_Name = d.cat;
});

var g = canvas1.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

var number = d3.format(".2s")

g.append("path")
    .attr("d", arc)
    .style("fill", function(d) {return color(d.data.Party_Name)})
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween("d", pietween)

g.append("svg:title")
    .text(function(d) {
        var t = "Total Purchase";
        return t +" : " +number(d.data.Amount)});

var total= d3.sum(data, function(d){return d.Amount;});
console.log(total)
var toPercent = d3.format("0.1%");

g.append("text")
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("transform", function(d){ return "translate(" + labelArc.centroid(d) + ")"})
    .attr("dy", ".35em")
    .text(function(d, i) {
        var a = toPercent(d.data.Amount/total);
        var b = a.toString(); 
        return (b); });
    

var legends=g.append("g").attr("transform","translate(500,100)")
    .selectAll(".legends").data(data);
   var legend= legends.enter().append("g").classed("legends",true)
   .attr("transform",function(d,i){
       return "translate(-180, -180)";
   });
legend.append("rect").attr("width",15).attr("height",15).attr("fill",function(d){
       return color(d.Party_Name);})
       .attr("x",-50)
       .attr("y", function(d, i) {return i*20+1;});

legend.append("text").classed("label",true).text(function(d){
       return d.Party_Name;
   })
   .attr("fill",function(d){
       return color(d.Party_Name);})
       .attr("x",0)
       .attr("y", function(d, i) {return i*20+14;})
       .style("font-size", "15px");

})

function pietween(b){
b.innerRadius = 0;
var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
return function(t){return arc(i(t))}
}





//pie2



//pie2 code
var margin = {top: 50, right: 20, bottom: 20, left: 20},
width = 800- margin.left - margin.right,
height = 600 - margin.top - margin.bottom,
radius = 200;

var canvas2 = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 200 +", " + height/2 + ")");
    
var color = d3.scaleOrdinal()
        .range(['#47d147', '#1a75ff', '#e64d00', '#ff9900', '#F0F8FF', '#E6E6FA', '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#00BFFF', '#B0C4DE', '#1E90FF', '#6495ED', '#4682B4']);

var arc = d3.arc()
    .innerRadius(radius-10)
    .outerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50); 

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Amount; })

d3.json("pie2.json", function(error, sale){
if(error) throw error;

data = [];
for(a in sale.result){
    data.push(sale.result[a]);
}


data.forEach(function(d) {
    d.Amount = +d.counts;
    d.Party_Name = d.cat;
});

var g = canvas2.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

var number = d3.format(".2s")

g.append("path")
    .attr("d", arc)
    .style("fill", function(d) {return color(d.data.Party_Name)})
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween("d", pietween)

g.append("svg:title")
    .text(function(d) {
        var t = "Total Purchase";
        return t +" : " +number(d.data.Amount)});

var total= d3.sum(data, function(d){return d.Amount;});
console.log(total)
var toPercent = d3.format("0.1%");

g.append("text")
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("transform", function(d){ return "translate(" + labelArc.centroid(d) + ")"})
    .attr("dy", ".35em")
    .text(function(d, i) {
        var a = toPercent(d.data.Amount/total);
        var b = a.toString(); 
        return (b); });
    

var legends=g.append("g").attr("transform","translate(500,100)")
    .selectAll(".legends").data(data);
   var legend= legends.enter().append("g").classed("legends",true)
   .attr("transform",function(d,i){
       return "translate(-180, -180)";
   });
legend.append("rect").attr("width",15).attr("height",15).attr("fill",function(d){
       return color(d.Party_Name);})
       .attr("x",-50)
       .attr("y", function(d, i) {return i*20+1;});

legend.append("text").classed("label",true).text(function(d){
       return d.Party_Name;
   })
   .attr("fill",function(d){
       return color(d.Party_Name);})
       .attr("x",0)
       .attr("y", function(d, i) {return i*20+14;})
       .style("font-size", "15px");

})

function pietween(b){
b.innerRadius = 0;
var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
return function(t){return arc(i(t))}
}


