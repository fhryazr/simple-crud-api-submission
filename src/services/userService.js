import { users } from "../models/userModel.js";

let lastUserId = users.length;

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

  const newId = lastUserId + 1;
  const user = { id: newId, ...newUser };
  users.push(user);

  lastUserId = newId;
  return user;
};

export const deleteUser = async (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  if (index === -1) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const deletedUser = users[index];
  users.splice(index, 1);

  return deletedUser;
};
