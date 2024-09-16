import express from "express";
import MyUserController from "../controllers/MyUserController";


const router = express.Router();
//api/my/user   request ll come from index.ts to this routes
router.get("/", MyUserController.createCurrentUser)
//api/my/user
//if we get a req to a backened and a post reqst this handler gets called and pass the rqst on  MyUserController.createCurrentUser

//here in createCurrentUser as it reaches the rqst here it gets to the controller going thrgh all conditions .
router.post("/", MyUserController.createCurrentUser);
router.put(
  "/",
  MyUserController.createCurrentUser
);



export default router;

