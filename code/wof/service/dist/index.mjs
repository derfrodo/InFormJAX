// The ApolloServer constructor requires two parameters: your schema
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./api/graphql/schema.mjs";
import { getQueryResolvers } from "./api/graphql/registerQuery.mjs";
import { printSchema } from "graphql";
try {
    console.log('Create server');
    const e = schema.getMutationType();
    const server = new ApolloServer({
        typeDefs: printSchema(schema),
        resolvers: getQueryResolvers(),
    });
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
catch (e) {
    console.log(`Application failed: ${e.message}`, e);
}
