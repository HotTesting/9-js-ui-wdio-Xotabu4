describe('Website', function () {
    it('should be alive', function () {
        browser.url(`/`)
        const img = $('img[src$="images/logotype.png"]')

        
        if(!img.isExisting()) {
            throw new Error('Website should be opened, and logo displayed');
        }
    })

    it('test', function () {
        browser.url(`/`)

        const popularProducts = $$('#box-popular-products .product')

        popularProducts[2].$('.name')


        $('=Change').click()

        $('=Purple Duck').$('../..') // find element 2 levels up from Purple Duck
    })
})

