import { IAppointmentDocument } from '../db/models/appointment.model.js';
import Resource from './resource.js';

interface IAppointmentResourceResponse {
  doctor: IAppointmentDocument['doctor'];
  patient: IAppointmentDocument['patient'];
  time_start: IAppointmentDocument['timeStart'];
  errors?: Error;
}

export default class AppointmentResource extends Resource {
  async toResponse(item: IAppointmentDocument): Promise<IAppointmentResourceResponse> {
    return {
      doctor: item.doctor,
      time_start: item.timeStart,
      patient: item.patient,
      errors: item.errors,
    };
  }
}
