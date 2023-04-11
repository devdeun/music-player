import express from "express";
import { home, melonChart, youtubeInfo } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/youtubeUrl", youtubeInfo);
rootRouter.get("/refreshChart", melonChart);

export default rootRouter;
