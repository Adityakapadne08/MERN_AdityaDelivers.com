import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";


const router = express.Router();
//api/my/user   request ll come from index.ts to this routes
router.get("/",jwtCheck,jwtParse, MyUserController.getCurrentUser)
//api/my/user
//if we get a req to a backened and a post reqst this handler gets called and pass the rqst on  MyUserController.createCurrentUser

//here in createCurrentUser as it reaches the rqst here it gets to the controller going thrgh all conditions .
router.post("/",jwtCheck, MyUserController.createCurrentUser);

router.put(
  "/",jwtCheck,jwtParse,validateMyUserRequest,
  MyUserController.updateCurrentUser
);



export default router;

