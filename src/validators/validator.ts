import Validator from 'validatorjs';

type TFails = (errors: Validator.Errors) => void;

export interface IValidator {
  rules: Validator.Rules;
  data: any;
  validate: (passes?: Function, fails?: TFails) => void;
}

export default abstract class AbstractValidator implements IValidator {
  abstract readonly rules: IValidator['rules'];
  constructor(readonly data: IValidator['data']) {}

  validate(passes?: Function, fails?: TFails): void {
    const validation = new Validator(this.data, this.rules);
    validation.checkAsync(passes, () => {
      if (fails) fails(validation.errors);
    });
  }
}
