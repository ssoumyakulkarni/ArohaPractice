const svg = d3.select('svg');
var dparse = d3.timeParse("%B-%Y")
var dformat = d3.timeFormat("%B-%Y")

            const width = svg.attr('width');
            const height = svg.attr('height');
            var color = d3.scaleOrdinal().range(d3.schemeSet1);
            const render = data => {

                const xvalue =  d => d.value;
                const yvalue = d => dformat(d.key);
              

                var margin = {top: 50, right: 20, bottom: 50, left:120};
                var innerwidth = width - margin.left - margin.right;
                var innerheight = height - margin.top - margin.bottom;

                const g = svg.append('g')
                            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


                console.log(data)

                function sortAscending(a, b){
                    return a.value - b.value;
                }

                data = data.sort(sortAscending);


                const xscale = d3.scaleLinear()
                            .domain([0, d3.max(data, xvalue)])
                            .range([0, innerwidth]);

                const xaxistickformat = number =>
                                d3.format('.3s')(number);

                const xaxisG = g.append('g').call(d3.axisBottom(xscale)
                            .tickFormat(xaxistickformat).tickSize(-innerheight+10))
                            .attr('transform', "translate(0 ," + innerheight + ")");

                    xaxisG.select('.domain')
                        .remove();

                    xaxisG.append('text')
                    .attr("class", "axis-label")
                    .attr('y', 40)
                    .attr('x', innerwidth / 2)
                    .attr("fill", "black")
                    .text('Amount In Millions')

                function sortByDateAscending(a, b){
                    return b.key - a.key;
                }

                data = data.sort(sortByDateAscending);

                const yscale = d3.scaleBand()
                            .domain(data.map(yvalue))
                            .range([0, innerheight])
                            .padding(0.1);

                const yaxis = d3.axisLeft(yscale);
                                
                //yaxis(g.append('g'));
                const yaxisG = g.append('g').call(yaxis)

                yaxisG.selectAll('.domain, .tick line')
                                .remove()

                // yaxisG.append('text')
                //     .attr("class", "Yaxis-label")
                //     .attr('y', -90)
                //     .attr('x', -170)
                //     .attr("fill", "black")
                //     .attr("transform", "rotate(-90)")
                //     .text('Name Of Items');


                g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('y', d => yscale(yvalue(d)))
                .attr('width', 0)
                .transition()
			    .duration(2500)
			    .delay(function (d, i) {
				        return i * 50;
                })
                .attr('width', d => xscale(xvalue(d)))
                .attr('height', yscale.bandwidth())
                .attr("fill",function(d){
                    return color(d.value)
                });
            
              g.append('text')
                    .attr("class", "title")
                    .attr('y', -5)
                    .attr('x', innerwidth/2)
                    .text("Item Monthly Sale's")

                // g.selectAll('rect')
                //     .data(data)
                //     .enter()                    
                //     .append('text')
                //     .attr("class", "bar_text")
                //     .attr('y', d => yscale(yvalue(d)))
                //     .attr('x', d => xscale(xvalue(d)))
                //     .attr('fill', "black")
                //     .text(function(d){ 
                //             return d.value;
                //     })

                console.log(innerwidth)

                

            };    

            d3.json("bar.json", function(val){


                data = val["item montly sales "];
                console.log(data)


                data.forEach(d => { d.value = +d.value;
                                        d.key = dparse(d.key);                            
                })

                // var data1 = [];
                // data.forEach(function(d) {
                //             data1.push(d.key);
                //             });

                console.log(data)
                render(data);
        });