import { users } from "../models/userModel.js";

export const getAllUsers = () => {
  return users;
};

export const getUserById = (id) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = async (newUser) => {
  const isEmailExist = users.find((user) => user.email === newUser.email);

  if (isEmailExist) {
    const error = new Error("Email Already used");
    error.statusCode = 400;
    throw error;
  }

  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const user = { id, ...newUser };
  users.push(user);
  return user;
};
