import { h, Component } from 'preact';
import {botman} from './../botman';
import TextType from './text';
import ActionType from './action';
import { IMessage, IButton } from '../chat-action';

interface IButtonTypeProps {
    message: IMessage,
    messageHandler: Function,
}

export default class ButtonsType extends Component<IButtonTypeProps, any> {

    render(props: IButtonTypeProps) {
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
                {buttons}
            </div>
        );
    }

    performAction(button: IButton) {
        botman.callAPI(button.payload, true, null, (msg: IMessage) => {
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
