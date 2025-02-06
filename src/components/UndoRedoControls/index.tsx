import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { undo, redo } from "../../store/slices/historySlice";

export const UndoRedoControls = () => {
  const dispatch = useAppDispatch();
  const { past, future } = useAppSelector((state) => state.history);

  return (
    <div className="absolute bottom-4 left-4 flex gap-2">
      <button
        onClick={() => dispatch(undo())}
        disabled={past.length === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        disabled={future.length === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Redo
      </button>
    </div>
  );
};
