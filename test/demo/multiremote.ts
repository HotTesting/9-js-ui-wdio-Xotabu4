
class BasePage {
    protected browsr: WebdriverIO.Browser 

    constructor(browsr: WebdriverIO.Browser) {
        this.browsr = browsr;
    }
}

class LoginPage extends BasePage {
    open() {
        this.browsr.url("https://socketio-chat-example.now.sh/");
    }

    login(username: string ){
        this.browsr.$('.usernameInput').setValue(username)
        this.browsr.keys("\uE007");
        this.browsr.pause(1000);
    }
}

class ChatPage extends BasePage {
    sendMessage(msg: string) {
        this.browsr.$(".inputMessage").setValue(msg);
        this.browsr.keys("\uE007");
    }

    messages() {
        return this.browsr.$("ul#messages").getText()
    }
}


describe('WDIO', function () {
    it("Multiremote", function () {
        // executed in all multiremote browsers
        browser.url("https://socketio-chat-example.now.sh/");
        user1.$('.usernameInput').setValue('USER1')
        user1.keys("\uE007");
        user1.pause(1000);
        user2.$('.usernameInput').setValue('USER2')
        user2.keys("\uE007");
        user2.pause(1000);
        user1.$(".inputMessage").setValue("Hello world!");
        user1.keys("\uE007");
        user2.$(".inputMessage").setValue("Hello world! 2");
        user2.keys("\uE007");
        browser.pause(10000);
        console.log("Messages", $("ul#messages").getText());
    });
    it.only("Multiremote PO", function () {
        const loginPageUser1 = new LoginPage(user1);
        const loginPageUser2 = new LoginPage(user2);
        loginPageUser1.open()
        loginPageUser2.open()

        loginPageUser1.login('USER1')
        loginPageUser2.login('USER2')

        const chatPageUser1 = new ChatPage(user1)
        const chatPageUser2 = new ChatPage(user2)
        chatPageUser1.sendMessage('Hello world! USER1')
        chatPageUser2.sendMessage('Hello world! USER2')
        
        browser.pause(10000);
        
        console.log("Messages 1", chatPageUser1.messages());
        console.log("Messages 2", chatPageUser2.messages());
    });
})