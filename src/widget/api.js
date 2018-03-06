export default class Api {

    constructor(widget) {
        this.widget = widget;
    }


    open() {
        this.widget.open();
    }

    close() {
        this.widget.close();
    }

    toggle() {
        this.widget.toggle();
    }

    isOpen() {
        return this.widget.state.isChatOpen === true;
    }

    getChatWidget() {
        return new Promise((resolve, reject) => {
            if (this.isOpen()) {
                return resolve(document.getElementById('chatBotManFrame').contentWindow.window.botmanChatWidget);
            }
            try {
                this.open();
                setTimeout(() => {
                    const widget = document.getElementById('chatBotManFrame').contentWindow.window.botmanChatWidget;
                    resolve(widget);
                }, 750);
            } catch (e) {
                reject(e);
            }
        });
    }

    sayAsBot(text) {
        this.getChatWidget()
            .then((widget) => {
                widget.sayAsBot(text);
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

    say(text) {
        this.getChatWidget()
            .then((widget) => {
                widget.say(text);
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

    whisper(text) {

        this.getChatWidget()
            .then((widget) => {
                widget.whisper(text);
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

}