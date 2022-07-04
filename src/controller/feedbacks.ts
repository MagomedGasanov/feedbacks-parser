import { Request, Response, NextFunction } from 'express'
import { FeedbacksLogic } from '../logic/feedbacks';

export const getFeedbacks = (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page;
        const vendorName = req.query.vendorNAme;
        const feedbacksLogic = new FeedbacksLogic();

        res.send(feedbacksLogic.getFeedbacks(String(vendorName), Number(page)));
    } catch (e) {
        console.log(e);
        res.send('Oops')
    }
}

export const updateFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const feedbacksLogic = new FeedbacksLogic();
        await feedbacksLogic.updateFeedbacks(String(req.query.vendorName));
        res.send('Success!');
    } catch (e) {
        console.log(e);
        res.send('Oops')
    }

}