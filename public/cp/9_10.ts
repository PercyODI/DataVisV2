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
    {
        id: shortId.generate(),
        name: "Sunshine",
        symbol: "☀"
    },
    {
        id: shortId.generate(),
        name: "Sunshine",
        symbol: "☀"
    },
    {
        id: shortId.generate(),
        name: "Sunshine",
        symbol: "☀"
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
    {
        ids: [dataset[1].id, dataset[5].id],
        times: 3
    }
]

var datasetDomain = [-1, dataset.length - 1];

var widthScale = d3.scaleLinear()
    .domain([0, dataset.length - 1])
    .range([svgPadding * 2, svgWidth - (svgPadding * 2)]);

var topX = svgWidth / 2;
var rightX = widthScale(widthScale.domain()[1] + 0.5);//svgWidth - svgPadding;
var leftX = widthScale(-0.5);//svgPadding;

var topY = svgPadding;
var bottomY = svgHeight - svgPadding;

var outerForwardXScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([topX, rightX]);

var outerBackwardXScale = d3.scaleLinear()
    .domain([-1, dataset.length - 1])
    .range([leftX, topX]);

var outerForwardYScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([topY, bottomY]);

var outerBackwardYScale = d3.scaleLinear()
    .domain([-1, dataset.length - 1])
    .range([bottomY, topY]);

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
    .attr("x", (d, i) => widthScale(i))
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .text(d => d.symbol);

var forwardLines = svg.selectAll(".forwardLine")
    .data(dataset).enter()
    .append("line")
    .attr("x1", (d, i) => widthScale((i - 1) + 0.5))
    .attr("y1", svgHeight - svgPadding)
    .attr("x2", (d, i) => outerForwardXScale(i))
    .attr("y2", (d, i) => outerForwardYScale(i))
    .attr("stroke-width", "1px")
    .attr("stroke", "black");

var backwardLines = svg.selectAll(".forwardLine")
    .data(dataset).enter()
    .append("line")
    .attr("x1", (d, i) => widthScale((i + 1) - 0.5))
    .attr("y1", svgHeight - svgPadding)
    .attr("x2", (d, i) => outerBackwardXScale(i))
    .attr("y2", (d, i) => outerBackwardYScale(i))
    .attr("stroke-width", "1px")
    .attr("stroke", "black");

var timesText = svg.selectAll(".timesText")
    .data(connections).enter()
    .append("text")
    .attr("y", d => {
        var firstIndex = dataset.indexOf(dataset.filter(x => x.id == d.ids[0])[0]);
        var secondIndex = dataset.indexOf(dataset.filter(x => x.id == d.ids[1])[0]);
        var difference = Math.max(firstIndex, secondIndex) - Math.min(firstIndex, secondIndex);
        return outerBackwardYScale(difference - 1);
    })
    .attr("x", d => {
        var firstX = parseInt(d3.select(`#${d.ids[0]}`).attr("x"));
        var secondX = parseInt(d3.select(`#${d.ids[1]}`).attr("x"));
        var average = (firstX + secondX) / 2;
        return average;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text(d => {
        var textToReturn = "";
        for(var i = 0; i < d.times; i++){
            textToReturn = textToReturn + "I";
        }

        return textToReturn;
    });