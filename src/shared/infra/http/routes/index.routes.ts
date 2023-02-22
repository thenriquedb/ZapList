import { Router } from "express";
import bodyParser from "body-parser";

import { BotManagerRequestController } from "@modules/Bot/useCases/BotDispatcher";

const routes = Router();

routes.use(bodyParser.urlencoded({ extended: true }));

const botManagerRequestController = new BotManagerRequestController();

routes.post("/", (request, response) =>
  botManagerRequestController.handle(request, response)
);

export { routes };
