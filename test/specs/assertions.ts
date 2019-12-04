// import * as assert from 'assert';
import * as chai from 'chai'
const expect = chai.expect
const assert = chai.assert

chai.should();

describe("Chai ", function() {
    it("should", function() {
        browser.url();
        $("div").isDisplayed().should.equal(true, 'hello world');
        $("div").isDisplayed().should.to.be.equal(true, 'hello')
    });

    it("expect", function() {
        browser.url();
        expect($("div").isDisplayed(), 'error message').to.be.true
    });

    it("assert", function() {
        browser.url();
        assert.isTrue($("div").isDisplayed(), 'hello world')
    });
});

describe('Website', function () {
    it('should be alive', function () {
        browser.url(`/`)
        const img = $('img[src$="images/logotype.png"]')

        
        if(!img.isExisting()) {
            throw new Error('Website should be opened, and logo displayed');
        }
    })

    it.only('checking assertions', function () {
        try {
            assert.ok(false)
        } catch (err) {
            console.dir(err)
        }
    })
})

