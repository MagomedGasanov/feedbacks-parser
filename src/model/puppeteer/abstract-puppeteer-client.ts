import * as puppeteer from 'puppeteer';

export abstract class AbstractPuppeteerClient {
    #browser: puppeteer.Browser

    protected page: puppeteer.Page

    constructor() {
        this.#browser = null
        this.page = null
    }

    protected async loadInitialPage(link: string) {
        this.#browser = await puppeteer.launch();
        this.page = await this.#browser.newPage();
        await this.page.goto(link, { waitUntil: 'networkidle2' });
    }

    close() {
        this.#browser.close();
    }

    abstract getFeedbacksForVendor(shopMame: string): Promise<any[]>
}