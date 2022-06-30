require('dotenv').config();

import express from 'express';
import feedbacksRoutes from './routes/feedbacks'

const app = express();
const PORT = process.env.PORT;

app.use(feedbacksRoutes);

app.listen(PORT, () => {
    console.log(`Server started. Port: ${PORT}`)
});