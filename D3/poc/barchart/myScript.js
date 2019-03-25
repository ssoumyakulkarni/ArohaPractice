var salesData=
    [{
        Party_Name: "Adisseo Asia Pacific Pte Ltd",
        Amount: "57487266.00"
    
    },
    {
        Party_Name: "Kavi Protein And Feed Pvt Ltd",
        Amount: "56656610.04"
    
    },
    {
        Party_Name: "The Himalaya Drug Company",  
        Amount: "20393334.37"
    
    },
    
    {
        Party_Name: "Pioneer Jellice India (P) Ltd-Scr",
        Amount: "16979000.00"
    
    },
    {
        Party_Name: "Virbac Animal Health India Pvt Ltd",
        Amount: "14224912.36"
    
    },
    {
        Party_Name: "Intervet India Pvt Ltd",
        Amount: "13921982.55"
    
    },
    {
        Party_Name: "Ventri Biologicals Ltd",
        Amount: "13484092.92"
    
    },
    {
        Party_Name: "Elanco India Pvt Ltd",
        Amount: "13430796.15"
    
    },
    {
        Party_Name: "Jubilant Life Sciences Limited",
        Amount: "11669350.00"
    
    },
    {
        Party_Name: "Care Cure",
        Amount: "11649393.90"
    
    }
    ]


    /* var svg=d3.select("#svg");

    var padding={top:120,right:130,bottom:130,left:150};
 */
    /* var chartArea={
        "width":parseInt(svg.style("width"))-padding.left-padding.right,
        "height":parseInt(svg.style("height"))-padding.top-padding.bottom
    };
     var yScale=d3.scaleLinear()
     .domain(salesData.map(function(d){
          //console.log("val" + d.Amount)
          return d.Amount
        }))
    .range([chartArea.height,0]).nice();


    var xScale=d3.scaleBand()
    .domain(salesData.map(function(d){return d.Party_Name}))
    .range([0,chartArea.width])
    */

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(width / dataset.length); })
    .y(function(d) { return y(d.Amount); });



    /* var xAxis=svg.append("g")
    .classed("xAxis",true)
    .attr(
        'transform','translate('+padding.left+','+(chartArea.height+padding.top)+')'
    )
    .call(d3.axisBottom(xScale));

    var yAxisFn=d3.axisLeft(yScale);
    var yAxis=svg.append("g")
    .classed("yAxis",true)
    .attr(
        'transform','translate('+padding.left+','+padding.top+')'
    );
    yAxisFn(yAxis); */


    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


function draw(data) {

    data.forEach(function(d) {
        d.Party_Name = d.Party_Name.toString();
        d.Amount = +d.Amount;
    });

    data.sort(function(a, b){
      return a["Amount"]-b["Amount"];
    })

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { d.Party_Name; }));
  y.domain([0, d3.max(data, function(d) { return d.Amount; })]);

  // Add the valueline path.
  svg.append("path")
      .data(data)
      .attr("class", "line")
      .attr("d", valueline);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  }

  // trigger render
  draw(dataset);
