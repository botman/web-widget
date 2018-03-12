import { h, Component } from 'preact';
import {botman} from './../botman';
import { IButton, IMessage, IMessageTypeProps } from '../../typings';
import MessageType from "./messagetype";

export default class TypingIndicator extends MessageType {

    render(props: IMessageTypeProps) {
        return (
            <div class="loading-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        );
    }

    componentDidMount() {
        super.componentDidMount();

        setTimeout(() => {
            this.state.visible = false;
            this.props.onVisibilityChange(this.props.message, this.state);
        }, this.props.message.timeout * 1000);
    }
}
