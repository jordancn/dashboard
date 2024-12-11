import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { context, prisma } from "./context";
import { resolvers } from "./resolvers";
import { getTypeDefs } from "./schema/schema";

const main = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs: await getTypeDefs(),
    plugins: [ApolloServerPluginLandingPageDisabled()],
    context,
  });

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  server.listen(5999).then(({ url }) => {
    console.info(`🚀  GraphQL Server ready at ${url}`);
  });
};

void main();
