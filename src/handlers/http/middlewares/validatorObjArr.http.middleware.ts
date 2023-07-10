import { Request, Response, NextFunction } from 'express';
import { IValidator } from '../../../validators/validator';

type TValidator<T = any> = new (req: Request) => T;

export default (Validator: TValidator<IValidator>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req._validated = {};
    req._unvalidated = {};

    const validator = new Validator(req.body);
    await new Promise((res) => {
      validator.validate(
        () => {
          req._validated = req.body;
          res(true);
        },
        (errors) => {
          const errorItems = Object.keys(errors.errors).reduce((obj: any, key) => {
            const arr = key.split('.');

            if (!(`${arr[0]}.${arr[1]}` in arr)) {
              obj[`${arr[0]}.${arr[1]}`] = errors.errors[key];
              return obj;
            }

            Array.prototype.push.apply(obj[`${arr[0]}.${arr[1]}`], errors.errors[key]);
            return obj;
          }, {});

          const keyError: Map<string, [number]> = new Map();

          Object.keys(errorItems).forEach((item) => {
            const [key, index] = item.split('.');

            if (!keyError.has(key)) {
              keyError.set(key, [Number(index)]);

              return void 0;
            }

            keyError.get(key)?.push(Number(index));
          });

          Object.keys(req.body).forEach((key) => {
            req.body[key].forEach((item: any, index: number) => {
              if (!keyError.has(key) || !keyError.get(key)?.includes(index)) {
                if (!(key in req._validated)) return (req._validated[key] = [item]);

                return req._validated[key].push(item);
              }

              if (!(key in req._unvalidated)) {
                return (req._unvalidated[key] = [{ errors: errorItems[`${key}.${index}`], ...item }]);
              }

              return req._unvalidated[key].push({ errors: errorItems[`${key}.${index}`], ...item });
            });
          });

          res(true);
        },
      );
    });

    return next();
  };
