import { DataSet, Network } from 'vis-network/standalone';

// Función para dibujar el árbol usando Vis.js
export function drawTree(data: any): void {
    const nodesArray: any[] = [];
    const edgesArray: any[] = [];

    const traverse = (node: any, parentId: string | null) => {
        const nodeId = node.name.toString();
        nodesArray.push({ id: nodeId, label: nodeId });

        if (parentId) {
            edgesArray.push({ from: parentId, to: nodeId });
        }

        node.children.forEach((child: any) => {
            traverse(child, nodeId);
        });
    };

    traverse(data, null);

    const nodes = new DataSet(nodesArray);
    const edges = new DataSet(edgesArray);
    const container = document.getElementById('visualization') as HTMLElement;

    const dataVis = { nodes: nodes, edges: edges };
    const options = {
        physics: false,
        nodes: {
            shape: 'dot',
            size: 15,
        },
    };

    new Network(container, dataVis, options);
}