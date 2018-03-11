import { h, Component } from 'preact';
import {botman} from './../botman';
import TextType from './text';
import ActionType from './action';

export default class ButtonsType extends Component {

    render(props) {
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

    performAction(button) {
        botman.callAPI(button.payload, true, null, (msg) => {
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                actions: msg.actions,
                attachment: msg.attachment,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        });
    }
}
