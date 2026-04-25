import axiosInstance from "./axiosInstance";

export const getTasks = () => axiosInstance.get("/tasks");
export const createTask = (data: { task: string; date: string }) =>
  axiosInstance.post("/tasks", data);
export const updateTask = (id: string, data: { task: string; date: string }) =>
  axiosInstance.patch(`/tasks/${id}`, data);