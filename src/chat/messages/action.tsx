import { h, Component } from 'preact';
import {botman} from './../botman';
import MessageType from "./messagetype";
import { IMessageTypeProps, IAction, IMessage } from '../../typings';

export default class Action extends MessageType {

    render(props: IMessageTypeProps) {
        const message = props.message;

        const buttons = message.actions.map((action: IAction) => {
            return <div class="btn" onClick={() => this.performAction(action)}>
                {action.text}
            </div>;
        });

        return (
            <div>
                {message.text && <div>{message.text}</div>}
                {this.state.attachmentsVisible ?
                    <div>{buttons}</div>
                    : ''}
            </div>
        );
    }

    performAction(action: IAction) {
        botman.callAPI(action.value, true, null, (msg: IMessage) => {
            if (this.props.conf.oneTimeButtons) {
                this.setState({attachmentsVisible: false});
            }
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                timeout: msg.timeout,
                actions: msg.actions,
                attachment: msg.attachment,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, null);
    }
}
