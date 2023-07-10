import express, { Express, Request, Response, NextFunction } from 'express';
import expressWs, { Instance } from 'express-ws';
import { v4 as uuidv4 } from 'uuid';
import ApiRoute from './routes/api.route.js';
import HttpException from './exceptions/http.exception.js';
import NotFoundException from './exceptions/notFound.exception.js';
import SocketService from './services/socket.service.js';

interface ISuccessResponse {
  data?: any;
  code?: number;
  message?: string | undefined;
}

declare global {
  namespace Express {
    export interface Request {
      _startTime?: number;
      _id?: string;
      _validated?: any;
      _unvalidated?: any;
    }
    export interface Response {
      _success: (res?: ISuccessResponse) => void;
    }
  }
}

export default class HttpServer {
  private static port: number;
  private static host: string;
  private static app: Express;
  private static wsInstance: Instance;

  public static async up(port: number, host: string): Promise<void> {
    this.port = port;
    this.host = host;
    this.app = express();
    this.wsInstance = expressWs(this.app);
    this.app.set('trust proxy', true);
    this.useCors();
    this.useRequestParsers();
    this.useRequestTrace();
    this.useResponseTrace();
    this.useRoutes();
    this.useErrorHandling();
    await new Promise((res) => {
      this.app.listen(this.port, this.host, () => {
        console.log(`App listening on ${this.host}:${this.port}!`);
        res(true);
      });
    });
  }

  private static useCors() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Max-Age', '600');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
      res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

      if (req.method === 'OPTIONS') {
        return res.send();
      }

      return next();
    });
  }

  private static useRequestParsers() {
    this.app.use(express.json());
  }

  private static useRequestTrace() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req._startTime = Date.now();
      req._id = uuidv4();
      res.setHeader('X-Request-Id', req._id);
      console.log(req._id, 'REQUEST', 'method:', req.method, 'uri:', req.url, 'body:', req.body, 'query:', req.query);
      next();
    });
  }

  private static useResponseTrace() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const { json } = res;

      res._success = function (successResponse: ISuccessResponse = {}): void {
        const { data = {}, code = 200, message } = successResponse;
        res.status(code).send({ status: true, data, message });
      };
      res.json = function (body: any): any {
        console.log(req._id, 'RESPONSE', 'code:', res.statusCode, 'body:', body);
        json.apply(res, [body]);
      };
      next();
    });
  }

  private static useRoutes() {
    this.app.use('/api', ApiRoute);
    this.wsInstance.app.ws('/', SocketService.init.bind(SocketService));
    this.app.use(() => {
      throw new NotFoundException();
    });
  }

  private static useErrorHandling() {
    this.app.use((err: HttpException, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || 500;
      const message = err.message;
      res.status(status).send({
        status: false,
        data: {},
        message,
      });
    });
  }
}
