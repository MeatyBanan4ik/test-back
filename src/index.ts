import Mongoose from 'mongoose';
import config from './configs/config.js';
import HttpServer from './http-server.js';
import ValidatorProvider from './providers/validator.provider.js';

async function init(): Promise<void> {
  await Mongoose.connect(config.db);
  ValidatorProvider();
  await HttpServer.up(config.http.port, config.http.host);
}

init();
