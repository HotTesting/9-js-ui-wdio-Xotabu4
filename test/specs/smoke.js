describe('Website', function () {
    it('should be alive', function () {
        browser.url(`/`)
        const img = $('img[src$="https://content/dam/rc-www/en_us/images/content/home-page/freemium-redesign/hero-control-small-jpeg-rendition.webp"]')
        if(!img.isExisting()) {
            throw new Error('Website should be opened, and logo displayed');
        }
    })
})

