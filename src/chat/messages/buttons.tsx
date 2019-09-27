import { h, Component } from 'preact';
import {botman} from './../botman';
import { IButton, IMessage, IMessageTypeProps } from '../../typings';
import MessageType from "./messagetype";

export default class ButtonsType extends MessageType {

    render(props: IMessageTypeProps) {
        const message = props.message;

        const buttons = message.buttons.map((button) => {
            if (button.type === 'postback') {
                return <div class="btn" onClick={() => this.performAction(button)}>
                    {button.title}
                </div>;
            }
            if (button.type === 'web_url') {
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
            this.setState({ attachmentsVisible : false});
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                actions: msg.actions,
                attachment: msg.attachment,
                elements: msg.elements,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, null);
    }
}
