import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  //Al menos que quiera una inyección de dependencias entonces vamos a crear una instancia, caso contrario vamos a trabajar con métodos estáticos

  static get routes(): Router {
    const router = Router();
    //use es usado por middlewares
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
