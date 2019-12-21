
describe('User', function () {
    it.skip('can register', function () {
        browser.url(`/create_account`)
        console.time('GUI registration')
        const registrationForm = $('#box-create-account')
        registrationForm.$('input[name="firstname"]').setValue('Test')
        registrationForm.$('input[name="lastname"]').setValue('Test')
        const countrySelect = registrationForm.$('select[name="country_code"]')
        countrySelect.selectByVisibleText('Ukraine')

        const email = `test${new Date().getTime() / 1000}@test.com`
        
        registrationForm.$('input[name="email"]').setValue(email)
        registrationForm.$('input[name="phone"]').setValue('+380441111111')

        registrationForm.$('input[name="password"]').setValue(email)
        registrationForm.$('input[name="confirmed_password"]').setValue(email)

        registrationForm.$('button[name="create_account"]').click()
        console.timeEnd('GUI registration')
        // '#notices .alert-success'
        // 'Your customer account has been created.'
        // browser.pause(2000)
        // const alert = $('#notices .alert-success')
        // assert(alert.isDisplayed(), `Expected success alert to be visible after registration`)
        // const alert = $('#notices .alert-success')
        // alert.waitForDisplayed(null, null, `Expected success alert to be visible after registration`)

        const expectedText = 'Your customer account has been created.'
        let lastResult = null;
        browser.waitUntil(() => {
            try {
                const alert = $('#notices .alert-success')
                lastResult = alert.getText()
                return alert.isDisplayed() && lastResult.includes(expectedText)
            } catch (err) {
                return false
            }
        }, null, `Alert text: "${lastResult}" to match expected: "${expectedText}", after succesful registration`)
        
        // const alertText = alert.getText()
        // const expectedText = 'Your customer account has been created.'
        // assert(alertText.includes(expectedText), 
        //    `Alert text: "${alertText}" to match expected: "${expectedText}", after succesful registration`)
    })
})

