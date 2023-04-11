import express from "express";
import {
  home,
  melonChart,
  youtubeInfoFromUrl,
  youtubeInfoFromKeyword,
} from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/youtubeUrl", youtubeInfoFromUrl);
rootRouter.get("/youtubeKeyword", youtubeInfoFromKeyword);
rootRouter.get("/refreshChart", melonChart);

export default rootRouter;
