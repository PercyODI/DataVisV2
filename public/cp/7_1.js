var dataset = [100, 200, 300, 400, 500];

var scale = d3.scaleLinear()
    .domain([100, 500])
    .range([10, 350]);

console.log(scale(100));
console.log(scale(300));
console.log(scale(500));
