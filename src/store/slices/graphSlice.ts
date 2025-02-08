import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge } from "@xyflow/react";
import { CustomNode } from "../../types";

interface GraphState {
  nodes: CustomNode[];
  edges: Edge[];
  selectedNode: string | null;
}

const initialState: GraphState = {
  nodes: [],
  edges: [],
  selectedNode: null,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<CustomNode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNode = action.payload;
    },

    updateNodeColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      const { nodeId, color } = action.payload;
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: { ...node.data, color },
              style: { ...node.style, backgroundColor: color },
            }
          : node
      );
    },
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.fontSize = action.payload.fontSize;
        if (!node.style) node.style = {};
        node.style.fontSize = `${action.payload.fontSize}px`;
      }
    },
  },
});

export const {
  setNodes,
  setEdges,
  setSelectedNode,
  updateNodeColor,
  updateNodeFontSize,
} = graphSlice.actions;
export default graphSlice.reducer;
