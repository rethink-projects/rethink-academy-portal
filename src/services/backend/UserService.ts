import { api } from "./Api";

export const changeUserAvatar = async (avatar: string, email: string) => {
  try {
    console.log("mudou avatar");
    const { data } = await api.patch(`/user/${email}`, { avatar });
    console.log({ data });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

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

export const update = async (userData: any, email: string) => {
  try {
    const { data } = await api.patch(`/user/${email}`, userData);
    console.log(data);
  } catch (error) {
    console.log(error);
    return;
  }
};
