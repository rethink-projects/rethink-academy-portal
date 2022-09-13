import { ICurrentUser } from "../context/AuthContext";

export const titleMaker = (user: ICurrentUser) => {
  // if (!user.main || !user.role) throw new Error("teste");
  console.log(user);
  if (!user) return "";
  else {
    let role = user.role.toLowerCase();
    let main = user.main.toLowerCase();
    role = role.replace(role[0], role[0].toUpperCase());
    main = main.replace(main[0], main[0].toUpperCase());
    return `${role} of ${main}`;
  }
};
