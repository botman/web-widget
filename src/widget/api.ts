import Widget from './widget';
import {IMessage} from "../typings";

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
        } else {
            try {
                this.open();
                setTimeout(() => {
                    (document.getElementById('chatBotManFrame') as HTMLIFrameElement).contentWindow.postMessage(payload, '*');
                }, 750);
            } catch (e) {
                console.error(e);
            }
        }
    }

    writeToMessages(message: IMessage) {
        this.callChatWidget({
            method: 'writeToMessages',
            params: [
                message
            ]
        })
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