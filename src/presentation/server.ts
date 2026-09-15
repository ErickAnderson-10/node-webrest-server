import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

//Si nosotros reiniciamos el servidor, todo lo que hemos avanzado se perderá xq todo está en momoria
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares(Una función que se va a ejecutar cuando una peticion pase por allí)
    //Middleware para parsear la informacion que viene en el body y lo haga JSON(Cualquier peticion que pase por el servidor pasa por aquí, y si viene un body entonces lo hace json)
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder - "Todo lo que esté dentro de public/ puede ser servido directamente al navegador."
    //use() sirve principalmente para registrar middlewares.
    //estás registrando el middleware de archivos estáticos.
    this.app.use(express.static(this.publicPath));

    //* Routes

    this.app.use(this.routes);

    //* SPA - "Para una petición GET quse no haya sido atendida anteriormente, ejecuta esta función."
    //"Busca el index.html de mi aplicación y envíalo al navegador."
    //Esto es muy común cuando tienes una aplicación frontend tipo SPA (Single Page Application).
    //path es un módulo de Node para trabajar con rutas del sistema de archivos.
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
