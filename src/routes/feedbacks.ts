import express from 'express';
import * as feedbacksController from '../controller/feedbacks';

const router = express.Router();

router.get('/feedbacks', feedbacksController.getFeedbacks);

export default router;