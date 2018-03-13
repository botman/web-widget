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

    callChatWidget(payload: Object) {
        if (this.isOpen()) {
            (document.getElementById('chatBotManFrame') as HTMLIFrameElement).contentWindow.postMessage(payload, '*');
        }
        try {
            this.open();
            setTimeout(() => {
                (document.getElementById('chatBotManFrame') as HTMLIFrameElement).contentWindow.postMessage(payload, '*');
            }, 750);
        } catch (e) {
            console.error(e);
        }
    }

    sayAsBot(text: string) {
        this.callChatWidget({
            method: 'sayAsBot',
            params: [
                text
            ]
        });
    }

    say(text: string) {
        this.callChatWidget({
            method: 'say',
            params: [
                text
            ]
        });
    }

    whisper(text: string) {
        this.callChatWidget({
            method: 'whisper',
            params: [
                text
            ]
        });
    }

}