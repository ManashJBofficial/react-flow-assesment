import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StyleHistory {
  past: { color: string }[];
  current: { color: string };
  future: { color: string }[];
  fontSize: {
    past: number[];
    current: number;
    future: number[];
  };
}

interface HistoryState {
  nodeHistories: Record<string, StyleHistory>;
}

const initialState: HistoryState = {
  nodeHistories: {},
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initializeNodeHistory: (
      state,
      action: PayloadAction<{ nodeId: string; color: string; fontSize: number }>
    ) => {
      const { nodeId, color, fontSize } = action.payload;
      if (!state.nodeHistories[nodeId]) {
        state.nodeHistories[nodeId] = {
          past: [],
          current: { color },
          future: [],
          fontSize: {
            past: [],
            current: fontSize,
            future: [],
          },
        };
      }
    },
    pushColorToPast: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      const { nodeId, color } = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history) {
        history.past.push({ color: history.current.color });
        history.current.color = color;
        history.future = [];
      }
    },
    pushFontSizeToPast: (
      state,
      action: PayloadAction<{ nodeId: string; fontSize: number }>
    ) => {
      const { nodeId, fontSize } = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history) {
        history.fontSize.past.push(history.fontSize.current);
        history.fontSize.current = fontSize;
        history.fontSize.future = [];
      }
    },
    undoColor: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history && history.past.length > 0) {
        const previous = history.past.pop()!;
        history.future.unshift({ color: history.current.color });
        history.current.color = previous.color;
      }
    },
    redoColor: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history && history.future.length > 0) {
        const next = history.future.shift()!;
        history.past.push({ color: history.current.color });
        history.current.color = next.color;
      }
    },
    undoFontSize: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history && history.fontSize.past.length > 0) {
        const previous = history.fontSize.past.pop()!;
        history.fontSize.future.unshift(history.fontSize.current);
        history.fontSize.current = previous;
      }
    },
    redoFontSize: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const history = state.nodeHistories[nodeId];
      if (history && history.fontSize.future.length > 0) {
        const next = history.fontSize.future.shift()!;
        history.fontSize.past.push(history.fontSize.current);
        history.fontSize.current = next;
      }
    },
  },
});

export const {
  initializeNodeHistory,
  pushColorToPast,
  pushFontSizeToPast,
  undoColor,
  redoColor,
  undoFontSize,
  redoFontSize,
} = historySlice.actions;

export default historySlice.reducer;
