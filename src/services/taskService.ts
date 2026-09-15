import api from "../lib/axios";
import { TASK } from "./apiUrls";

type TaskPayload = {
  id?: number;
  task: string;
};

export const addTask = (payload: TaskPayload) => {
  return api.post(`${TASK}/add`, payload);
};

export const editTask = (payload: TaskPayload) => {
  return api.post(`${TASK}/edit/${payload?.id}`, payload);
};

export const deleteTask = (payload: TaskPayload) => {
  return api.post(`${TASK}/delete/${payload?.id}`, payload);
};
