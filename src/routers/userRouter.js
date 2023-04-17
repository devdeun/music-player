import express from "express";
import { deleteSong, updatePlaylist } from "../controllers/playlistController";
import {
  userInfo,
  myPage,
  updateUserInfo,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userInfo);
userRouter.put("/", updateUserInfo);
userRouter.get("/myPage", myPage);
userRouter.post("/playlist", updatePlaylist);
userRouter.delete("/playlist", deleteSong);

export default userRouter;
