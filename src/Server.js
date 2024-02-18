import path from 'node:path';
import express from 'express';
import { URL } from 'url';
import { CorsMiddleware } from './middlewares/cors.middleware.js';

const __dirname = new URL('.', import.meta.url).pathname;

export class Server {

  constructor({ app, port, routes, acceptedOrigins, publicPath = 'public', serverListener }) {
    this.app = app;
    this.port = port;
    this.routes = routes;
    this.acceptedOrigins = acceptedOrigins;
    this.publicPath = publicPath;
    this.serverListener = undefined;
  }

  async start() {

    //* Middlewares
    this.app.use(CorsMiddleware.corsAllow({acceptedOrigins: this.acceptedOrigins}))
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.disable('x-powered-by');

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });

  }

  close() {
    this.serverListener?.close();
  }

}