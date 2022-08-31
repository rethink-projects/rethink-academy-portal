import axios from "axios";

export const getUserFromBackend = async (email: string) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/user/${email}`);
    console.log({ user: data.name });

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
