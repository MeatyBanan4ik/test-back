import { IDoctorDocument } from '../db/models/doctor.model.js';
import Resource from './resource.js';

interface IDoctorResourceResponse {
  id: IDoctorDocument['id'];
  time_start: IDoctorDocument['timeStart'];
  time_end: IDoctorDocument['timeEnd'];
  time?: string;
  name?: IDoctorDocument['name'];
  date_of_birth?: IDoctorDocument['dateOfBirth'] | string;
  errors?: Error;
}

export default class DoctorResource extends Resource {
  async toResponse(item: any): Promise<IDoctorResourceResponse> {
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
