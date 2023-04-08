import express from "express";
import { home, youtubeInfo } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/youtubeUrl", youtubeInfo);

export default rootRouter;
