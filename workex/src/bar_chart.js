
    
import React, {Component} from 'react';
import * as d3 from "d3";
import jsonfile from './bar.json'

class BarChartSale extends Component {
    componentDidMount() {
        this.drawChart();
    } 
    state=
    {
        "result": [
            {
                "key": "Kavi Protein And Feed Pvt Ltd",
                "value": 31164474.440000005
            },
            {
                "key": "Prism Feeds India Pvt Ltd",
                "value": 23718481.79
            },
            {
                "key": "Kavi Protein and Feed Pvt Ltd-Krishnagiri",
                "value": 20203559.399999995
            },
            {
                "key": "CPF India Pvt Ltd-H Junction",
                "value": 18500341.35
            },
            {
                "key": "Khadkeshwara Hatcheries Pvt Ltd White",
                "value": 8719798.580000004
            },
            {
                "key": "Cash",
                "value": 7741926.549999904
            },
            {
                "key": "D.K.Poultry (Feed)",
                "value": 7437088.36
            },
            {
                "key": "Pragathi Hatcheries",
                "value": 5902786.949999999
            },
            {
                "key": "Standard Farms",
                "value": 5846468.479999999
            },
            {
                "key": "Arun Enterprises - S.Dr",
                "value": 5545062
            }
        ]
    }
   
    drawChart() {
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
                    .attr('y', -195)
                    .attr('x', -150)
                    .attr("fill", "black")
                    .attr("transform", "rotate(-90)")
                    .text('Customer Names');


                

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
                    .text('Top 10 Customers')

                console.log(innerwidth)
            };    
render(this.state.result)
        //     d3.json(result, function(data){
        //         console.log(data.result)
        //         render(data.result);
        // });
    }
        
    render(){
        return (
            <div>
               {this.drawChart()}
            </div>
        )
    }
}
    
export default BarChartSale;
    