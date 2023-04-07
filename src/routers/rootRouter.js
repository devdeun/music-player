import express from "express";
import { home, searchResult } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", searchResult);

export default rootRouter;
