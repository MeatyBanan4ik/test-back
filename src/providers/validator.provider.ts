import Validator from 'validatorjs';
import uniqueValidator from './validators/unique.validator.js';
import maxWordValidator from './validators/maxWord.validator.js';
import correctTimeValidator from './validators/correctTime.validator.js';
import restrictedValidator from './validators/restricted.validator.js';
import isExistsValidator from './validators/isExists.validator.js';

export default (): void => {
  Validator.registerAsync('unique', uniqueValidator, 'Duplicate.');
  Validator.registerAsync('max_word', maxWordValidator, 'Invalid');
  Validator.registerAsync('correct_time', correctTimeValidator, 'Invalid');
  Validator.registerAsync('restricted', restrictedValidator, 'Invalid');
  Validator.registerAsync('is_exists', isExistsValidator, 'Invalid');
};
