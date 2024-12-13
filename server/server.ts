import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";

const main = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs: await getTypeDefs(),
    plugins: [ApolloServerPluginLandingPageDisabled()],
    context,
  });

  server.listen(5999).then(({ url }) => {
    console.info(`🚀  GraphQL Server ready at ${url}`);
  });
};

void main();
