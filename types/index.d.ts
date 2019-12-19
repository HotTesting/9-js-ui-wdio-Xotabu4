declare module WebdriverIO {
    // adding command to `browser`
    interface Browser {

    }
    interface Element {
        /**
         * Wait for element to contain text, wrapper around .waitUntil
         * Declared in webdriverio.conf.js with browser.addCommand
         */
        jsClick(selector: string): () => void
    }
}
