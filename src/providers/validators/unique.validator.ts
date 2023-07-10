import mongoose, { Document, FilterQuery, Types } from 'mongoose';

export default async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  if (typeof args !== 'string') {
    throw new Error('Invalid unique rule, you must enter the collection.');
  }

  const [collectionName, field = '_id', expectId] = args.split(',');

  const filter: FilterQuery<Document> = { [field]: value };

  if (expectId !== undefined) {
    filter._id = {
      $ne: new Types.ObjectId(expectId),
    };
  }

  const entity = await mongoose.connection.db.collection(collectionName).findOne(filter);

  if (entity !== null) {
    return passes(false);
  }

  passes();
};
