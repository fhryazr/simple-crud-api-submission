import * as userService from "../services/userService.js";
import { createUserSchema } from "../utils/userValidation.js";

export const getAllUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);

    res.status(200).json({
      success: true,
      message: `Get id user ${id} successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: error,
        message: "Validation Error",
        errors: error.details.map((e) => e.message),
      });
    }
    const newUser = await userService.createUser(value);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await userService.deleteUser(id);

    res.status(200).json({
      status: "success",
      message: "Delete User Successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
