export default async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  const [timeStart, timeEnd] = String(value).split('-');

  passes(
    Number(timeStart) >= 0 ||
      Number(timeStart) <= 24 ||
      Number(timeEnd) >= 0 ||
      Number(timeEnd) <= 24 ||
      Number(timeStart) >= Number(timeEnd),
  );
};
