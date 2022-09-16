import { api } from "./Api";

export const getUserBadges = async (email: string) => {
  try {
    const { data } = await api.get("/badge/" + email);
    delete data.id;
    delete data.userId;
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const giveBadge = async (
  badge: string,
  email: string,
  description: string
) => {
  try {
    const { data } = await api.post("/badge/", {
      badge,
      email,
      description,
    });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
