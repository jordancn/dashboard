import schema from "./schema.gql";

export const getTypeDefs = async () => {
  const typeDefs = schema;

  return typeDefs;
};
