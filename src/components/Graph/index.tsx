import {
  ReactFlow,
  Background,
  Controls,
  OnNodesChange,
  applyNodeChanges,
  Node,
} from "@xyflow/react";
import { useEffect, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MouseEvent as ReactMouseEvent } from "react";

import {
  setNodes,
  setEdges,
  setSelectedNode,
} from "../../store/slices/graphSlice";
import {
  generateInitialNodes,
  generateInitialEdges,
} from "../../utils/initialData";
import "@xyflow/react/dist/style.css";
import { CustomNode } from "../../types";
import { NodeCustomizationPanel } from "../CustomizationPanel";

const Graph = () => {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useAppSelector((state) => state.graph);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes) as CustomNode[]));
    },
    [dispatch, nodes]
  );

  const onNodeClick = useCallback(
    (_: ReactMouseEvent, node: Node) => {
      dispatch(setSelectedNode(node.id));
    },
    [dispatch]
  );

  const onPaneClick = useCallback(() => {
    dispatch(setSelectedNode(null));
  }, [dispatch]);

  const defaultEdgeOptions = useMemo(
    () => ({
      style: { stroke: "#666", strokeWidth: 2 },
      type: "smoothstep",
      animated: true,
    }),
    []
  );

  useEffect(() => {
    if (nodes.length === 0) {
      const initialNodes = generateInitialNodes();
      const initialEdges = generateInitialEdges();
      dispatch(setNodes(initialNodes));
      dispatch(setEdges(initialEdges));
    }
  }, [dispatch, nodes.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={4}
        nodesDraggable={true}
        elementsSelectable={true}
        snapToGrid={false}
        snapGrid={[1, 1]}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <NodeCustomizationPanel />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
