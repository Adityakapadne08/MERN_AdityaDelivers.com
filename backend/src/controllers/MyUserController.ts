import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {

  try{
const currentUser = await User.findOne({_id: req.userId});
if(!currentUser){
  return res.status(404).json({message:"user not found"});
}
res.json(currentUser);
  }catch (error) {
    //always provide the error object,
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


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

const updateCurrentUser= async (req:Request, res: Response)=>{
  try{
    const {name,addressLine1, country,city}= req.body;
    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    //here we update the user depending on the input if no user exist .
    user.name = name;
    user.addressLine1= addressLine1;
    user.city= city;
    user.country= country;

    await user.save();
res.send(user);
  }catch(error){
    console.log(error);
    res.status(500).json
  }
}
export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
