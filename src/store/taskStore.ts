import { create } from "zustand";

type TypeTaskInfo = {
  totalTask: number | null;
  remainingTask: number | null;
};
type TaskState = {
  totalTask: number | null;
  remainingTask: number | null;
  setTaskInfo: (params: TypeTaskInfo) => void;
};

export const useTaskStore = create<TaskState>()((set) => ({
  totalTask: null,
  remainingTask: null,

  setTaskInfo: (params) => {
    set(params);
  },
}));
