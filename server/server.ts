import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const main = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs: await getTypeDefs(),
  });

  // Start the standalone server and pass the context
  const { url } = await startStandaloneServer(server, {
    context: async () => context(),
    listen: { port: 4000 },
  });

  console.info(`🚀  GraphQL Server ready at ${url}`);
};

void main();
