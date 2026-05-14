import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { env } from "./env.js";
import { healthRouter } from "./routes/health.js";
import { createAuthRouter } from "./routes/auth.js";
import { optionalAuth } from "./middleware/optionalAuth.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true,
    }),
  );

  app.use(cookieParser());
  app.use(express.json());

  app.use(
    session({
      name: "gitbattle.sid",
      secret: env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        maxAge: 10 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(optionalAuth);

  app.get("/", (_req, res) => {
    res.json({ name: "gitbattle-server", version: "0.1.0" });
  });

  app.use("/", healthRouter);
  app.use("/auth", createAuthRouter());

  return app;
}
