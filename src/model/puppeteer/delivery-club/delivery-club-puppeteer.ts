import { Page } from "puppeteer";
import { DeliveryClubReview } from "../../../types/delivery-club-review";
import { AbstractPuppeteerClient } from "../abstract-puppeteer-client";

export class DeliveryClubPuppeteer extends AbstractPuppeteerClient {
    constructor() {
        super()
    }

    async getFeedbacksForVendor(vendorName: string) {
        const url = `https://www.delivery-club.ru/srv/${vendorName}/feedbacks`;

        await this.loadInitialPage(url);
        await this.loadFullPage();

        const parsedReviews = await this.getParsedReviews();

        this.close();

        return parsedReviews;
    }

    private async loadFullPage() {
        let count = 0;
        while (true) {
            try {
                await this.page.click('.vendor-reviews__btn--load-more');
                // TODO: Temporary workaround while looking for better solution
                await this.page.waitForTimeout(500);
                console.log(`Click ${count}`)
                ++count
                if (count > 20) {
                    break;
                }
            } catch (e) {
                break;
            }
        }
    }

    private async getParsedReviews() {
        return this.page.evaluate(() => {
            const reviewsArray: DeliveryClubReview[] = [];
            document.body.querySelectorAll('.vendor-reviews-item__container').forEach(
                /* <ul class="vendor-reviews-list__component">
                    <li class="vendor-reviews-item__container"> **el**
                        <div class="vendor-reviews-item__block">
                            <div class="vendor-reviews-item__icon"></div>
                            <div class="vendor-reviews-item__info">
                                <div class="vendor-reviews-item__text">Review text</div>
                                <div class="vendor-reviews-item__order">Order info</div>
                                <div class="vendor-reviews-item__row">
                                    <div class="vendor-reviews-item__username">Username</div>
                                    <div class="vendor-reviews-item__date">Date</div>
                                </div>
                            </div>
                        </div>
                        <div class="vendor-reviews-item__block vendor-reviews-item__block--answer">
                            <div class="vendor-reviews-item__icon vendor-reviews-item__icon--response"></div>
                            <div class="vendor-reviews-item__info">
                                <div class="vendor-reviews-item__text">Answer from vendor</div>
                            </div>
                        </div>
                    </li>
                   </ul>
                */
                (reviewContainer) => {
                    const userReview = reviewContainer.querySelectorAll('.vendor-reviews-item__block')[0]?.querySelector('.vendor-reviews-item__info');
                    const vendorAnswer = reviewContainer.querySelectorAll('.vendor-reviews-item__block')[1]?.querySelector('.vendor-reviews-item__info');

                    const reviewText = userReview?.querySelector('.vendor-reviews-item__text').textContent;
                    const orderInfo = userReview?.querySelector('.vendor-reviews-item__order').textContent;
                    const userName = userReview?.querySelector('.vendor-reviews-item__row')?.querySelector('.vendor-reviews-item__username').textContent;
                    const date = userReview?.querySelector('.vendor-reviews-item__row')?.querySelector('.vendor-reviews-item__date').textContent;

                    const vendorAnswerText = vendorAnswer?.querySelector('.vendor-reviews-item__text').textContent;

                    reviewsArray.push(
                        {
                            reviewText,
                            orderInfo,
                            userName,
                            date,
                            vendorAnswerText
                        }
                    );
                }
            );
            return reviewsArray;
        })
    }
}
