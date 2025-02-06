import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import { Slider } from "../ui/slider";
import { Undo, Redo } from "lucide-react";

import {
  updateNodeFontSize,
  setSelectedNode,
  updateNodeColor,
} from "../../store/slices/graphSlice";
import {
  pushColorToPast,
  pushFontSizeToPast,
  undoColor,
  redoColor,
  undoFontSize,
  redoFontSize,
  initializeNodeHistory,
} from "../../store/slices/historySlice";
export const NodeCustomizationPanel = () => {
  const dispatch = useAppDispatch();
  const selectedNode = useAppSelector((state) => state.graph.selectedNode);
  const nodes = useAppSelector((state) => state.graph.nodes);
  const panelRef = useRef<HTMLDivElement>(null);

  const node = nodes.find((n) => n.id === selectedNode);
  const nodeHistory = useAppSelector(
    (state) => state.history.nodeHistories[selectedNode || ""]
  );

  const [color, setColor] = useState(
    node?.style?.backgroundColor || node?.data.color || "#FFEA00"
  );
  const [fontSize, setFontSize] = useState(node?.data.fontSize || 16);

  useEffect(() => {
    if (selectedNode) {
      dispatch(
        initializeNodeHistory({
          nodeId: selectedNode,
          color: color,
          fontSize: fontSize,
        })
      );
    }
  }, [selectedNode, color, fontSize, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        dispatch(setSelectedNode(null));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleColorChange = (newColor: { hex: string }) => {
    if (!selectedNode) return;
    dispatch(pushColorToPast({ nodeId: selectedNode, color }));
    dispatch(updateNodeColor({ nodeId: selectedNode, color: newColor.hex }));
    setColor(newColor.hex);
  };

  const handleFontSizeChange = (value: number[]) => {
    if (!selectedNode) return;
    dispatch(pushFontSizeToPast({ nodeId: selectedNode, fontSize }));
    dispatch(updateNodeFontSize({ id: selectedNode, fontSize: value[0] }));
    setFontSize(value[0]);
  };

  const handleColorUndo = () => {
    if (!selectedNode || !nodeHistory?.past.length) return;

    const previousColor = nodeHistory.past[nodeHistory.past.length - 1].color;

    dispatch(undoColor(selectedNode));
    dispatch(updateNodeColor({ nodeId: selectedNode, color: previousColor }));

    setColor(previousColor);
  };

  const handleColorRedo = () => {
    if (!selectedNode || !nodeHistory?.future.length) return;

    const nextColor = nodeHistory.future[0].color;

    dispatch(redoColor(selectedNode));
    dispatch(updateNodeColor({ nodeId: selectedNode, color: nextColor }));

    setColor(nextColor);
  };

  const handleFontSizeUndo = () => {
    if (!selectedNode || !nodeHistory?.fontSize.past.length) return;
    dispatch(undoFontSize(selectedNode));
    const previousSize = nodeHistory.fontSize.current;
    dispatch(updateNodeFontSize({ id: selectedNode, fontSize: previousSize }));
    setFontSize(previousSize);
  };

  const handleFontSizeRedo = () => {
    if (!selectedNode || !nodeHistory?.fontSize.future.length) return;
    dispatch(redoFontSize(selectedNode));
    const nextSize = nodeHistory.fontSize.current;
    dispatch(updateNodeFontSize({ id: selectedNode, fontSize: nextSize }));
    setFontSize(nextSize);
  };

  if (!selectedNode || !node) return null;

  const nodePosition = node.position;
  const calculatePanelPosition = (nodePosition: { x: number; y: number }) => {
    const viewportHeight = window.innerHeight;
    const panelHeight = 400;

    const top =
      nodePosition.y > viewportHeight / 2
        ? nodePosition.y - panelHeight - 20
        : nodePosition.y;

    return {
      position: "absolute" as const,
      left: `${nodePosition.x + 180}px`,
      top: `${top}px`,
      zIndex: 1000,
    };
  };

  const style = calculatePanelPosition(nodePosition);
  return (
    <div
      ref={panelRef}
      className="bg-white p-4 rounded-lg shadow-lg"
      style={style}
    >
      <h3 className="mb-4">Node {selectedNode} Customization</h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label>Color</label>
          <div className="flex gap-2">
            <button
              onClick={handleColorUndo}
              disabled={!nodeHistory?.past.length}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleColorRedo}
              disabled={!nodeHistory?.future.length}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
        <ChromePicker color={color} onChangeComplete={handleColorChange} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label>Font Size ({fontSize}px)</label>
          <div className="flex gap-2">
            <button
              onClick={handleFontSizeUndo}
              disabled={!nodeHistory?.fontSize.past.length}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleFontSizeRedo}
              disabled={!nodeHistory?.fontSize.future.length}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Slider
          value={[fontSize]}
          min={12}
          max={24}
          step={1}
          onValueChange={handleFontSizeChange}
        />
      </div>
    </div>
  );
};
