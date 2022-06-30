import express from 'express';
import * as feedbacksController from '../controller/gateway/feedbacks';

export const router = express.Router();

router.get('/feedbacks', feedbacksController.getFeedbacks);

export default router;