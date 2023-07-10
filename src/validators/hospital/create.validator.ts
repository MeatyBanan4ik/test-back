import Validator from '../validator.js';

export default class CreateHospitalValidator extends Validator {
  readonly rules = {
    'patients.*.id': 'required|numeric|min:100|max:199|unique:patients,id',
    'patients.*.time': 'required|string|correct_time',
    'patients.*.name': 'string|max_word:2',
    'patients.*.date_of_birth': 'date',
    'patients.*.other_data': 'restricted',
    'doctors.*.id': 'required|numeric|min:200|max:299|unique:doctors,id',
    'doctors.*.time': 'required|string|correct_time',
    'doctors.*.name': 'string|max_word:2',
    'doctors.*.date_of_birth': 'date',
    'doctors.*.other_data': 'restricted',
    'appointments.*.doctor': 'required|numeric|is_exists:doctors,id|min:200|max:299',
    'appointments.*.patient': 'required|numeric|is_exists:patients,id|min:100|max:199',
    'appointments.*.time_start': 'numeric|min:0|max:24',
    'appointments.*.other_data': 'restricted',
  };
}
