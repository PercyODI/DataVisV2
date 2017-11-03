var svgWidth = 500;
var svgHeight = 500;
var svgPadding = 40;


var dataset = [{
        name: "Pearse",
        symbol: "£"
    },
    {
        name: "Max",
        symbol: "₼"
    },
    {
        name: "Sunshine",
        symbol: "☀"
    },
];

var datasetDomain = [-1, dataset.length - 1];

var widthScale = d3.scaleLinear()
    .domain([0, dataset.length - 1])
    .range([svgPadding * 2, svgWidth - (svgPadding * 2)]);


var topX = svgWidth / 2;
var rightX = widthScale(dataset.length - 1);//svgWidth - svgPadding;
var leftX = svgPadding;

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
    .attr("y", svgHeight - svgPadding)
    .attr("x", (d, i) => widthScale(i))
    // .attr("alignment-baseline", "center")
    .attr("text-anchor", "middle")
    .text(d => d.symbol)

// var outerForwardLine = svg.append("line")
//     .attr("x1", widthScale.range()[0] - svgPadding)
//     .attr("y1", svgHeight - svgPadding)
//     .attr("x2", svgWidth / 2)
//     .attr("y2", svgPadding)
//     .attr("stroke-width", "1px")
//     .attr("stroke", "black");

// var outerBackwardLine = svg.append("line")
//     .attr("x1", widthScale.range()[1] + svgPadding)
//     .attr("y1", svgHeight - svgPadding)
//     .attr("x2", svgWidth / 2)
//     .attr("y2", svgPadding)
//     .attr("stroke-width", "1px")
//     .attr("stroke", "black");

var forwardLines = svg.selectAll(".forwardLine")
    .data(dataset).enter()
    .append("line")
    .attr("x1", (d, i) => {
        // if(i === 0){
        //     return widthScale(i) - svgPadding
        // }

        return widthScale((i - 1) + 0.5)
    })
    .attr("y1", svgHeight - svgPadding)
    // .attr("x2", (d, i) => widthScale(i + 1) - svgPadding)
    .attr("x2", (d, i) => outerForwardXScale(i))
    .attr("y2", (d, i) => outerForwardYScale(i))
    .attr("stroke-width", "1px")
    .attr("stroke", "black");

var backwardLines = svg.selectAll(".forwardLine")
    .data(dataset).enter()
    .append("line")
    .attr("x1", (d, i) => {
        // if(i === dataset.length - 1){
        //     return widthScale(i) + svgPadding
        // }

        return widthScale((i + 1) - 0.5)
    })
    .attr("y1", svgHeight - svgPadding)
    // .attr("x2", (d, i) => widthScale(i - 1) + svgPadding)
    .attr("x2", (d, i) => outerBackwardXScale(i))
    .attr("y2", (d, i) => outerBackwardYScale(i))
    .attr("stroke-width", "1px")
    .attr("stroke", "black");