import { api } from "./Api";

export const getUserFromBackend = async (email: string) => {
  try {
    const { data } = await api.get(`/user/${email}`);

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await api.get(`/user`);

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getAllStudents = async () => {
  try {
    const { data } = await api.get("/user?role=STUDENT");
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
