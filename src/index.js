import express from 'express';
import { envs } from './config/plugins/envs.js';
import { AppRouter } from './routes/v1/app.routes.js';
import { Server } from './Server.js';

// Servidor de Express.
const app = express();

// Función de arranque.
const main = async () => {
  const server = new Server({
    app,
    port: envs.PORT,
    routes: AppRouter.routes,
    acceptedOrigins: [], // Acepta todos los orígenes
  });

  await server.start();
}

// Inicialización.
(async () => {
  await main();
})();