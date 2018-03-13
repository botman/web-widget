import Widget from './widget';

export default class Api {

    widget: Widget;

    constructor(widget: Widget) {
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
                return resolve((document.getElementById('chatBotManFrame') as HTMLIFrameElement).contentWindow);
            }
            try {
                this.open();
                setTimeout(() => {
                    resolve((document.getElementById('chatBotManFrame') as HTMLIFrameElement).contentWindow);
                }, 750);
            } catch (e) {
                reject(e);
            }
        });
    }

    postChatMessage(text: string, method: string) {
        this.getChatWidget()
        .then((contentWindow: Window) => {
            contentWindow.postMessage({
                method,
                params: [
                    text
                ]
            }, '*');
        })
        .catch(() => {
            console.error('Unable to get BotMan widget.');
        });
    }

    sayAsBot(text: string) {
        this.postChatMessage(text, 'sayAsBot');
    }

    say(text: string) {
        this.postChatMessage(text, 'say');
    }

    whisper(text: string) {
        this.postChatMessage(text, 'whisper');
    }

}