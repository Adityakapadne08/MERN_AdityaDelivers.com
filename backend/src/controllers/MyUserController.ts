import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  //1) check if user exists
  //2) create the user if it dosent exist
  //3)returm the user object to the calling client.

  try {
    // auth0Id passed from the frontend
    const { auth0Id } = req.body;
    //this will find any user that has auth0Id store inside it
    const existingUser = await User.findOne({ auth0Id });

    //if we have the existing user ...
    if (existingUser) {
      return res.status(200).send();
    }
    //if user not exist ....create a user
    const newUser = new User(req.body);
    await newUser.save();
    //to complete the reqst..
    //toObject() does converts doc to a J.s plain object.
    res.status(201).json(newUser.toObject());
  } catch (error) {
    //always provide the error object,
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};
