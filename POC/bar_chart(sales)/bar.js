const svg = d3.select('svg');

            const width = svg.attr('width');
            const height = svg.attr('height');


            const render = data => {

                const xvalue =  d => d.value;
                const yvalue = d => d.key;

                var margin = {top: 50, right: 20, bottom: 50, left: 220};
                var innerwidth = width - margin.left - margin.right;
                var innerheight = height - margin.top - margin.bottom;

                const g = svg.append('g')
                            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


                console.log(data)

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

    

                const yscale = d3.scaleBand()
                            .domain(data.map(yvalue))
                            .range([0, innerheight])
                            .padding(0.1);

                const yaxis = d3.axisLeft(yscale);
                                
                //yaxis(g.append('g'));
                const yaxisG = g.append('g').call(yaxis)

                yaxisG.selectAll('.domain, .tick line')
                                .remove()

                yaxisG.append('text')
                    .attr("class", "Yaxis-label")
                    .attr('y', -170)
                    .attr('x', -170)
                    .attr("fill", "black")
                    .attr("transform", "rotate(-90)")
                    .text('Name Of Items');


                

                g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('y', d => yscale(yvalue(d)))
                .attr('width', d => xscale(xvalue(d)))
                .attr('height', yscale.bandwidth());

                g.append('text')
                    .attr("class", "title")
                    .attr('y', -5)
                    .attr('x', innerwidth/2)
                    .text('Top 10 Items According To Their Sale.')

                console.log(innerwidth)

                

            };    

            d3.json("bar.json", function(data){
                // var data1 = [];
                // data.result.forEach(d => { d.value = +d.value;
                //                            d.key = d.key;                            
                // })

                // var data1 = [];
                // data.forEach(function(d) {
                //             data1.push(d.key);
                //             });

                console.log(data.result)
                render(data.result);
        });