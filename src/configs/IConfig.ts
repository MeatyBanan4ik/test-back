interface IHttp {
  host: string;
  port: number;
}

interface IConfig {
  http: IHttp;
  db: string;
}

export { IConfig };
