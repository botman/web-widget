import { h, Component } from 'preact';
import * as dateFormat from 'dateformat';
import ActionType from './messages/action';
import TextType from "./messages/text";
import ButtonsType from "./messages/buttons";
import ListType from "./messages/list";
import {IConfiguration, IMessage, IMessageTypeState} from '../typings';
import TypingIndicator from "./messages/typing-indicator";
import MessageHolder from "./message-holder";

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

    render(props: IMessageAreaProps, {}) {
    	const styleChat = 'height:'+(props.conf.wrapperHeight-60)+'px;';

		let calculatedTimeout = 0;
    	return (
    		<ol class="chat" style={styleChat} >
    			{
    				props.messages.map((message) => {
    					const listElement = <MessageHolder
							message={message}
							calculatedTimeout={calculatedTimeout}
							messageHandler={props.messageHandler}
							conf={props.conf}
						/>;

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