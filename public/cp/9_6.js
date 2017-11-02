var w = 500;
var h = 300;
var barPadding = 1;
var padding = 30;

d3
    .select("body")
    .append("p")
    .text("Click on this text to update the chart with new data values as many times as you" +
            " like!")
    .on("click", update);

function update() {
    dataset = randomData();

    xScale.domain([
        0, d3.max(dataset, d => d[0])
    ]);

    yScale.domain([
        0, d3.max(dataset, d => d[1])
    ]);

    aScale.domain([
        0, d3.max(dataset, d => d[1])
    ])

    xAxisSvg
        .transition()
        .call(xAxis);
    yAxisSvg
        .transition()
        .call(yAxis);

    svg
        .selectAll('circle')
        .data(dataset)
        .transition()
        .duration(1000)
        .on("start", function () {
            d3
                .select(this)
                .attr("fill", "magenta")
                .attr("r", 10);
        })
        // .delay((d, i) => i * 15)
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("r", 2);
}

function randomData() {
    var dataset = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        var newNumber1 = Math.floor(Math.random() * xRange);
        var newNumber2 = Math.floor(Math.random() * yRange);
        dataset.push([newNumber1, newNumber2]);
    }

    return dataset;
}

var dataset = randomData();
var xScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[0])
    ])
    .range([
        padding, w - (padding * 2)
    ]);

var yScale = d3
    .scaleLinear()
    .domain([
        0, d3.max(dataset, d => d[1])
    ])
    .range([
        h - padding,
        padding
    ]);

var aScale = d3
    .scaleSqrt()
    .domain([
        0, d3.max(dataset, d => d[1])
    ])
    .range([0, 10]);

var xAxis = d3
    .axisBottom()
    .scale(xScale)
    // .tickFormat(d3.format(".1%"))
    .ticks(5);

var yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(5);

var svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('border', '1px solid black');

svg.append("clipPath")
    .attr("id", "chart-area")
    .append("rect")
    .attr("x", padding)
    .attr("y", padding)
    .attr("width", w - padding * 3)
    .attr("height", h - padding * 2);

svg.append("g")
    .attr("id", "circles")
    .attr("clip-path", "url(#chart-area)")
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 2)
    .attr('fill', 'black');

var xAxisSvg = svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

var yAxisSvg = svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);