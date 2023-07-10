import PatientService from './patient.service.js';
import DoctorService from './doctor.service.js';
import SocketService from './socket.service.js';
import AppointmentService from './appointment.service.js';

export default class HospitalService {
  public async create(data: any): Promise<any> {
    const patientService = new PatientService();
    const doctorService = new DoctorService();
    const appointmentService = new AppointmentService();

    const patients =
      data.patients && data.patients.length
        ? await patientService.createFromArr(
            data.patients.map(
              ({
                id,
                time,
                name,
                date_of_birth,
              }: {
                id: number;
                time: string;
                name: string;
                date_of_birth: string;
              }) => {
                const [timeStart, timeEnd] = time.split('-');
                return { id, timeStart, timeEnd, name, dateOfBirth: date_of_birth };
              },
            ),
          )
        : [];

    const doctors =
      data.doctors && data.doctors.length
        ? await doctorService.createFromArr(
            data.doctors.map(
              ({
                id,
                time,
                name,
                date_of_birth,
              }: {
                id: number;
                time: string;
                name: string;
                date_of_birth: string;
              }) => {
                const [timeStart, timeEnd] = time.split('-');
                return { id, timeStart, timeEnd, name, dateOfBirth: date_of_birth };
              },
            ),
          )
        : [];

    const appointments =
      data.appointments && data.appointments.length
        ? await appointmentService.createFromArr(
            data.appointments.map(
              ({ doctor, patient, time_start }: { doctor: number; patient: number; time_start: number }) => ({
                doctor,
                patient,
                timeStart: time_start,
              }),
            ),
          )
        : [];

    const limit = 100;
    let skip = 0;
    const items: any[] = [];
    let total = 0;

    do {
      const { total: appointmentTotal, items: appointments } = await appointmentService.getList({ limit, skip });

      Array.prototype.push.apply(items, appointments);

      total = appointmentTotal;
      skip += limit;
    } while (total < skip + limit);

    SocketService.sendMessage('create', items);

    return { patients, doctors, appointments };
  }

  public async clear(): Promise<any> {
    const patientService = new PatientService();
    const doctorService = new DoctorService();
    const appointmentService = new AppointmentService();

    SocketService.sendMessage('clear');

    return {
      patients: await patientService.clear(),
      doctors: await doctorService.clear(),
      appointment: await appointmentService.clear(),
    };
  }
}
