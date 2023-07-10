import PatientModel from '../db/models/patient.model.js';
import Service from './service.js';

export default class PatientService extends Service {
  constructor() {
    super(PatientModel);
  }
}
