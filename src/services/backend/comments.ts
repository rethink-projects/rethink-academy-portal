import { api } from "./Api";

export const getCommentsFromUser = async (email: string) => {
  const { data } = await api.get(`/comments/${email}`);
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
  const { data } = await api.post(`/comments`, {
    text,
    userEmail,
    commentAuthor,
  });
  return data;
};

export const removeComment = async (id: string) => {
  try {
    const { data } = await api.delete(`/comments/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
