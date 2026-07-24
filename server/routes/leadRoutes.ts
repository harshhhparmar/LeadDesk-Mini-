import { Router } from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController';

const router = Router();

router.route('/')
  .post(createLead)
  .get(getLeads);

router.route('/:id')
  .patch(updateLeadStatus);

export default router;
