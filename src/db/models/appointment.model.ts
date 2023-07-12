import { Model, Schema, model, Document, QueryTimestampsConfig } from 'mongoose';

export interface IAppointmentInput {
  doctor: number;
  patient: number;
  timeStart: number;
}

export interface IAppointmentDocument extends IAppointmentInput, Document, QueryTimestampsConfig {}

export type TAppointmentModel = Model<IAppointmentDocument>;

const schema = new Schema<IAppointmentDocument, TAppointmentModel>(
  {
    doctor: { type: Number, required: true },
    patient: { type: Number, required: true },
    timeStart: { type: Number },
  },
  {
    timestamps: true,
  },
);

export default model<IAppointmentDocument, TAppointmentModel>('Appointment', schema);
