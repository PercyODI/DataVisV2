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
var formatToDay = d3.timeFormat("%e");
const radius = 2;

var test = d3.csv("data/time_scale_data.csv", data => {
    var dataset = data.map(d => rowConverter(d));
    var xScale = d3.scaleTime()
        .domain([
            d3.timeDay.offset(d3.min(dataset, d => d.Date), -1),
            d3.timeDay.offset(d3.max(dataset, d => d.Date), 1)
        ])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([
            0,
            // d3.min(dataset, d => d.Amount), 
            d3.max(dataset, d => d.Amount)
        ])
        .range([h - padding, padding]);

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(formatToDay);
    
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(7);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("border", "1px solid black");

    
    var lines = svg.selectAll("lines")
        .data(dataset)
        .enter()
        .append("line")
        .attr("x1", d => xScale(d.Date))
        .attr("y1", d => yScale(d.Amount))
        .attr("x2", d => xScale(d.Date))
        .attr("y2", h - padding)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1)
    
    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(d.Amount))
        .attr("cx", d => xScale(d.Date))
        .attr("r", radius)

    // var labels = svg.selectAll("text")
    //     .data(dataset)
    //     .enter()
    //     .append("text")
    //     .attr("y", d => yScale(d.Amount))
    //     .attr("x", d => xScale(d.Date) + radius + 3)
    //     .attr("alignment-baseline", "central")
    //     .attr("fill", "grey")
    //     .text(d => formatTime(d.Date));

    svg.append("g")
        .attr("transform", `translate(0,${h - padding})`)
        .call(xAxis);
    
    svg.append("g")
        .attr("transform", `translate(${padding},0)`)
        .call(yAxis);
});