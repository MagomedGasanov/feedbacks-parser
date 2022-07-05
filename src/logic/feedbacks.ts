import { DeliveryClubPuppeteer } from '../model/puppeteer/delivery-club/delivery-club-puppeteer';
import { FeedBack as FeedBackSQL } from '../model/sql/feedback';

export class FeedbacksLogic {
    #deliveryClubPuppeteer: DeliveryClubPuppeteer;

    constructor(deliveryClubPuppeteer?: DeliveryClubPuppeteer) {
        this.#deliveryClubPuppeteer = deliveryClubPuppeteer || new DeliveryClubPuppeteer();
    }

    async updateFeedbacks(vendorName: string) {
        const feedbacksFromHTML = await this.#deliveryClubPuppeteer.getFeedbacksForVendor(vendorName);

        FeedBackSQL.clearAllRecordsForVendor(vendorName);

        feedbacksFromHTML.forEach((feedBack) => {
            const { userName, date, orderInfo, reviewText, vendorAnswerText } = feedBack;
            const feedBackSQL = new FeedBackSQL(userName, date, reviewText, orderInfo, vendorAnswerText, vendorName);
            feedBackSQL.save();
        });
    }

    async getFeedbacks(vendorName: string, page: number) {
        if (!page) {
            const feedbacks = await FeedBackSQL.getAllFeedbacksForVendor(vendorName);
            return feedbacks.rows;
        }
        return FeedBackSQL.getPageOfReviews(page, vendorName);
    }
}