import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Mobile patent suits</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Mobile patent suits

A view of patent-related lawsuits in the mobile communications industry, circa 2011. Data: [Thomson Reuters](http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/)`
)}

function _2(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(suits,d3,location,drag,linkArc,invalidation)
{

  const width = 928;
  const height = 600;
  const types = Array.from(new Set(suits.map(d => d.type)));
  const nodes = Array.from(new Set(suits.flatMap(l => [l.source, l.target])), id => ({id}));
  const links = suits.map(d => Object.create(d))

  const color = d3.scaleOrdinal(types, d3.schemeCategory10);

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");
  
  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
    .data(types)
    .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(links)
    .join("path")
      .attr("stroke", d => color(d.type))
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

  const node = svg.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
    .selectAll("g")
    .data(nodes)
    .join("g")
      .call(drag(simulation));

  node.append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("r", 4);

  node.append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text(d => d.id)
    .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

  simulation.on("tick", () => {
    link.attr("d", linkArc);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  invalidation.then(() => simulation.stop());

  return Object.assign(svg.node(), {scales: {color}});
}


function _suits1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("suits2.csv"),{from:{table:"suits2"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _suits(FileAttachment){return(
FileAttachment("suits3.csv").csv()
)}

function _linkArc(){return(
function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}
)}

function _drag(d3){return(
simulation => {
  
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["suits3.csv", {url: new URL("./files/8fecf85470f1732a24f618b90b7ee87cee92ade518bd8af7e0acbd08a00339d071b40ad40c6f8d823825ef11472992e4f3e68fb8ede9a6ae0f07d432dc09c63d.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Swatches","chart"], _2);
  main.variable(observer("chart")).define("chart", ["suits","d3","location","drag","linkArc","invalidation"], _chart);
  main.variable(observer("suits1")).define("suits1", ["__query","FileAttachment","invalidation"], _suits1);
  main.variable(observer("suits")).define("suits", ["FileAttachment"], _suits);
  main.variable(observer("linkArc")).define("linkArc", _linkArc);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
