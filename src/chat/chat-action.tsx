import { h, Component } from 'preact';
import {botman} from './botman';

export default class ChatAction extends Component<IChatActionProps, any> {

    render(props: IChatActionProps) {
        return (
            <div class="btn" onClick={() => this.performAction(props.action)}>
                {props.action.text}
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

export enum IMessageTypes {
    'text'
}

export interface IMessage {
    text: string,
    type: IMessageTypes,
    from: string,
    time: string,
    actions: IAction[],
    buttons: IButton[],
    attachment: IAttachment,
    globalButtons: IButton[],
    additionalParameters: String[],
    elements: IElement[],
}

export interface IAttachment {
    url: string,
    type: string,
}

export interface IElement {
    title : string,
    image_url: string,
    item_url: string,
    subtitle: string,
    default_action: IAction,
    buttons: IButton[],
}


export interface IButton {
    type: string,
    title: string,
    url: string,
    payload: string,
}

export interface IAction {
    text: string,
    value: string,
}

interface IChatActionProps {
    messageHandler: Function,
    action: IAction,
}