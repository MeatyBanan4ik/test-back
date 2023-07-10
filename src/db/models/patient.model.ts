import { Model, Schema, model, Document, QueryTimestampsConfig } from 'mongoose';

export interface IPatientInput {
  timeStart: number;
  timeEnd: number;
  dateOfBirth?: string;
  name?: string;
}

export interface IPatientDocument extends IPatientInput, Document, QueryTimestampsConfig {
  id: number;
}

export type TPatientModel = Model<IPatientDocument>;

const schema = new Schema<IPatientDocument, TPatientModel>(
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

export default model<IPatientDocument, TPatientModel>('Patient', schema);
