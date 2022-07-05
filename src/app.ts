require('dotenv').config();

import express from 'express';

import feedbacksRoutes from './routes/feedbacks';
import updateFeedbacksRoutes from './routes/update-feedbacks';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(feedbacksRoutes);

app.use(updateFeedbacksRoutes);

app.listen(PORT, () => {
    console.log(`Server started. PORT: ${PORT}`)
});
