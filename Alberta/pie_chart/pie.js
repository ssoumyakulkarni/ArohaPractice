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

d3.json("pie.json", function(error, sale){
if(error) throw error;

data = [];
for(a in sale.result){
    data.push(sale.result[a]);
}


data.forEach(function(d) {
    d.Amount = +d.value;
    d.Party_Name = d.key;
});


// data.forEach(function(d){
//     d.Amount = +d.Amount;
//     d.Party_Name = d.Party_Name;
// })

console.log(pie(data))
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
//.text(function(d, i) { return (data[i].Party_Name + "( " + d3.round(100* d.Amount / total, 1) + "% " + ")" ) ; });
//.text(function(d, i) { return (data[i].os + "( " + toPercent(d.value / total)+ " )" ) ; });

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

canvas1.append("text")
.attr("class","title")
.attr('x', 20)
.attr('y', -220)
.text("Share of All 4 Quaters in Total Sale.")


// var arcs = group.selectAll("arc")
//         .data(pie(data))
//         .enter()
//         .append("g")
//         .attr("class", "arc")

// arcs.append("path")
//     .attr("d", arc)
//     .attr("fill", function (d) { return color(d.data); });

// arcs.append("text")
//         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//         .attr("text-anchor", "middle")
//         .attr("font_size", "1.5em")
//         .text(function(d) { return d.data; })

