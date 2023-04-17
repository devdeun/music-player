import express from "express";
import { deleteSong, updatePlaylist } from "../controllers/playlistController";
import { userInfo, myPage } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userInfo);
userRouter.get("/myPage", myPage);
userRouter.post("/playlist", updatePlaylist);
userRouter.delete("/playlist", deleteSong);

export default userRouter;
