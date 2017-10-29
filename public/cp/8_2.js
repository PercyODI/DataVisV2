var w = 500;
var h = 300;
var barPadding = 1;
var padding = 30;

var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
];

var xScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[0])
    ])
    .range([padding, w - (padding * 2)]);

var yScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[1])
    ])
    .range([h - padding, padding]);

var aScale = d3.scaleSqrt()
    .domain([0, d3.max(dataset, d => d[1])])
    .range([0, 10]);

var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

var svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('border', '1px solid black');

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', d => aScale(d[1]));

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr('x', d => xScale(d[0]))
    .attr('y', d => yScale(d[1]))
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'red')
    .text(d => `${d[0]},${d[1]}`);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);