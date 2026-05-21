import { useState, useCallback } from "react";
import { Section } from "@/types";

export function useUndoRedo() {
  const [history, setHistory] = useState<Section[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const push = useCallback((sections: Section[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(sections)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      return history[historyIndex - 1];
    }
    return null;
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      return history[historyIndex + 1];
    }
    return null;
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return { push, undo, redo, canUndo, canRedo };
}
