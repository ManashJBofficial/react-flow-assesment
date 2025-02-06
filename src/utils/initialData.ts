import { CustomNode } from "../types";
import { Edge } from "@xyflow/react";

export const generateInitialNodes = (): CustomNode[] => {
  const nodes: CustomNode[] = [];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 200;

  for (let i = 0; i < 10; i++) {
    const angle = (i * 2 * Math.PI) / 10;
    nodes.push({
      id: `node-${i}`,
      position: {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      },
      style: {
        backgroundColor: "#FFEA00",
        color: "#000000",
      },
      data: {
        label: `Node ${i}`,
        color: "#000000",
        fontSize: 16,
      },

      type: "default",
    });
  }

  return nodes;
};

export const generateInitialEdges = (): Edge[] => {
  const edges: Edge[] = [];

  for (let i = 0; i < 10; i++) {
    edges.push({
      id: `edge-${i}-${(i + 1) % 10}`,
      source: `node-${i}`,
      target: `node-${(i + 1) % 10}`,
      style: {
        strokeWidth: 1,
        stroke: "#000",
        strokeDasharray: "0",
      },
      animated: false,
      type: "default",
    });
  }

  return edges;
};
