import axios from "axios";

export const getBucket = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/bucket/");
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const upsertBucket = async () => {
  try {
    const { data } = await axios.post("http://localhost:4000/api/bucket/");
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
