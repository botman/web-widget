import { h, Component } from 'preact';
import {IMessage, IMessageHolderProps, IMessageTypeState} from '../typings';
import * as dateFormat from "dateformat";
import TextType from "./messages/text";
import ActionType from "./messages/action";
import TypingIndicator from "./messages/typing-indicator";
import ListType from "./messages/list";
import ButtonsType from "./messages/buttons";


const dayInMillis = 60 * 60 * 24 * 1000;

const messageTypes = {
    actions: ActionType,
    buttons: ButtonsType,
    list: ListType,
    text: TextType,
    typing_indicator: TypingIndicator
};

export default class MessageHolder extends Component<IMessageHolderProps, any> {

    messageVisibilityChange = (message: IMessage, messageState: IMessageTypeState) => {
        const msg = this.props.message;
        if (msg.id === message.id && msg.visible !== messageState.visible) {
            msg.visible = messageState.visible;
            // Reset the timeout
            msg.timeout = 0;
            this.forceUpdate();
        }
    };

    render(props: IMessageHolderProps) {
        const currentTime = new Date();
        const message = props.message;
        const msgTime = new Date(message.time);
        const MessageComponent = messageTypes[message.type] || TextType;
        const { messageHandler, conf } = this.props;

        let styles = '';
        if (message.visible === false || message.visibilityChanged === false) {
            styles += 'display:none';
        }
        const calculatedTimeout = props.calculatedTimeout;

        return (
            <li data-message-id={message.id} class={message.from} style={styles}>
                <div class="msg">
                    <MessageComponent onVisibilityChange={this.messageVisibilityChange}
                                      message={message}
                                      timeout={calculatedTimeout}
                                      messageHandler={messageHandler}
                                      conf={conf}
                    />
                    {(props.conf.displayMessageTime) ?
                        <div class="time">
                            {
                                currentTime.getMilliseconds() - msgTime.getMilliseconds() < dayInMillis ?
                                    dateFormat(msgTime, props.conf.timeFormat) :
                                    dateFormat(msgTime, props.conf.dateTimeFormat)
                            }
                        </div>
                        :
                        ''
                    }
                </div>
            </li>
        );
    }

}