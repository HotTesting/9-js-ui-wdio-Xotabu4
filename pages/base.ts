import { Header } from './components/header';


export class BasePage {
    header = new Header();

    open(path: string) {
        browser.url(path)
    }
}

export const Base = new BasePage()