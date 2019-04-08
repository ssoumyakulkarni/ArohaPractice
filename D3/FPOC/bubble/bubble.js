var width = 400;
var height = 400;

// var svg = d3.select("g")
//         .attr("transform", "translate("+ width/2+", "+height/2+")")

var svg = d3.select("#chart")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0, 0)")


var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);



d3.json("product.json", function(sale){

    data = [];
    for(a in sale.result){
        data.push(sale.result[a]);
    }
    

    data.forEach(function(d) {
        d.Amount = +d.value;
        d.Party_Name = d.key;
    });

    console.log(data)

    var color = d3.scaleOrdinal()
            .domain(data.map(function(d){ return d.Party_Name;}))
            .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
            '#ffe9a8','#b9bfe3','#fddaec','#cccccc']);


    var radiusScale = d3.scaleSqrt().domain(d3.extent(data, function(d) { return d.Amount; }))
                                    .range([10, 80])

    data1 = d3.extent(data, function(d) { return d.Amount; });
    //console.log(data1)
    
    var simulation = d3.forceSimulation()
                        .force("x", d3.forceX(width/2).strength(0.05))
                        .force("y", d3.forceY(height/2).strength(0.05))
                        .force("collide", d3.forceCollide(function(d) {
                                return radiusScale(d.Amount)+1;
                                    }))

    var number = d3.format(".2s")

    var circles = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("r", function(d){return radiusScale(d.Amount)})
                    .attr("fill", function(d){return color(d.Party_Name)})
                    .on("mouseover", function(d, i) {
                        d3.select(this).attr("r", radiusScale(d3.max(data1))+20);
                        svg.append("text")
                            .attr("id", "ctext" + i)
                            .attr("x",  function() {return d.x})
                            .attr("y",  function() {return d.y})
                            .text(function(){return d.Party_Name+" : "+number(d.Amount)})
                            .attr("fill",  "black")
                            .style("text-anchor", "middle");
                            		
                        // div.transition()		
                        //     .duration(200)		
                        //     .style("opacity", .9);		
                        // div	.html(d.Party_Name + "<br/>"  + d.Amount)	
                        //     .style("left", (d3.event.pageX) + "px")		
                        //     .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d, i) {	
                        d3.select(this).attr("r", function(){return radiusScale(d.Amount)})
                        d3.select("#ctext" + i).remove();	
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    });

            svg.append('text')
                    .attr("class", "title")
                    .attr('y', 20)
                    .attr('x', width/2)
                    .text('All 4 Quaters Sales')

    

    simulation.nodes(data)
            .on('tick', ticked)

    function ticked(){
        circles
        .attr("cx", function(d){return d.x})
        .attr("cy", function(d){return d.y})
    }
})