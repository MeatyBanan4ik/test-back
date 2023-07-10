import { Model, Schema, model, Document, QueryTimestampsConfig } from 'mongoose';

export interface IDoctorInput {
  timeStart: number;
  timeEnd: number;
  dateOfBirth?: string;
  name?: string;
}

export interface IDoctorDocument extends IDoctorInput, Document, QueryTimestampsConfig {
  id: number;
}

export type TDoctorModel = Model<IDoctorDocument>;

const schema = new Schema<IDoctorDocument, TDoctorModel>(
  {
    id: { type: Number, required: true, unique: true },
    timeStart: { type: Number, required: true },
    timeEnd: { type: Number, required: true },
    dateOfBirth: { type: String, required: false, trim: true },
    name: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  },
);

export default model<IDoctorDocument, TDoctorModel>('Doctor', schema);
