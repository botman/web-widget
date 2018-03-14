import { h, Component } from 'preact';
import {botman} from './../botman';
import TextType from './text';
import ActionType from './action';
import { IButton, IMessage, IMessageTypeProps, ButtonType } from '../../typings';
import MessageType from "./messagetype";

export default class ButtonsType extends MessageType {

    render(props: IMessageTypeProps) {
        const message = props.message;

        const buttons = message.buttons.map((button) => {
            if (button.type === ButtonType.POSTBACK) {
                return <div class="btn" onClick={() => this.performAction(button)}>
                    {button.title}
                </div>;
            }
            if (button.type === ButtonType.WEB_URL) {
                return <a class="btn" href={button.url} target="_blank">{button.title}</a>;
            }
        });
        return (
            <div>
                {message.text}
                {this.state.attachmentsVisible ? buttons : ''}
            </div>
        );
    }

    performAction(button: IButton) {
        botman.callAPI(button.payload, true, null, (msg: IMessage) => {
            this.state.attachmentsVisible = false;
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                actions: msg.actions,
                attachment: msg.attachment,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, null);
    }
}
