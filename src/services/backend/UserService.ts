import axios from "axios";

export const getUserFromBackend = async (email: string) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/user/${email}`);
    return data.user;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getAllStudent = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/user?role=STUDENT"
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
