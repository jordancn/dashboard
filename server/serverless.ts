import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const main = async () => {
  const server = new ApolloServer({
    typeDefs: await getTypeDefs(),
    resolvers,
    plugins: [
      {
        async serverWillStart() {
          console.info("🚀  GraphQL Server is starting...");
        },
      },
    ],
  });

  // Create a handler for Vercel
  const handler = startServerAndCreateNextHandler(server, {
    context: async () => context(),
  });

  return handler;
};

export default main();
