import { h, Component } from 'preact';
import {botman} from './../botman';
import TextType from './text';
import ActionType from './action';
import { IButton, IMessage, IMessageTypeProps, ButtonType } from '../../typings';
import ButtonsType from './buttons';

export default class ListType extends Component<IMessageTypeProps, any> {

    getButton(button: IButton) {
        if (button.type === ButtonType.POSTBACK) {
            return <div class="btn" onClick={() => this.performAction(button)}>
                {button.title}
            </div>;
        }
        if (button.type === ButtonType.WEB_URL) {
            return <a class="btn" href={button.url} target="_blank">{button.title}</a>;
        }
    }

    render(props: IMessageTypeProps) {
        const message = props.message;

        const globalButtons = message.globalButtons.map((button: IButton) => {
            return this.getButton(button);
        });

        const lists = message.elements.map((element) => {
            const elementButtons = element.buttons.map((button: IButton) => {
                return this.getButton(button);
            });

            return <div style={{minWidth: '200px'}}>
                <img src={element.image_url} />
                <p>{element.title}</p>
                <p>{element.subtitle}</p>
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
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, null);
    }
}
