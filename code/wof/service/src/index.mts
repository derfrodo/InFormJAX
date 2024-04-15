// The ApolloServer constructor requires two parameters: your schema
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { printSchema, } from "graphql";
import { getQueryResolvers } from "./api/graphql/registerQuery.mjs";
import { schema } from "./api/graphql/schema.mjs";

import { config } from "dotenv";
import { join } from "path";

config();
config({ path: join(process.cwd(), '.env.local') });
try {
    console.log('Create server')

    const server = new ApolloServer({
        typeDefs: printSchema(schema),
        resolvers: {
            Query: getQueryResolvers(),
            DisplaySettings: {
                showResultForMS: {
                    resolve() { return 12000 }
                }
            }
            // GameSettingsType?: GameSettingsTypeResolvers<ContextType>;
            // Mutation?: MutationResolvers<ContextType>;
            // Query?: QueryResolvers<ContextType>;
            // WheelPart?: WheelPartResolvers<ContextType>;
            // WheelSettings?: WheelSettingsResolvers<ContextType>;
        }

    });
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);

} catch (e) {
    console.log(`Application failed: ${e.message}`, e)
}