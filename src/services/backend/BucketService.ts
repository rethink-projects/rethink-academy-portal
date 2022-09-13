import { api } from "./Api";

export const getUserBucket = async (email: string) => {
  try {
    const { data } = await api.get("/bucket", {
      params: { email },
    });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getOneBucket = async (title: string, email: string) => {
  try {
    const { data } = await api.get("/bucket/" + title, {
      params: { email },
    });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const upsertBucket = async (
  url: string,
  title: string,
  email: string
) => {
  try {
    const { data } = await api.post("/bucket/", {
      url,
      title,
      email,
    });
<<<<<<< HEAD
    console.log({ data });
=======
>>>>>>> 575e65e7acfb83322d20043742fc00d9c013e943
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
