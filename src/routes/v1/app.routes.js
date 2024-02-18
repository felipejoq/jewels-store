import { Router } from "express";
import {JewelRoutes} from "../../jewels/controllers/jewel.routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/joyas', JewelRoutes.routes);

    return AppRouter;
  }

}