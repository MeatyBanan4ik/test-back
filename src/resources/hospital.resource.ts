import PatientResource from './patient.resource.js';
import DoctorResource from './doctor.resource.js';
import AppointmentResource from './appointment.resource.js';

export default class HospitalResource {
  async toResponse(item: any): Promise<any> {
    const patientResource = new PatientResource();
    const doctorResource = new DoctorResource();
    const appointmentResource = new AppointmentResource();

    return {
      patients: await patientResource.toArray(item?.patients ?? []),
      doctors: await doctorResource.toArray(item?.doctors ?? []),
      appointments: await appointmentResource.toArray(item?.appointments ?? []),
    };
  }
}
