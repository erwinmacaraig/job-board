import { Router } from 'express';

import { index, postJob } from '../controller/BaseController';

const router = Router();

router.get('/', index);
router.get('/send-email', postJob);

export default router;
