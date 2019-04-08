function donutChart()
{
    d3.json("data.json",function(data){
        var radius=100;
        var color=d3.scale.ordinal()
        range(["red","orange","green","blue","indigo","violet"]);
   
var canvas=d3.select(".donutChart")
   .append("svg")
   .append("width",1000)
   .append("height",1000)

var group=canvas.append("g")
   .attr("transform","tanslate(500,350)");

var arc=d3.svg.arc()
    .innerRadius(150)
    .outerRadius(radius);

 var pie=d3.slayout.pie()
    .value(function(d){
        return d.Amount;
    });
 var theArc=group.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class","arc");

 theArc.append("path")
    .attr("d",arc)
    .attr("fill",function(d){
        return color(d.data.Amount);
    });

 theArc.append("text")
    .attr("transform",function(d){
        return "translate("+arc.centroid(d)+")";
    })
    .attr("dy","0.15em")
    .text(function (d){
        return d.data.Party_Name
    });
   
    })
}

