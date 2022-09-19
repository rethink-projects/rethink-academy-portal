import axios from "axios";
import { api } from "./Api";

export const getSingleTask = async (id: string) => {
  try {
    const { data } = await api.put(`/tasks/single/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getTaskByUserEmail = async (email: string) => {
  try {
    const { data } = await api.get(`/tasks/${email}`);
    return data.studentTasks;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createTask = async (taskData: any) => {
  const { data } = await api.post(`/tasks`, taskData);
  return data;
};

export const updateTask = async (id: string) => {
  try {
    const { data } = await api.put(`/tasks/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getDateFilter = async (
  email: string,
  startDate: string,
  endDate: string
) => {
  try {
    const { data } = await api.post(`/tasks/${email}`, { startDate, endDate });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getGroupTaskByTag = async (email: string) => {
  try {
    const { data } = await api.get(`/tasks/tag/${email}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getRecordOfDay = async (email: string) => {
  try {
    const { data } = await api.get(`/tasks/day/${email}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const removeTask = async (id: string) => {
  try {
    const { data } = await api.delete(`http://localhost:4000/api/tasks/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getHoursLastDay = async (email: string) => {
  try {
    const { data } = await api.get(
      `http://localhost:4000/api/tasks/hours/${email}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getHoursOfThreeLastDays = async (email: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/tasks/day/hours/${email}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getHoursOfMonth = async (email: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/tasks/month/hours/${email}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
