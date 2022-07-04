import express from 'express';
import * as feedbacksController from '../controller/feedbacks';

const router = express.Router();

router.post('/update-feedbacks', feedbacksController.updateFeedbacks);

export default router;