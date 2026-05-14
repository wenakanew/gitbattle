import { Router } from "express";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import type { Profile } from "passport-github2";
import { prisma } from "../lib/prisma.js";
import { env, isGitHubOAuthConfigured } from "../env.js";
import { COOKIE_NAME, signUserToken } from "../lib/jwt.js";
import { requireAuth } from "../middleware/optionalAuth.js";

export function createAuthRouter(): Router {
  const router = Router();

  if (
    env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    env.GITHUB_CALLBACK_URL
  ) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: env.GITHUB_CLIENT_ID,
          clientSecret: env.GITHUB_CLIENT_SECRET,
          callbackURL: env.GITHUB_CALLBACK_URL,
          scope: ["read:user", "user:email"],
        },
        async (
          _accessToken: string,
          _refreshToken: string,
          profile: Profile,
          done: (err: Error | null, user?: unknown) => void,
        ) => {
          try {
            const githubId = String(profile.id);
            const username =
              profile.username ??
              profile.displayName ??
              `github-${githubId}`;
            const avatarUrl = profile.photos?.[0]?.value;
            const raw = profile as { _json?: { bio?: string } };
            const bio =
              typeof raw._json?.bio === "string" ? raw._json.bio : undefined;

            const user = await prisma.user.upsert({
              where: { githubId },
              create: {
                githubId,
                username,
                avatarUrl,
                githubBio: bio,
                lastActive: new Date(),
              },
              update: {
                username,
                avatarUrl,
                githubBio: bio,
                lastActive: new Date(),
              },
            });
            done(null, user);
          } catch (err) {
            done(err as Error);
          }
        },
      ),
    );
  }

  passport.serializeUser((user, done) => {
    done(null, (user as { id: string }).id);
  });

  passport.deserializeUser(async (id: unknown, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  router.get("/github", (req, res, next) => {
    if (!isGitHubOAuthConfigured()) {
      res.status(503).json({
        error:
          "GitHub OAuth not configured — set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL",
      });
      return;
    }
    passport.authenticate("github")(req, res, next);
  });

  router.get(
    "/github/callback",
    (req, res, next) => {
      if (!isGitHubOAuthConfigured()) {
        res.redirect(`${env.WEB_ORIGIN}/?oauth=missing-config`);
        return;
      }
      passport.authenticate("github", {
        failureRedirect: `${env.WEB_ORIGIN}/?error=github`,
      })(req, res, next);
    },
    async (req, res) => {
      const user = req.user as { id: string } | undefined;
      if (!user?.id) {
        res.redirect(`${env.WEB_ORIGIN}/?error=no-user`);
        return;
      }

      req.logout((logoutErr) => {
        if (logoutErr) {
          console.error("passport logout", logoutErr);
        }
        const token = signUserToken({ id: user.id });
        const maxAge = 24 * 60 * 60 * 1000;
        const secure = env.NODE_ENV === "production";
        res.cookie(COOKIE_NAME, token, {
          httpOnly: true,
          sameSite: "lax",
          secure,
          maxAge,
          path: "/",
        });
        res.redirect(`${env.WEB_ORIGIN}/dashboard`);
      });
    },
  );

  router.post("/logout", (req, res) => {
    const secure = env.NODE_ENV === "production";
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
    });
    req.logout(() => {
      res.json({ ok: true });
    });
  });

  router.get("/me", requireAuth, (req, res) => {
    const u = req.user!;
    res.json({
      id: u.id,
      githubId: u.githubId,
      username: u.username,
      avatarUrl: u.avatarUrl,
      githubBio: u.githubBio,
      elo: u.elo,
      matchesPlayed: u.matchesPlayed,
      matchesWon: u.matchesWon,
      createdAt: u.createdAt,
    });
  });

  return router;
}
