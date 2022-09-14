import axios from "axios";

export const getCommentsFromUser = async (email: string) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/comments/${email}`
  );
  return data;
};

export const createComment = async ({
  text,
  userEmail,
  commentAuthor,
}: {
  text: string;
  userEmail: string;
  commentAuthor: string;
}) => {
  const { data } = await axios.post(`http://localhost:4000/api/comments`, {
    text,
    userEmail,
    commentAuthor,
  });
  return data;
};

export const removeComment = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/comments/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
