import { IPatientDocument } from '../db/models/patient.model.js';
import Resource from './resource.js';

interface IPatientResourceResponse {
  id: IPatientDocument['id'];
  time_start: IPatientDocument['timeStart'];
  time_end: IPatientDocument['timeEnd'];
  name?: IPatientDocument['name'];
  time?: number;
  date_of_birth?: IPatientDocument['dateOfBirth'] | string;
  errors?: Error;
}

export default class PatientResource extends Resource {
  async toResponse(item: any): Promise<IPatientResourceResponse> {
    return {
      id: item.id,
      time: item.time,
      time_start: item.timeStart,
      time_end: item.timeEnd,
      date_of_birth: item.dateOfBirth || item.date_of_birth,
      name: item.name,
      errors: item.errors,
    };
  }
}
