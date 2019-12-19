

module.exports.completeRegistration = function () {
    document.querySelector('input[name="firstname"]').value = "TestFirstName";
    document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
    document.querySelector('select[name="country_code"]')['value'] = "UA";
    document.querySelector('[name="customer_form"] input[name="email"]')['click']();
    document.querySelector('[name="customer_form"] input[name="email"]')['value'] = 'test239423948@test.com';
    document.querySelector('input[name="phone"]')['value'] = "+380441112233";
    document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
    document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
    document.querySelector('button[name="create_account"]')['click']();
}