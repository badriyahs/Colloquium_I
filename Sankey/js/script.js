// js/script.js

console.log('Script loaded');

// Set up the dimensions and margins of the graph
const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

console.log('Dimensions set');

// Append the svg object to the body of the page
const svg = d3.select("#sankey")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + margin.top + ")");

console.log('SVG appended');

// Set the Sankey diagram properties
const sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 6]]);

console.log('Sankey properties set');

const graph = {
    nodes: [
        { name: "e.on" },
        { name: "Vattenfall" },
        { name: "EnBW" },
        { name: "RWE" },
        { name: "Neurath" },
        { name: "Niederaußem" }
    ],
    links: [
        { source: 0, target: 4, value: 2 },
        { source: 0, target: 5, value: 2 },
        { source: 1, target: 4, value: 2 },
        { source: 1, target: 5, value: 2 },
        { source: 2, target: 4, value: 2 },
        { source: 2, target: 5, value: 2 },
        { source: 3, target: 4, value: 2 },
        { source: 3, target: 5, value: 2 }
    ]
};

console.log('Graph data set:', graph);

const sankeyData = sankey(graph);

console.log('Sankey layout applied:', sankeyData);

// Add the links
const link = svg.append("g")
    .selectAll("path")
    .data(sankeyData.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke-width", d => Math.max(1, d.width))
    .style("fill", "none")
    .style("stroke", "#000")
    .style("stroke-opacity", 0.2);

console.log('Links added:', link);

// Add the nodes
const node = svg.append("g")
    .selectAll(".node")
    .data(sankeyData.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

console.log('Nodes added:', node);

// Add rectangles for the nodes
const rect = node.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", sankey.nodeWidth())
    .attr("fill", "steelblue")
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

console.log('Node rectangles added:', rect);

// Add text labels for the nodes
const text = node.append("text")
    .attr("x", d => d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text(d => d.name)
    .filter(d => d.x0 < width / 2)
    .attr("x", d => d.x1 + 6)
    .attr("text-anchor", "start");

console.log('Node labels added:', text);