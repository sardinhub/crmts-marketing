import { Router } from 'express';
import * as leadController from '../controllers/lead.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Staff and Manager can view leads
router.get('/', authenticate, leadController.getAllLeads);

// Only Manager can import leads in bulk
router.post('/import', authenticate, authorize(['MANAGER']), leadController.importLeads);

// Staff and Manager can update status
router.patch('/:id/status', authenticate, leadController.updateLeadStatus);

export default router;
