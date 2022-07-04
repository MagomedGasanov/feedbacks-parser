import { DeliveryClubPuppeteer } from '../model/puppeteer/delivery-club/delivery-club-puppeteer';
import fs from 'fs';
import { FeedBack } from '../model/sql/feedback';

export class FeedbacksLogic {
    #deliveryClubPuppeteer: DeliveryClubPuppeteer;

    constructor(deliveryClubPuppeteer?: DeliveryClubPuppeteer) {
        this.#deliveryClubPuppeteer = deliveryClubPuppeteer || new DeliveryClubPuppeteer();
    }

    async updateFeedbacks(vendorName: string) {
        const feedbacks = await this.#deliveryClubPuppeteer.getFeedbacksForVendor(vendorName);
        console.log(feedbacks.length)
        const text = feedbacks;
        fs.writeFile('new.txt', JSON.stringify(text), (err) => {
            console.log(err)
        });
    }

    async getFeedbacks(vendorName: string, page: number) {
        const feedBack = new FeedBack();
        return feedBack.getPageOfReviews(page, vendorName);
    }
}