import axios from "axios";

export const getUserBucket = async (email: string) => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/bucket", {
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
    const { data } = await axios.get(
      "http://localhost:4000/api/bucket/" + title,
      {
        params: { email },
      }
    );
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
    console.log({ url, title, email });
    const { data } = await axios.post("http://localhost:4000/api/bucket/", {
      url,
      title,
      email,
    });
    console.log({ data });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
