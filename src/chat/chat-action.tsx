import { h, Component } from 'preact';
import {botman} from './botman';

export default class ChatAction extends Component {

    render(props) {
        return (
            <div class="btn" onClick={() => this.performAction(props.action)}>
                {props.action.text}
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
