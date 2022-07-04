import db from '../../utils/db';

export class FeedBack {
    #userName: string
    #date: string
    #reviewText: string
    #orderInfo: string
    #vendorAnswer: string
    #vendorName: string

    constructor(userName?: string, date?: string, reviewText?: string, orderInfo?: string, vendorAnswer?: string, vendorName?: string) {
        this.#userName = userName;
        this.#date = date;
        this.#reviewText = reviewText;
        this.#orderInfo = orderInfo;
        this.#vendorAnswer = vendorAnswer;
        this.#vendorName = vendorName;
    }

    save() {
        db.query(
            `INSERT INTO reviews_table (user_name, date, order_info, review_text, vendor_answer, vendor_name) VALUES (${this.#userName}, ${this.#date}, ${this.#orderInfo}, ${this.#reviewText}, ${this.#vendorAnswer}, ${this.#vendorName})`,
            (error, results) => {
                if (error) {
                    throw error
                }
            });
    }

    getPageOfReviews(page: number, vendorName: string) {
        // TBD
    }
}