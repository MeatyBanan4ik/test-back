import { Router } from 'express';
import HttpValidator from '../handlers/http/middlewares/validatorObjArr.http.middleware.js';
import CallHttpHandler from '../handlers/http/middlewares/call.http.middleware.js';
import HospitalHttpHandler from '../handlers/http/hospital.http.handler.js';
import CreateHospitalHttpValidator from '../validators/hospital/create.validator.js';

const router = Router();

router.post('/', HttpValidator(CreateHospitalHttpValidator), CallHttpHandler(HospitalHttpHandler, 'create'));
router.delete('/', CallHttpHandler(HospitalHttpHandler, 'clear'));
router.get('/appointments', CallHttpHandler(HospitalHttpHandler, 'getAppointments'));
router.put('/appointments', CallHttpHandler(HospitalHttpHandler, 'updateAppointments'));

export default router;
