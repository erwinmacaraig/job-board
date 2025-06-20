import { Router } from 'express';

import { getExternalJobPosts } from '../controller/XMLProcessorController';

const router = Router();

router.get('/get-remote-job-posts', getExternalJobPosts);

export default router;
