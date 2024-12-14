import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";

const main = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs: await getTypeDefs(),
    plugins: [ApolloServerPluginLandingPageDisabled()],
    context,
  });

  console.log("Starting Apollo Server");

  await server.start();

  console.log("Apollo Server started");

  console.log("Creating Apollo Server handler");

  const handler = server.createHandler({
    path: "/api/graphql", // Used for serverless platforms
  });

  console.log("Apollo Server handler created");

  return handler;
};

console.log("Serverless");

console.log(
  "Database URL",
  process.env.DATABASE_URL?.replace(/\:.*@/g, ":[REDACTED]@")
);

export default main();
