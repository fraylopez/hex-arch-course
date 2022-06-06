import express from "express";
import http from "http";
import { ExpressController } from "./ExpressController";

export class ExpressServer {
  private readonly http: http.Server;
  private readonly router: express.Express;
  constructor(private readonly port: number) {
    this.router = express();
    this.router.use(express.json());
    this.http = http.createServer(this.router);
  }

  public addRouteController(controller: ExpressController) {
    this.router[controller.method](
      controller.route,
      controller.requestHandler.bind(controller) as any
    );
  }

  public start() {
    this.http.listen(this.port);
    console.log(`Server started on port ${this.port}`);
  }
}
