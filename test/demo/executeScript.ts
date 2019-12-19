const { completeRegistration } = require('./js_scripts/index')

describe('WDIO', function () {
    it("execute script", function () {
        browser.url("/");
        let a = 'HELLO WORLD'
        browser.execute(function () {
            console.log(a)
        })
        browser.pause(30000);
    });

    it('fill registration form', function () {
        browser.url('/create_account')
        browser.execute(function () {
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = 'test2323490ccg@test.com';
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
        })
        browser.pause(15000)
        // 1 passing (17.6s)
    })

    it('fill registration form', function () {
        browser.url('/create_account')
        browser.execute(function () {
            const firstNameElement = document.querySelector('input[name="firstname"]');
            firstNameElement['value'] = "EXECUTE SCRIPT TestFirstName";
            console.log('BROWSER', firstNameElement['value'])
            return firstNameElement
        })

        const firstNameInput = $(function () {
            return document.querySelector('input[name="firstname"]');
        })

        $('[webdriverid="TEST"]')
        const byWebDriverID = function (id) {
            return $(function () { return document.querySelector(`[webdriverid="${id}"]`) });
        }

        const elem = byWebDriverID('TEST')

        browser.pause(5000)
        firstNameInput.setValue('NODE JS TEST')
        browser.pause(15000)
        // 1 passing (17.6s)
    })


    it('fill registration form pass parameters by template string', function () {
        browser.url('/create_account')
        const email = `test${new Date().getTime() / 1000}@test.com`
        browser.execute(`function () {
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = "${email}";
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
        }`)
        browser.pause(15000)
        // 1 passing (17.6s)
    })



    it('fill registration form pass parameters by function params serialization', function () {
        browser.url('/create_account')
        const email = `test${new Date().getTime() / 1000}@test.com`
        browser.execute(function (_email) {
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = _email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
        }, email)
        browser.pause(15000)
        // 1 passing (17.6s)
    })

    it('fill registration form pass parameters by JSON serialization', function () {
        browser.url('/create_account')
        const email = `test${new Date().getTime() / 1000}@test.com`
        const user = {
            email: email,
            firstName: 'TEST FIRST NAME',
            lastName: 'TEST LAST NAME'
        }
        const returnedUser = JSON.parse(browser.execute(function (_user) {
            _user = JSON.parse(_user);
            document.querySelector('input[name="firstname"]')['value'] = _user.firstName;
            document.querySelector('input[name="lastname"]')['value'] = _user.lastName;
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = _user.email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
            return JSON.stringify({ name: 'test' })
        }, JSON.stringify(user)))
        browser.pause(15000)
        // 1 passing (17.6s)
    })

    it("async execute", function () {
        browser.url("/create_account");
        browser.setTimeout({
            'script': 320000
        })
        const result = browser.executeAsync(function (callback) {
            setTimeout(() => {
                callback("ALL DONE!");
            }, 3000);
        });

        browser.setTimeout({
            'script': 30000
        })
        console.log("GOT RESPONSE", result);
    });


    it("js click command", function () {
        browser.addCommand("jsClick", function () {
            browser.execute(function (el) {
                // @ts-ignore
                el.click();
            }, this);
        }, true);

        // browser.addCommand("jsClick", function (selector) {
        //     browser.execute(function (_selector) {
        //         // @ts-ignore
        //         document.querySelector(_selector).click();
        //     }, selector);
        // });

        $('div').jsClick("div.button");

    });

});
