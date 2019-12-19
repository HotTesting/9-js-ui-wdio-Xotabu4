describe('WDIO', function () {
    it.only("Multiremote", function () {
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
})