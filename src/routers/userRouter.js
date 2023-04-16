import express from "express";
import { updatePlaylist } from "../controllers/playlistController";
import { userInfo } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userInfo);
userRouter.post("/playlist", updatePlaylist);

export default userRouter;
