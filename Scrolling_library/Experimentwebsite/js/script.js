var data = {
    "name": "Factors Affecting Time Perception",
    "children": [
        {
            "name": "Environmental Factors",
            "children": [
                { "name": "Light" },
                { "name": "Weather" },
                { "name": "Temperature" },
                { "name": "Noise" }
            ]
        },
        {
            "name": "Psychological Factors",
            "children": [
                { "name": "Attention" },
                { "name": "Stress" },
                { "name": "Mood" },
                { "name": "Memory" }
            ]
        },
        {
            "name": "Biological Factors",
            "children": [
                { "name": "Age" },
                { "name": "Circadian" },
                { "name": "Physical" }
            ]
        },
        {
            "name": "Social and Cultural Factors",
            "children": [
                { "name": "Interactions" },
                { "name": "Norms" },
                { "name": "Routine" }
            ]
        },
        {
            "name": "Technological Factors",
            "children": [
                { "name": "Devices" },
                { "name": "Media" },
                { "name": "Pace" }
            ]
        },
        {
            "name": "Cognitive Factors",
            "children": [
                { "name": "Complexity" },
                { "name": "Multitasking" }
            ]
        },
        {
            "name": "Economic Factors",
            "children": [
                { "name": "Schedules" },
                { "name": "Stress" }
            ]
        },
        {
            "name": "Health and Well-being Factors",
            "children": [
                { "name": "Physical" },
                { "name": "Mental" }
            ]
        },
        {
            "name": "Sensory Factors",
            "children": [
                { "name": "Noise" },
                { "name": "Visual" }
            ]
        }
    ]
};

var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    width = 1200 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

var tree = d3.tree().size([height, width]);

root = d3.hierarchy(data, function (d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

root.children.forEach(collapse);
update(root);

function update(source) {
    var treeData = tree(root),
        nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    nodes.forEach(function (d) { d.y = d.depth * 180; });

    var node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function (d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function (d) { return d.data.name; });

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');

    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    var link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id; });

    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });

    var linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent); });

    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
            var o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
        .remove();

    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    function diagonal(s, d) {
        var path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;
        return path;
    }

    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}