import { h, Component } from 'preact';
import {botman} from './../botman';

export default class ActionType extends Component {

    render(props) {
        const message = props.message;

        const buttons = message.actions.map((action) => {
            return <div class="btn" onClick={() => this.performAction(action)}>
                {action.text}
            </div>;
        });

        return (
            <div>
                {message.text && <div>{message.text}</div>}
                <div>{buttons}</div>
            </div>
        );
    }

    performAction(action) {
        botman.callAPI(action.value, true, null, (msg) => {
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
