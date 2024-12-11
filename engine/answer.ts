import * as axios from "axios";
import OpenAI from "openai";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your environment variables
});

// Configuration for GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "";
const GRAPHQL_HEADERS = {
  "Content-Type": "application/json",
  //   Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`, // Set this in your environment variables
};

// Function to dynamically generate a GraphQL query based on the user's question
async function generateGraphQLQuery(
  question: string,
  schema: string,
  context: string
) {
  console.log("💖 Generating GraphQL query...");

  const prompt = `Given the following GraphQL schema:\n${schema}\n\nContext:\n${context}\n\nGenerate a GraphQL query or series of queries based on the user's question: \"${question}\". Ensure queries are detailed and include necessary filters. Return only the GraphQL query.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that generates and manages iterative GraphQL queries based on user input, schema, and context.",
      },
      { role: "user", content: prompt },
    ],
  });

  // Extract the query part from the response
  const queryMatch = response.choices[0].message?.content?.match(
    /```graphql\n([\s\S]*?)\n```/
  );
  if (queryMatch && queryMatch[1]) {
    return queryMatch[1].trim();
  }

  console.error("Failed to extract the query from the response.");
  return "";
}

// Function to execute the GraphQL query
async function executeGraphQLQuery(query: string) {
  console.log("🏃🏻 Executing GraphQL query:", query);

  try {
    const response = await axios.default.post(
      GRAPHQL_ENDPOINT,
      { query },
      { headers: GRAPHQL_HEADERS }
    );

    if (response.data.errors) {
      throw new Error(
        `GraphQL Errors: ${JSON.stringify(response.data.errors)}`
      );
    }

    return response.data.data;
  } catch (error) {
    console.error("Error executing GraphQL query:", error);
    throw error;
  }
}

// Function to parse the GraphQL response with OpenAI and decide next steps
async function parseGraphQLResponse(
  question: string,
  response: any,
  context: string
) {
  console.log("🔍 Parsing GraphQL response...");

  const inputText = `User's question: \"${question}\"\nGraphQL Response:\n${JSON.stringify(
    response,
    null,
    2
  )}\n\nContext:\n${context}\n\nBased on the response, determine if additional queries are needed. If needed, explain what additional data should be retrieved and why. If the user's question is fully answered, summarize the findings clearly.`;

  const openAIResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that interprets GraphQL responses, generates next steps, and manages context for iterative queries.",
      },
      { role: "user", content: inputText },
    ],
  });

  return openAIResponse.choices[0].message?.content || "";
}

(async () => {
  try {
    // Read the GraphQL schema from a file
    const schema = fs.readFileSync("schema.gql", "utf8");

    // Example: User's initial question
    let question = `How much did I spend on groceries in Feb 2024 within the "Personal" entity? You may need to fetch the entities first to determine the proper entityId. Also fetch the categories to get names and identifiers`;
    let context = "";
    let iteration = 0;

    while (true) {
      iteration++;
      console.log(`Iteration ${iteration}: Generating GraphQL query...`);
      const query = await generateGraphQLQuery(question, schema, context);
      if (!query) {
        console.error("No valid query generated. Stopping iteration.");
        break;
      }

      console.log("Generated Query:", query);

      console.log("Executing GraphQL query...");
      const graphQLResponse = await executeGraphQLQuery(query);

      console.log("Parsing GraphQL response with OpenAI...");
      const parsedResult = await parseGraphQLResponse(
        question,
        graphQLResponse,
        context
      );

      console.log(`Iteration ${iteration}: Parsed Result:`);
      console.log(parsedResult);

      // Check if OpenAI indicates the process should stop
      if (parsedResult.toLowerCase().includes("fully answered")) {
        console.log("Query process completed. Final result:");
        console.log(parsedResult);
        break;
      }

      // Update the question and context for the next iteration
      question = "Continue based on the above context.";
      context += `\nIteration ${iteration} Response: ${JSON.stringify(
        graphQLResponse,
        null,
        2
      )}`;
    }
  } catch (error) {
    console.error("🛑");
    // console.error("An error occurred:", error);
  }
})();
