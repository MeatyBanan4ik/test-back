import mongoose, { Document, FilterQuery } from 'mongoose';

export default async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  if (typeof args !== 'string') {
    throw new Error('Invalid is exists rule, you must enter the collection.');
  }

  const [collectionName, field = 'id'] = args.split(',');

  const filter: FilterQuery<Document> = { [field]: value };

  const entity = await mongoose.connection.db.collection(collectionName).findOne(filter);

  passes(entity === null);
};
