import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import { localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// google login
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
        ? process.env.CALLBACK_URL
        : "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      if (!profile) return done(null, false);
      return done(null, profile);
    }
  )
);

// cors
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;
