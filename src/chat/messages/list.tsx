import { h, Component } from 'preact';
import {botman} from '../botman';
import MessageType from "./messagetype";
import { IButton, IMessage, IMessageTypeProps } from '../../typings';

export default class ListType extends MessageType {

    getButton(button: IButton) {
        if (button.type === 'postback') {
            return <div class="btn" onClick={() => this.performAction(button)}>
                {button.title}
            </div>;
        }
        if (button.type === 'web_url') {
            return <a class="btn" href={button.url} target="_blank">{button.title}</a>;
        }
    }

    render(props: IMessageTypeProps) {
        const message = props.message;

        let globalButtons: any[];

        if (typeof message.globalButtons !== 'undefined') {
            globalButtons = message.globalButtons.map((button: IButton) => {
                return this.getButton(button);
            });
        }

        const lists = message.elements.map((element) => {
            const elementButtons = element.buttons.map((button: IButton) => {
                return this.getButton(button);
            });

            return <div style={{minWidth: '200px', paddingRight: '10px'}}>
                <img src={element.image_url} width={200} />
                <p style={{fontWeight: 'bold', padding: '5px'}}>{element.title}</p>
                <p style={{padding: '5px'}}>{element.subtitle}</p>
                {elementButtons}
            </div>;
        });

        return (
            <div>
                <div style={{overflowX: 'scroll', display: 'flex'}}>
                    {lists}
                </div>
                {globalButtons}
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
                elements: msg.elements,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, null);
    }
}
