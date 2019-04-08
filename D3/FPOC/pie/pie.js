
        var width=850,height=500;
        // var colors=d3.scaleOrdinal(d3.category20c())
        var colors = d3.scaleOrdinal(d3.schemeCategory10);
           var  svg=d3.select("body").append("svg")
           .attr("width",width).attr("height",height)
           .style("background","")




d3.json("pie.json", function(error,quater){
    if (error) throw error;  

    var data=d3.pie()
    .sort(null)
    .value(function(d){return d.value;})
   // (result)
    data = [];
    for(a in quater.result){
        data.push(quater.result[a]);
    }
    data.forEach(function(d) {
        d.value = +d.value;
        d.key = d.key;
    });

    console.log(data)


          
//  var data=d3.pie().sort(null).value(function(d){return d.value;})
//    //(data);
//    console.log(data);
   var segments=d3.arc()
       .innerRadius(0)
       .outerRadius(200)
       .padAngle(.05)
       .padRadius(50);
       var sections=svg.append("g").attr("transform","translate(250,250)")
       .selectAll("path").data(data);
       sections.enter().append("path").attr("d",segments).attr("fill",function(d){
           return colors(d.data.value)});
        var content=d3.select("g").selectAll("text").data(data);
           content.enter().append("text").each(function(d){
               var center=segments.centroid(d);
               d3.select(this).attr("x",center[0]).attr("y",center[1])
              // .text(d.data.Amount) 
               .style("text-anchor", "middle")
              .attr("transform", "rotate(-10)");
           });
   
            var legends=svg.append("g").attr("transform","translate(500,100)")
               .selectAll(".legends").data(data);
              var legend= legends.enter().append("g").classed("legends",true)
              .attr("transform",function(d,i){
                  return "trnaslate(0,"+(i+1)*30+")";
              });
              legend.append("rect").attr("width",15).attr("height",15).attr("fill",function(d){
                  return colors(d.data.value);})
                  .attr("x",0)
                  .attr("y", function(d, i) {return i*20+1;});
   
              legend.append("text").classed("label",true).text(function(d){
                  return d.data.key;
              })
              .attr("fill",function(d){
                  return colors(d.data.value);})
                  .attr("x",20)

                  .attr("y", function(d, i) {return i*20+14;})
                  .style("font-size", "15px");
              
              
   
              });    