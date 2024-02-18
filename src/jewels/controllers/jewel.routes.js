import { Router } from "express";
import {JewelsController} from "./jewels.controller.js";
import {JewelService} from "../services/jewel.service.js";


export class JewelRoutes {

  static get routes() {

    const jewelRouter = Router();
    const jewelService = new JewelService();
    const jewelController = new JewelsController(jewelService);

      jewelRouter.get('/', jewelController.getJewels);
      jewelRouter.get('/joya/:jewelId', jewelController.getJewelById);
      jewelRouter.get('/filtros', jewelController.getJewelsByFilters);

    return jewelRouter;
  }

}