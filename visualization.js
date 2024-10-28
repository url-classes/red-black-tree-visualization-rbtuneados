"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawTree = drawTree;
var standalone_1 = require("vis-network/standalone");
// Función para dibujar el árbol usando Vis.js
function drawTree(data) {
    var nodesArray = [];
    var edgesArray = [];
    var traverse = function (node, parentId) {
        var nodeId = node.name.toString();
        nodesArray.push({ id: nodeId, label: nodeId });
        if (parentId) {
            edgesArray.push({ from: parentId, to: nodeId });
        }
        node.children.forEach(function (child) {
            traverse(child, nodeId);
        });
    };
    traverse(data, null);
    var nodes = new standalone_1.DataSet(nodesArray);
    var edges = new standalone_1.DataSet(edgesArray);
    var container = document.getElementById('visualization');
    var dataVis = { nodes: nodes, edges: edges };
    var options = {
        physics: false,
        nodes: {
            shape: 'dot',
            size: 15,
        },
    };
    new standalone_1.Network(container, dataVis, options);
}
