import { Document } from 'mongoose';

interface IService {
  model: any;
  createFromArr(data: Array<any>): Promise<Array<Document>>;
  clear(): Promise<Number>;
}

export default class Service implements IService {
  model: any;
  constructor(Model: any) {
    this.model = Model;
  }

  public async createFromArr(data: Array<any>): Promise<Array<Document>> {
    return this.model.create(data);
  }

  public async clear(): Promise<Number> {
    return (await this.model.deleteMany()).deletedCount;
  }
}
