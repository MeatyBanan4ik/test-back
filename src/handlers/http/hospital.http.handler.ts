import { Request, Response } from 'express';
import HttpHandler from './http.handler.js';
import HospitalResource from '../../resources/hospital.resource.js';
import HospitalService from '../../services/hospital.service.js';
import AppointmentService from '../../services/appointment.service.js';

export default class HospitalHttpHandler extends HttpHandler {
  constructor() {
    super(HospitalService, HospitalResource);
  }

  async getAppointments(req: Request, res: Response) {
    const { limit = 10, skip = 0, sort = { createdAt: -1 } } = req.query;

    const appointmentService = new AppointmentService();

    const data = await appointmentService.getList({ limit, skip, sort });

    res._success({ data });
  }

  async updateAppointments(req: Request, res: Response) {
    const { appointments } = req.body;

    const appointmentService = new AppointmentService();

    await appointmentService.update(appointments);

    res._success();
  }
}
