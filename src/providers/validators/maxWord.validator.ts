export default async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  const arr = String(value).split(' ');

  if (arr.length > Number(args)) {
    return passes(false);
  }

  passes();
};
