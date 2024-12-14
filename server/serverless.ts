import { context } from "@/context";
import { resolvers } from "@/resolvers";
import { getTypeDefs } from "@/schema/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import fs from "fs";
import path from "path";

/**
 * Recursively lists all files and directories starting from the given directory.
 * @param dirPath - The directory to start from.
 * @param arrayOfFiles - Used for recursion to accumulate files.
 * @returns A list of all files and directories.
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles); // Recurse into subdirectory
      } else {
        arrayOfFiles.push(fullPath);
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
  });

  return arrayOfFiles;
}

// Use the function to log all files starting from the current directory
console.log("Recursively listing all files:");
console.log(JSON.stringify(getAllFiles(path.resolve("/")), null, 2));

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
