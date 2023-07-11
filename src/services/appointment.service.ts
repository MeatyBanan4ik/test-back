import AppointmentModel from '../db/models/appointment.model.js';
import Service from './service.js';
import SocketService from './socket.service.js';

export default class AppointmentService extends Service {
  constructor() {
    super(AppointmentModel);
  }

  async getList({
    limit = 10,
    skip = 0,
    sort = { createdAt: -1 },
  }: {
    limit?: any;
    skip?: any;
    filters?: any;
    sort?: any;
  }) {
    const query = [
      {
        $lookup: {
          from: 'patients',
          localField: 'patient',
          foreignField: 'id',
          as: 'patientDetails',
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctor',
          foreignField: 'id',
          as: 'doctorDetails',
        },
      },
      { $unwind: '$patientDetails' },
      { $unwind: '$doctorDetails' },
      { $sort: sort },
      {
        $facet: {
          total: [{ $group: { _id: null, total: { $sum: 1 } } }],
          items: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
        },
      },
      { $unwind: '$total' },
      {
        $project: {
          total: '$total.total',
          items: '$items',
        },
      },
    ];

    return (await this.model.aggregate(query))[0] || { total: 0, items: [] };
  }

  async update(data: any[]) {
    await this.clear();
    SocketService.sendMessage('clear');

    await this.model.create(data);

    const limit = 100;
    let skip = 0;
    const items: any[] = [];
    let total = 0;

    do {
      const { total: appointmentTotal, items: appointments } = await this.getList({ limit, skip });

      Array.prototype.push.apply(items, appointments);

      total = appointmentTotal;
      skip += limit;
    } while (total > skip + limit);

    SocketService.sendMessage('create', items);
  }
}
