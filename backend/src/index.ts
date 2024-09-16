import express,{Request,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from "./routes/MyUserRoutes"

mongoose
.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>
console.log('connected to Database'));

const app = express();
app.use(express.json())
app.use(cors())

//anyone typing this /api/my/user will ahead open this route myUserRoute
app.use("/api/my/user", myUserRoute)
// app.get("/test", async(req:Request, res:Response)=>{
// res.json({message:"Hello!"});
// });


//app.post("/api/my/user", myUserRoute)

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
