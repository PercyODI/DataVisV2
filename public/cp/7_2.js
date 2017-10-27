var w = 500;
var h = 100;
var barPadding = 1;

var dataset = [
    [
        5, 20
    ],
    [
        480, 90
    ],
    [
        250, 50
    ],
    [
        100, 33
    ],
    [
        330, 95
    ],
    [
        410, 12
    ],
    [
        475, 44
    ],
    [
        25, 67
    ],
    [
        85, 21
    ],
    [220, 88]
];

var xScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[0])
    ])
    .range([0, w]);

var yScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[1])
    ])
    .range([0, h]);

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("border", "1px solid black");

svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", d => Math.sqrt(h - d[1]))
    .attr("fill", d => `rgb(0, 0, ${Math.round(d * 10)})`);

svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", d => xScale(d[0]))
    .attr("y", d => yScale(d[1]))
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red")
    .text(d => `${d[0]},${d[1]}`);
