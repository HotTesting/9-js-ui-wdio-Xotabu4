
export class BasePage {
    open(path: string) {
        browser.url(path)
    }
}

export const Base = new BasePage()