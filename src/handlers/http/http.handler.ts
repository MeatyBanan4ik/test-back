import { Request, Response } from 'express';

export interface IHttpHandler {
  service: any;
  resource: any;
  create: (req: Request, res: Response) => Promise<void>;
  clear: (req: Request, res: Response) => Promise<void>;
}

export default class HttpHandler implements IHttpHandler {
  readonly service: any;
  readonly resource: any;
  constructor(Service: any, Resource: any) {
    this.service = new Service();
    this.resource = new Resource();
  }

  async create(req: Request, res: Response): Promise<void> {
    if (Object.keys(req._validated).length === 0) {
      return res._success({
        data: {
          validated: [],
          unvalidated: await this.resource.toResponse(req._unvalidated),
        },
      });
    }

    await this.service.create(req._validated);

    return res._success({
      data: {
        validated: await this.resource.toResponse(req._validated),
        unvalidated: await this.resource.toResponse(req._unvalidated),
      },
    });
  }

  async clear(req: Request, res: Response): Promise<void> {
    res._success({ data: await this.service.clear() });
  }
}
