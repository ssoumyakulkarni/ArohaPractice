var margin={
    top:20,right: 10,bottom:100,left:40},
    width=700-margin.right-margin.left, height=500-margin.top-margin.left,
    height=500-margin.top-margin.bottom;


    var svg=d3.select('body')
    append('svg')
    .attr({
        "width":width+margin.right+margin.left,
        "height":height+margin.top+margin.bottom
    })
    .append('g')
    .attr("transform","translate("+margin.left+','+margin.right+')');