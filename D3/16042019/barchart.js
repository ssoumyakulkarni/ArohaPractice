var margin={top:20,bottom:20,left:20,right:20};
var width=960-margin.left-margin.right;
var height=600-margin.top-margin.bottom;

var svg=d3.select("#chart")
.append("svg")
.attr("width",width)
.attr("height",height);

d3.json("barchart.json",function(d,i){
    console.log(data);
})

var rect=d3.append()