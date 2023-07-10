import DoctorModel from '../db/models/doctor.model.js';
import Service from './service.js';

export default class DoctorService extends Service {
  constructor() {
    super(DoctorModel);
  }
}
