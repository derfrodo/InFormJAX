// The ApolloServer constructor requires two parameters: your schema
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

import { schema } from "./api/graphql/schema.mjs";
import { getGame } from "./api/utils/getGame.mjs";

import { config } from "dotenv";
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { join } from "path";
import { WebSocketServer } from 'ws';

import { getLaunchInfoRepository } from "./data/LaunchInfoRepository.mjs";
import { getWheelSettingsRepo } from "./data/WheelSettingsRepo.mjs";
import { getWheelValuesRepo } from "./data/WheelValuesRepo.mjs";
import { getGameRepo } from "./data/GameRepo.mjs";

config();
config({ path: join(process.cwd(), '.env.local') });

try {

    console.log('Create express')
    const app = express();
    const httpServer = http.createServer(app);

    console.log('Add websockets')
    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: "/graphql",
        //   path: '/subscriptions',
    });

    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer);

    console.log('Create server')
    const server = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();
    console.log('Create server')
    app.use('/', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
    // app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

    const game = await getGame();
    await game.update({
        isRunning: false,
        lastUpdate: performance.now(),
        isRoundDone: true,
        resultId: null,
        canToggle: true,
    });

    (await getLaunchInfoRepository()).create({ initialized: true })
    const wheelSettingsRepo = await getWheelSettingsRepo()
    const settings = await wheelSettingsRepo.findOne({ where: { id: 1 } });
    const settings2 = await wheelSettingsRepo.findAll();
    console.log(JSON.stringify({
        settings,
        settings2,
    }));

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);

} catch (e) {
    console.log(`Application failed: ${e.message}`, e)
}