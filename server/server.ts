import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
};

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(cors(corsOptions));

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs: await getTypeDefs(),
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async () => context(),
    })
  );

  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  io.on("connection", async (socket) => {
    console.log("[A USER CONNECTED]");

    socket.on("hello", (data) => {
      const { message } = data;

      console.log("[RECEIVED DATA]", message);

      socket.emit("hello", {
        message: `ECHO ${message}`,
        date: new Date(),
      });
    });

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // console.log("[EMITTING DATA]");

    // socket.emit("hello", {
    //   message: "Hello from the server",
    // });
  });

  httpServer.listen(4000, () => {
    console.info(`🚀  GraphQL Server ready on port 4000`);
  });
};

void main();
