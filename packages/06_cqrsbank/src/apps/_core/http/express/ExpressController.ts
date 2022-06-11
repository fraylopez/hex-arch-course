import assert from "assert";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { DomainErrorConstructor } from "../../../../contexts/_core/domain/DomainErrorConstructor";
import { HttpMethod } from "./HttpMethod";

export abstract class ExpressController {
  private readonly errors: Map<DomainErrorConstructor, { status: number; message?: string; }> = new Map();

  constructor(
    public readonly method: HttpMethod,
    public readonly route: string,
  ) {
    this.errors = new Map();
    assert(route.charAt(0) === "/", "Route must start with '/'");
  }

  async requestHandler(req: Request, res: Response) {
    try {
      const result = await this.run(req, res);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handledError = this.errors.get(error.constructor);
      if (handledError) {
        res.status(handledError.status).send({ message: handledError.message || error.message });
      } else {
        // console.log(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Sorry about that..." });
      }
    }
  }
  protected abstract run(req: Request, res: Response): any | Promise<any>;

  protected addHandledError(errorKlass: DomainErrorConstructor, status: number, message?: string) {
    this.errors.set(errorKlass, { status, message });
  }
}
