const data = {
    "name": "Global Time Control",
    "children": [
        {
            "name": "BIPM",
            "children": [
                {
                    "name": "ITU",
                    "children": [
                        {
                            "name": "IERS",
                            "children": [
                                {
                                    "name": "CCTF",
                                    "children": [
                                        {
                                            "name": "NMIs",
                                            "children": [
                                                {
                                                    "name": "RMOs",
                                                    "children": [
                                                        {
                                                            "name": "GNSS",
                                                            "children": [
                                                                {
                                                                    "name": "National Time and Frequency Distribution Services",
                                                                    "children": [
                                                                        {
                                                                            "name": "Telecommunication Networks",
                                                                            "children": [
                                                                                {
                                                                                    "name": "Internet Time Services",
                                                                                    "children": [
                                                                                        {
                                                                                            "name": "Time Signal Receivers",
                                                                                            "children": [
                                                                                                {
                                                                                                    "name": "Manufacturers of Consumer Timekeeping Devices",
                                                                                                    "children": [
                                                                                                        { "name": "End-User Devices" }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const width = 928;
const height = width;
const cx = width * 0.5;
const cy = height * 0.54;
const radius = Math.min(width, height) / 2 - 80;

const tree = d3.cluster()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

const root = tree(d3.hierarchy(data)
    .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-cx, -cy, width, height])
    .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll()
    .data(root.links())
    .join("path")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

svg.append("g")
    .selectAll()
    .data(root.descendants())
    .join("circle")
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
    .attr("fill", d => d.children ? "#555" : "#999")
    .attr("r", 2.5);

svg.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("text")
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    .attr("fill", "currentColor")
    .text(d => d.data.name);

document.body.appendChild(svg.node());