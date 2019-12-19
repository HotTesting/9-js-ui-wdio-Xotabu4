const { completeRegistration } = require('./js_scripts/index')

describe('WDIO', function () {
    it("execute script", function () {
        browser.url("/");
        browser.execute(function () {
            console.log('HELLO FROM BROWSER')
        })
        browser.pause(30000);
    });

    it('fill registration form', function () {
        browser.url('/create_account')
        console.time('JS registration')
        browser.execute(function () {
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            const email = `test${new Date().getTime() / 1000}@test.com`
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
        })
        console.timeEnd('JS registration')
        browser.pause(15000)
        // 1 passing (17.6s) 2.6 s without sleep
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
        console.log('#### EMAIL:', email)

        browser.execute(function (_email) {
            console.log('#### ARGS:', arguments)
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = _email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
        }, email)

        browser.execute(button => button.click(), $('button[name="create_account"]'))

        browser.pause(15000)
        // 1 passing (17.6s)
    })

    it('fill registration form pass parameters by JSON serialization', function () {
        browser.url('/create_account')

        const obj = browser.execute(function () {
            const id = (new Date().getTime() / 1000).toString().replace('.', '')
            const email = `test${id}@test.com`
            const _user = {
                email: email,
                password: "123456",
                firstName: `TEST ${id}`,
                lastName: `TEST ${id}`
            }
            document.querySelector('input[name="firstname"]')['value'] = _user.firstName;
            document.querySelector('input[name="lastname"]')['value'] = _user.lastName;
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = _user.email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = _user.password;
            document.querySelector('input[name="confirmed_password"]')['value'] = _user.password;
            document.querySelector('button[name="create_account"]')['click']()
            return _user
        });

        console.log('GOT OBJECT:')
        console.dir(obj)
        browser.pause(15000);
        // 1 passing (17.6s)
    })

    it("async execute", function () {
        browser.url("/create_account");
        const result = browser.executeAsync(function (callback) {
            setTimeout(() => {
                console.log('setTimeout done!')
                callback("ALL DONE!");
            }, 3000);
        });
        console.log("GOT RESPONSE", result);
    });

    it.only("async execute", function () {
        browser.url("/create_account");
        const result = browser.executeAsync(function (arg1, callback) {
            // const callback = arguments[arguments.length - 1]
            fetch('http://ip-5236.sunline.net.ua:38015/checkout').then(resp => {
                resp.text().then(txt => {
                    callback(txt)
                })
            })
        }, 'arg1');
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

        $('div').jsClick();

    });

});
