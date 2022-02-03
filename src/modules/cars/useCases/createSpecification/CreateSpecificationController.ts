import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    this.createSpecificationUseCase.execute(req.body);

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
