var margin = {top:20, bottom:20, left:20, right:20}
var width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var format = d3.format(".4r");


d3.json("data.json", function(data){
    data.forEach(function(d){
         d.totalsales = format(d.totalsales) 
         d.profit = format(d.profit)
         d.profit_sales_ratio = format(d.profit_sales_ratio)
    })
    
    var keys = d3.keys(data[0])

    var table = d3.select('#table').append('table')
                    .attr("style", "margin-left: 50px")
                    .style("border-collapse", "collapse")
                    .style("border", "2px black solid"),
                thead = table.append("thead"),
                tbody = table.append("tbody");

     // append the header row
    thead.append("tr")
     .selectAll("th")
     .data(keys)
     .enter()
     .append("th")
         .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        //.style("font-color", function(d){ if(d.ABC_category_profit == d.ABC_category_sales){ return 'red';} });
    var abc;
    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            abc = row;
            return keys.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
        .style("background-color", function (d, i) {
          if (abc.ABC_category_profit && abc.ABC_category_sales) {
              return "red"}})
            .html(function(d) { return d.value; });
        console.log(abc.ABC_category_profit)
})



d3.json("data1.json", function(data){

    data.forEach(function(d){
        d.letter = d.cat;
        d.frequency = d.counts; 
    });

    var margin = {top:20, bottom:20, left:20, right:20}
    var width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var radius = 150;

    var svg = d3.select("#pie1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

    svg.append("text")
        .attr("x", width/2)
        .attr("y", height/2)
        .style("text-anchor", "middle")
        .text("Sales Piechart")       

    var color = d3.scaleOrdinal(d3.schemeCategory10)

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var pie = d3.pie().sort(null)
      .value(function(d) {
        return d.frequency;
      });

    var piedata = pie(data);
    console.log(piedata)

    var arc = d3.arc()
      .innerRadius(radius - 60)
      .outerRadius(radius - 50);
      
    var outerArc = d3.arc()
	    .innerRadius(radius * .9)
	    .outerRadius(radius * .9);

    var path = g.selectAll("path")
      .data(piedata)
      .enter().append("path")
      .attr('fill', function(d){return color(d.data.counts)})
      .attr("d", arc);

    g.selectAll("text").data(piedata)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("transform", function(d){
        var pos = outerArc.centroid(d);
        pos[0] = ((radius+20) * (midAngle(d) < Math.PI ? 1 : -1));
        pos[1] -= 2;
        console.log(pos)
        return "translate("+ pos +")";
      })
      .text(function(d) {
        return d.data.letter;
      });
      

      //mouseover which shows no. of products of each fragment
    path.append("svg:title")
      .text(function(d) {
          var t = "Products";
          return d.data.counts +"  " +t});
      

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = g.selectAll("polyline")
      .data(piedata, function(d) {
        return d.data.letter
      })
      .enter()
      .append("polyline")
      .attr("points", function(d) {
        var pos = outerArc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1px");


})

//////////////////////
// PIE CHART 2
/////////////////////


d3.json("data2.json", function(data){

    data.forEach(function(d){
        d.letter = d.cat;
        d.frequency = d.counts; 
    });

    var margin = {top:20, bottom:20, left:20, right:20}
    var width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var radius = 150;

    var svg = d3.select("#pie2")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

    svg.append("text")
        .attr("x", width/2)
        .attr("y", height/2)
        .style("text-anchor", "middle")
        .text("Profit Piechart")


    var color = d3.scaleOrdinal(d3.schemeCategory10)

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var pie = d3.pie().sort(null)
      .value(function(d) {
        return d.frequency;
      });

    var piedata = pie(data);
    console.log(piedata)

    var arc = d3.arc()
      .innerRadius(radius - 60)
      .outerRadius(radius - 50);
      
    var outerArc = d3.arc()
	    .innerRadius(radius * .9)
	    .outerRadius(radius * .9);

    var path = g.selectAll("path")
      .data(piedata)
      .enter().append("path")
      .attr('fill', function(d){return color(d.data.counts)})
      .attr("d", arc);

    g.selectAll("text").data(piedata)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("transform", function(d){
        var pos = outerArc.centroid(d);
        pos[0] = ((radius+20) * (midAngle(d) < Math.PI ? 1 : -1));
        pos[1] -= 2;
        console.log(pos)
        return "translate("+ pos +")";
      })
      .text(function(d) {
        return d.data.letter;
      });

      //mouseover which shows no. of products of each fragment
      path.append("svg:title")
      .text(function(d) {
          var t = "Products";
          return d.data.counts +"  " +t});

      console.log(Math.PI)

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = g.selectAll("polyline")
      .data(piedata, function(d) {
        return d.data.letter
      })
      .enter()
      .append("polyline")
      .attr("points", function(d) {
        var pos = outerArc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1px");


})