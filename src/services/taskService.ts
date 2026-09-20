import api from "../lib/axios";
import { TASK } from "./apiUrls";

type TYPE_TASK_PAYLOAD = {
  id?: number;
  task?: string;
  isCompleted?: boolean;
};

type TYPE_GET_TASK_LIST_BY_USER = {
  filter: string;
};

export const getTaskListByUser = (params: TYPE_GET_TASK_LIST_BY_USER) => {
  return api.get(`${TASK}?task_type=${params?.filter}`);
};

export const addTask = (payload: TYPE_TASK_PAYLOAD) => {
  return api.post(`${TASK}`, payload);
};

export const editTask = (payload: TYPE_TASK_PAYLOAD) => {
  return api.put(`${TASK}/${payload?.id}`, payload);
};

export const deleteTask = (payload: TYPE_TASK_PAYLOAD) => {
  return api.delete(`${TASK}/${payload?.id}`);
};
