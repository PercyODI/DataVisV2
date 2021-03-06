// Add elements to HTML because I didn't know this was happening!
d3.select("body")
    .append("p")
    .text("Click on this text to update the chart with new data values (once).")

//Width and height
var w = 600;
var h = 250;
var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//Create SVG element
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("border", "1px solid black");

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", d => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d))
    .attr("fill", function (d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "hanging ")
    .attr("x", (d, i) => xScale(i) + (xScale.bandwidth() / 2))
    .attr("y", d => h - yScale(d) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

    
d3.select("p")
.on("click", () =>{
    dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
        5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeCircleIn)
        .attr("y", d => h - yScale(d))
        .attr("height", d => yScale(d))
        .attr("fill", function (d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
        });
    
    svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeCircleIn)
        .text(d => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => h - yScale(d) + 14);
})