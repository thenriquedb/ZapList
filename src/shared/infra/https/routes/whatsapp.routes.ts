import { Router } from "express";
import bodyParser from "body-parser";

import { BotManagerRequestController } from "@modules/Bot/useCases/BotManager";

const whatsappRoutes = Router();

whatsappRoutes.use(bodyParser.urlencoded({ extended: true }));

const botManagerRequestController = new BotManagerRequestController();

whatsappRoutes.post("/", (request, response) =>
  botManagerRequestController.handle(request, response)
);

export { whatsappRoutes };
