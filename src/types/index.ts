import { Node, Edge } from "@xyflow/react";

export interface CustomNode extends Node {
  data: {
    label: string;
    color?: string;
    fontSize: number;
  };
}

export interface GraphState {
  nodes: CustomNode[];
  edges: Edge[];
  selectedNode: string | null;
}

export interface HistoryState {
  past: GraphState[];
  present: GraphState;
  future: GraphState[];
}

export interface RootState {
  graph: GraphState;
  history: HistoryState;
}
