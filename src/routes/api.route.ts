import { Router } from 'express';
import HospitalRoute from './hospital.route.js';

const router = Router();

router.use('/hospital', HospitalRoute);

export default router;
