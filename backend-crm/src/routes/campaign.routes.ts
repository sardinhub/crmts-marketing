import { Router } from 'express';
import * as campaignController from '../controllers/campaign.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Staff and Manager can create and view campaigns
router.get('/', authenticate, campaignController.getCampaigns);
router.post('/', authenticate, campaignController.createCampaign);

export default router;
