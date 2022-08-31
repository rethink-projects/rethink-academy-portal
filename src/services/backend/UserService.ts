import axios from "axios";

export const getUserFromBackend = async (email: string) => {
  try {
    console.log("getUserFromBackend");

    const { data } = await axios.get(`http://localhost:4000/api/user/${email}`);
    return data.user;
  } catch (error) {
    console.log(error);
    return;
  }
};
