import * as d3 from 'd3';
import * as shortId from 'shortid';

var svgWidth = 500;
var svgHeight = 500;
var svgPadding = 40;


var dataset = [{
        id: shortId.generate(),
        name: "Pearse",
        symbol: "£"
    },
    {
        id: shortId.generate(),
        name: "Max",
        symbol: "₼"
    },
    {
        id: shortId.generate(),
        name: "Sunshine",
        symbol: "☀"
    },
];

var connections = [
    {
        ids: [dataset[0].id, dataset[1].id],
        times: 5
    },
    {
        ids: [dataset[0].id, dataset[2].id],
        times: 2
    },
];

var xScale = d3.scaleLinear()
    .domain([-1, dataset.length * 2 - 1])
    .range([svgPadding, svgWidth - svgPadding]);

var yScale = d3.scaleLinear()
    .domain([0, dataset.length - 1])
    .range([svgHeight - svgPadding, svgPadding]);

var centerX = svgWidth / 2;
var rightX = svgWidth - svgPadding;
var leftX = svgPadding;

var topY = svgPadding;
var bottomY = svgHeight - svgPadding;

var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("border", "1px solid black");

var symbols = svg.selectAll(".symbols")
    .data(dataset).enter()
    .append("text")
    .attr("id", d => d.id)
    .attr("y", svgHeight - svgPadding)
    .attr("x", (d, i) => xScale(i * 2))
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .text(d => d.symbol);

var forwardLines = svg.selectAll(".forwardLine")
    .data(dataset).enter()
    .append("line")
    .attr("x1", (d, i) => xScale(i * 2 - 1))
    .attr("y1", bottomY)
    .attr("x2", (d, i) => xScale(i))
    .attr("y2", (d, i, n) => yScale(n.length - i - 1))
    .attr("stroke", "black")
    .attr("stroke-width", "1px")

var testCircles = svg.selectAll(".testCircle")
    .data(d3.range(xScale.domain()[0], xScale.domain()[1] + 1))
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d))
    .attr("cy", svgHeight - svgPadding)
    .attr("r", 10)
    .attr("fill", "rgba(0,0,0,0.2)")

// var timesText = svg.selectAll(".timesText")
//     .data(connections).enter()
//     .append("text")
//     .attr("y", d => {
//         var firstIndex = dataset.indexOf(dataset.filter(x => x.id == d.ids[0])[0]);
//         var secondIndex = dataset.indexOf(dataset.filter(x => x.id == d.ids[1])[0]);
//         var difference = Math.max(firstIndex, secondIndex) - Math.min(firstIndex, secondIndex);
//         return outerBackwardYScale(difference - 1);
//     })
//     .attr("x", d => {
//         var firstX = parseInt(d3.select(`#${d.ids[0]}`).attr("x"));
//         var secondX = parseInt(d3.select(`#${d.ids[1]}`).attr("x"));
//         var average = (firstX + secondX) / 2;
//         return average;
//     })
//     .attr("text-anchor", "middle")
//     .attr("alignment-baseline", "middle")
//     .text(d => {
//         var textToReturn = "";
//         for(var i = 0; i < d.times; i++){
//             textToReturn = textToReturn + "I";
//         }

//         return textToReturn;
//     });