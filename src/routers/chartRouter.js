import express from "express";
import { top100chart } from "../controllers/chartController";

const chartRouter = express.Router();

chartRouter.get("/", top100chart);

export default chartRouter;
