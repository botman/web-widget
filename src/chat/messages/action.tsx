import { h, Component } from 'preact';
import {botman} from './../botman';
import { IAction, IMessage } from '../chat-action';

interface IActionTypeProps {
    message: IMessage,
    messageHandler: Function
}
export default class ActionType extends Component<IActionTypeProps, any> {

    render(props: IActionTypeProps) {
        const message = props.message;

        const buttons = message.actions.map((action: IAction) => {
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

    performAction(action: IAction) {
        botman.callAPI(action.value, true, null, (msg: IMessage) => {
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
