import { createServer } from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { env } from "./env.js";
import { prisma } from "./lib/prisma.js";
import { connectRedis } from "./lib/redis.js";

async function main() {
  await prisma.$connect();
  connectRedis();

  const app = createApp();
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: env.WEB_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.emit("hello", { message: "gitbattle", socketId: socket.id });
  });

  httpServer.listen(env.PORT, () => {
    console.log(`API + Socket.IO listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
