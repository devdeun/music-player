import express from "express";
import passport from "passport";
import { googleAuthCallback, logout } from "../controllers/userController";

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);
authRouter.get("/logout", logout);

export default authRouter;
