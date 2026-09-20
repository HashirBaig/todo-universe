import api from "../lib/axios";
import { TASK } from "./apiUrls";

type TaskPayload = {
  id?: number;
  task: string;
};

export const getAllTaskByUser = () => {
  return api.get(`${TASK}/`);
};

export const addTask = (payload: TaskPayload) => {
  return api.post(`${TASK}`, payload);
};

export const editTask = (payload: TaskPayload) => {
  return api.put(`${TASK}/edit/${payload?.id}`, payload);
};

export const deleteTask = (payload: TaskPayload) => {
  return api.delete(`${TASK}/delete/${payload?.id}`);
};
