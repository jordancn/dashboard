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

  await server.start();

  return server.createHandler({
    path: "/api/graphql", // Used for serverless platforms
  });
};

export default main();
