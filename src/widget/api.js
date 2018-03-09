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
                return resolve(document.getElementById('chatBotManFrame').contentWindow);
            }
            try {
                this.open();
                setTimeout(() => {
                    resolve(document.getElementById('chatBotManFrame').contentWindow);
                }, 750);
            } catch (e) {
                reject(e);
            }
        });
    }

    sayAsBot(text) {
        this.getChatWidget()
            .then((contentWindow) => {
                contentWindow.postMessage({
                    method: 'sayAsBot',
                    params: [
                        text
                    ]
                }, '*');
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

    say(text) {
        this.getChatWidget()
            .then((contentWindow) => {
                contentWindow.postMessage({
                    method: 'say',
                    params: [
                        text
                    ]
                }, '*');
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

    whisper(text) {

        this.getChatWidget()
            .then((contentWindow) => {
                contentWindow.postMessage({
                    method: 'whisper',
                    params: [
                        text
                    ]
                }, '*');
            })
            .catch(() => {
                console.error('Unable to get BotMan widget.');
            });
    }

}