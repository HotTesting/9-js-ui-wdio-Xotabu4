declare module WebdriverIO {
    // adding command to `browser`
    interface Browser {

    }
    interface Element {
        /**
         * Do JS click on current element using browser.execute
         */
        jsClick: () => void
    }
}
