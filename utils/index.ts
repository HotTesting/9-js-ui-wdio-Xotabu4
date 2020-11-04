const request = require("request-promise-native");
const faker = require("faker");
const cheerio = require("cheerio");

export function createNewUserAndLogin() {
    console.time('Create and login user took');
    const credentials = createNewUser()
    const result = quickLogin(credentials)
    console.timeEnd('Create and login user took');
    return result
}

export function createNewUser(): any {
    return browser.call(createNewUserAsync);
}

async function createNewUserAsync() {
    const j = request.jar();
    let req = request.defaults({
        jar: j,
        resolveWithFullResponse: true,
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ru-UA;q=0.6",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let tokenResponse = await req.get(
        "http://ip-5236.sunline.net.ua:38015/create_account"
    );

    const $ = cheerio.load(tokenResponse.body);
    const token = $('form[name="customer_form"] input[name="token"]').attr(
        "value"
    );
    let uuid = faker.random.uuid().replace(/-/gm, "");
    const email = `${uuid}@test.com`;
    const password = "123456";

    const formData = {
        token: token,
        company: null,
        tax_id: null,
        firstname: "test",
        lastname: "test",
        address1: null,
        address2: null,
        postcode: null,
        city: null,
        country_code: "RU",
        email: email,
        phone: "123123123",
        password: password,
        confirmed_password: password,
        create_account: "Create Account"
    };
    // try {
    await req.post("http://ip-5236.sunline.net.ua:38015/create_account", {
        form: formData
    })
    // } catch (err) {
    //     // console.log(err)
    // }

    return { email: email, password: password };
}

export function quickLogin(credentials: { email: string, password: string }): { credentials: { email: string, password: string }, cookieWithSessionID: any } {
    console.log("Doing login for user: ", credentials);
    const cookieWithSessionID = browser.call(async function () {
        let res = await quickLoginAsync(credentials)
        return res
    });
    browser.url('/')
    browser.setCookies({
        name: cookieWithSessionID.key,
        value: cookieWithSessionID.value
    })
    browser.refresh()
    return {
        credentials: credentials,
        cookieWithSessionID: cookieWithSessionID
    }
}

async function quickLoginAsync(credentials) {
    const j = request.jar();
    let tokenResponse = await request.get(
        "http://ip-5236.sunline.net.ua:38015/login",
        {
            jar: j,
            resolveWithFullResponse: true,
            headers: {
                Accept:
                    "text/html,application/xhtml+xml,application/xml",
                "Content-Type": "text/html; charset=UTF-8"
            }
        }
    );
    const $ = cheerio.load(tokenResponse.body);
    const token = $('#box-login form[name="login_form"] input[name="token"]').attr(
        "value"
    );
    const formData = {
        token: token,
        redirect_url: null,
        email: credentials.email,
        password: credentials.password,
        login: 'Sign In'
    };
    await request.post("http://ip-5236.sunline.net.ua:38015/login", {
        form: formData,
        jar: j,
        resolveWithFullResponse: true,
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ru-UA;q=0.6",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(null, err => { });
    const cookies = j.getCookies('http://ip-5236.sunline.net.ua:38015')
    return cookies.find(cookie => cookie['key'] == "LCSESSID")
}

// COOKIE
// creation:Tue Dec 17 2019 17:59:14 GMT+0200 (EET) {}
// creationIndex:2
// domain:"ip-5236.sunline.net.ua"
// hostOnly:true
// key:"LCSESSID"
// lastAccessed:Tue Dec 17 2019 17:59:14 GMT+0200 (EET) {}
// path:"/"
// value:"682995129b06db5909e93c6eaba6a59e"
