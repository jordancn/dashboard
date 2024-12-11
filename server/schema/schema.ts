import * as fs from "fs";

export const getTypeDefs = async () => {
  const typeDefs = await fs.promises.readFile("./schema/schema.gql", {
    encoding: "utf-8",
  });

  return typeDefs;
};
