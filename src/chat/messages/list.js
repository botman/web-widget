import { h, Component } from 'preact';
import {botman} from './../botman';
import TextType from './text';
import ActionType from './action';

export default class ListType extends Component {

    getButton(button) {
        if (button.type === 'postback') {
            return <div class="btn" onClick={() => this.performAction(button)}>
                {button.title}
            </div>;
        }
        if (button.type === 'web_url') {
            return <a class="btn" href={button.url} target="_blank">{button.title}</a>;
        }
    }

    render(props) {
        const message = props.message;

        const globalButtons = message.globalButtons.map((button) => {
            return this.getButton(button);
        });

        const lists = message.elements.map((element) => {
            const elementButtons = element.buttons.map((button) => {
                return this.getButton(button);
            });

            return <div style={{minWidth: '200px'}}>
                <img src={element.image_url} />
                <p>{element.title}</p>
                <p>{element.subtitle}</p>
                {elementButtons}
            </div>
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
