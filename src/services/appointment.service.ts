import AppointmentModel from '../db/models/appointment.model.js';
import Service from './service.js';

export default class AppointmentService extends Service {
  constructor() {
    super(AppointmentModel);
  }

  async getList({
    limit = 10,
    skip = 0,
    filters = {},
    sort = { createdAt: -1 },
  }: {
    limit?: any;
    skip?: any;
    filters?: any;
    sort?: any;
  }) {
    const query = [
      { $match: filters },
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
          items: [{ $skip: skip }, { $limit: limit }],
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

    return this.model.aggregate(query);
  }
}
