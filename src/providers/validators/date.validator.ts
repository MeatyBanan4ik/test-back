export default async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  const arr = String(value).split('.');
  passes(arr.length === 3 && !Number.isNaN(Date.parse(`${arr[1]}.${arr[0]}.${arr[2]}`)));
};
