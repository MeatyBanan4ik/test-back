import { ValidationErrors } from 'validatorjs';

class HttpException extends Error {
  status = 500;
  errors: ValidationErrors | undefined;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default HttpException;
