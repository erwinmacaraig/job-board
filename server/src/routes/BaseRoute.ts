import { Router } from 'express';

import {
  index,
  postJob,
  retrieveExternalJobs,
  retrieveJobPosts,
} from '../controller/BaseController';

const router = Router();

router.get('/external-posts', retrieveExternalJobs);
router.post('/create', postJob);
router.get('/internal-posts', retrieveJobPosts);

export default router;
