var w = 500;
var h = 300;
var barPadding = 1;
var padding = 20;

var parseTime = d3.timeParse("%m/%d/%y");

var rowConverter = d => {
    return {
        Date: parseTime(d.Date),
        Amount: parseInt(d.Amount)
    };
};

var formatTime = d3.timeFormat("%b %e");
const radius = 5;

var test = d3.csv("data/time_scale_data.csv", data => {
    var dataset = data.map(d => rowConverter(d));
    var xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, d => d.Date),
            d3.max(dataset, d => d.Date)
        ])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, d => d.Amount), 
            d3.max(dataset, d => d.Amount)
        ])
        .range([h - padding, padding]);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("border", "1px solid black");
    
    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(d.Amount))
        .attr("cx", d => xScale(d.Date))
        .attr("r", radius)

    var labels = svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("y", d => yScale(d.Amount))
        .attr("x", d => xScale(d.Date) + radius + 3)
        .attr("alignment-baseline", "central")
        .attr("fill", "grey")
        .text(d => formatTime(d.Date));
});