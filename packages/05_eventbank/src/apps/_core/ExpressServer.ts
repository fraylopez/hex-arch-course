import express from "express";
import http from "http";

type HttpMethod = "get" | "post" | "put" | "delete";

export class ExpressServer {
  private readonly http: http.Server;
  private readonly router: express.Express;
  constructor(private readonly port: number) {
    this.router = express();
    this.router.use(express.json());
    this.http = http.createServer(this.router);
  }

  public addRoute(method: HttpMethod, route: string, handler: express.RequestHandler) {
    this.router[method](route, handler);
  }

  public start() {
    this.http.listen(this.port);
    console.log(`Server started on port ${this.port}`);
  }
}
