(function (d3) {
    'use strict';

    var div = d3.select("svg").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0.9)
  
    const svg = d3.select('svg');
  
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    const render = data => {
      const xValue = d => d.qty;
      const yValue = d => d.name;
      const margin = { top: 50, right: 40, bottom: 77, left: 250 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();
      
      const yScale = d3.scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      const xAxisTickFormat = number =>
        d3.format('.3s')(number)
          .replace('G', 'B');
      
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);
      
      g.append('g')
        .call(yAxis)
        .selectAll('.domain')
          .remove();
      
      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label1')
          .attr('y', 40)
          .attr('x', innerWidth / 2)
          .attr('fill', 'black')
          .text('Quantity');
      
      g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr("cx", function(d) { return xScale(xValue(d)); })
        .attr("cy", function(d) { return yScale(yValue(d));})
        //   .attr('cy', d => yScale(yValue(d.)))
        //   .attr('cx', d => xScale(xValue(d)))
          .attr('r', 10)
          .attr('fill', "steelblue")

          .on("mouseover", function(d) {   
            d3.select(this)
            .attr("r", 30)
            .attr("fill", "red")
            div.transition()        
                .duration(200)      
                .style("opacity", .9) 
            div .html(d.name + "<br/>"  + d.qty)   
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px") 
            })                  
        .on("mouseout", function(d) {  
            d3.select(this).attr("r", 10)
            .attr("fill", "steelblue")    
            div.transition()        
                .duration(500)      
                .style("opacity", 0)  
        });

      
      g.append('text')
          .attr('class', 'title1')
          .attr('y', -10)
          .attr('x', 335)
          .text('Top 10 Customers');
    };
  
    d3.json('data.json').then(data => {
      // data.forEach(d => {
      //   d.quatntity = +d.quatntity;
      // });
     var data1 = data["party purchaed by items qty"];
      render(data1);
    });
  
  }(d3));
