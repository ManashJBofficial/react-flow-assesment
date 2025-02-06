import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { undoColor, redoColor } from "../../store/slices/historySlice";

export const UndoRedoControls = () => {
  const dispatch = useAppDispatch();
  const selectedNode = useAppSelector((state) => state.graph.selectedNode);
  const nodeHistories = useAppSelector((state) => state.history.nodeHistories);

  const canUndo = selectedNode
    ? nodeHistories[selectedNode]?.past.length > 0
    : false;
  const canRedo = selectedNode
    ? nodeHistories[selectedNode]?.future.length > 0
    : false;

  return (
    <div className="absolute bottom-4 left-4 flex gap-2">
      <button
        onClick={() => selectedNode && dispatch(undoColor(selectedNode))}
        disabled={!canUndo}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={() => selectedNode && dispatch(redoColor(selectedNode))}
        disabled={!canRedo}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Redo
      </button>
    </div>
  );
};
