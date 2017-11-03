// Add elements to HTML because I didn't know this was happening!
d3.select("body")
    .append("p")
    .classed("addDataP", true)
    .text("Click on this text to update the chart with new data values as many times as you like!")
d3.select("body")
    .append("p")
    .classed("removeDataP", true)
    .text("Click on this text to remove a data value from the chart!");

//Width and height
var w = 600;
var h = 250;
var barPadding = 1;

var dataset = [ 
        { key: 0, value: 5 },		//dataset is now an array of objects.
        { key: 1, value: 10 },		//Each object has a 'key' and a 'value'.
        { key: 2, value: 13 },
        { key: 3, value: 19 },
        { key: 4, value: 21 },
        { key: 5, value: 25 },
        { key: 6, value: 22 },
        { key: 7, value: 18 },
        { key: 8, value: 15 },
        { key: 9, value: 13 },
        { key: 10, value: 11 },
        { key: 11, value: 12 },
        { key: 12, value: 15 },
        { key: 13, value: 20 },
        { key: 14, value: 18 },
        { key: 15, value: 17 },
        { key: 16, value: 16 },
        { key: 17, value: 18 },
        { key: 18, value: 23 },
        { key: 19, value: 25 } 
    ];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.value)])
    .range([0, h]);

var key = function(d) {
    return d.key;
}

//Create SVG element
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("border", "1px solid black");

svg.selectAll("rect")
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", d => h - yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d.value))
    .attr("fill", function (d) {
        return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
    });

svg.selectAll("text")
    .data(dataset, key)
    .enter()
    .append("text")
    .text(function (d) {
        return d.value;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "hanging ")
    .attr("x", (d, i) => xScale(i) + (xScale.bandwidth() / 2))
    .attr("y", d => h - yScale(d.value) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");


d3.selectAll("p")
    .on("click", (d, i, nodes) => {
        if(d3.select(nodes[i]).classed("addDataP")){
            // Add new value to dataset
            var maxValue = 25;
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push({
                key: dataset[dataset.length - 1].key + 1,
                value: newNumber
            });
        } else if(d3.select(nodes[i]).classed("removeDataP")){
            dataset.shift();
        }
        
        yScale.domain([0, d3.max(dataset, d => d.value)])
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset, key);

        bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function (d) {
                return h - yScale(d.value);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d.value);
            })
            .attr("fill", function (d) {
                return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
            })
            .merge(bars) //Update…
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return h - yScale(d.value);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d.value);
            });

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", -xScale.bandwidth())
            .remove();

        var text = svg.selectAll("text").data(dataset, key);
        text.enter()
            .append("text")
            .text(function (d) {
                return d.value;
            })
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "hanging ")
            .attr("x", (d, i) => w + (xScale.bandwidth() / 2))
            .attr("y", d => h - yScale(d.value) + 14)
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white")
            .merge(text)
            .transition()
            .duration(500)
            .attr("x", (d, i) => xScale(i) + (xScale.bandwidth() / 2))
            .attr("y", d => h - yScale(d.value) + 14);
        
        text.exit()
            .transition()
            .duration(500)
            .attr("x", 0 - (xScale.bandwidth() / 2))
            .remove();
    })