import { h, Component } from 'preact';
import * as dateFormat from 'dateformat';
import ActionType from './messages/action';
import TextType from "./messages/text";
import ButtonsType from "./messages/buttons";
import ListType from "./messages/list";
import {IConfiguration, IMessage, IMessageTypeState} from '../typings';
import TypingIndicator from "./messages/typing-indicator";

const dayInMillis = 60 * 60 * 24 * 1000;

const messageTypes = {
    actions: ActionType,
    buttons: ButtonsType,
    list: ListType,
    text: TextType,
	typing_indicator: TypingIndicator
};

export default class MessageArea extends Component<IMessageAreaProps, any> {
    scrollToBottom = () => {
    	const messageArea = document.getElementById('messageArea');
    	messageArea.scrollTop = messageArea.scrollHeight;
    };

    executeJS = () => {
    	const scripts = document.getElementById('messageArea').getElementsByTagName('script');
    	for (let i = 0; i < scripts.length; i++) {
    		try {
    			eval(scripts[i].innerHTML);
    		} catch (error) {
    			// console.log('Error caught:',error);
    		}
    	}
    };

    componentDidMount() {
    	this.scrollToBottom();
    	this.executeJS();
    }

    componentDidUpdate() {
    	this.scrollToBottom();
    	this.executeJS();
    }

    messageVisibilityChange = (message: IMessage, messageState: IMessageTypeState) => {
		this.props.messages.map((msg) => {
			if (msg.id === message.id && msg.visible !== messageState.visible) {
				msg.visible = messageState.visible;
				// Reset the timeout
				msg.timeout = 0;
                this.forceUpdate();
			}
			return msg;
		});
	};

    render(props: IMessageAreaProps, {}) {
    	const currentTime = new Date();
    	//TODO  60px because 57px is the size of the input field
    	const styleChat = 'height:'+(props.conf.wrapperHeight-60)+'px;';

		let calculatedTimeout = 0;
    	return (
    		<ol class="chat" style={styleChat} >
    			{
    				props.messages.map((message) => {
    					const msgTime = new Date(message.time);
						const MessageComponent = messageTypes[message.type] || TextType;
						const { messageHandler, conf } = this.props;

						let styles = '';
						if (message.visible === false || message.visibilityChanged === false) {
							styles += 'display:none';
						}

    					const listElement = (
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

						calculatedTimeout += message.timeout * 1000;

						return listElement;
    				})
    			}
    		</ol>
    	);
    }

}

interface IMessageAreaProps {
	conf: IConfiguration,
	messages: IMessage[],
	messageHandler: Function,
};