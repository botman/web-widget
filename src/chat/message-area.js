import dateFormat from 'dateformat';
import { h, Component } from 'preact';
import ActionType from './messages/action';
import TextType from "./messages/text";
import ButtonsType from "./messages/buttons";
import ListType from "./messages/list";

const dayInMillis = 60 * 60 * 24 * 1000;

const messageTypes = {
	actions: ActionType,
	buttons: ButtonsType,
	list: ListType,
	text: TextType
};

export default class MessageArea extends Component {
    scrollToBottom = () => {
    	const messageArea = document.getElementById('messageArea');
    	messageArea.scrollTop = messageArea.scrollHeight;
    };

    executeJS = () => {
    	const scripts = document.getElementById('messageArea').getElementsByTagName('script');
    	for (let i = 0; i < scripts.length; i++) {
    		try {
    			window.eval(scripts[i].innerHTML);
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

    render(props,{}) {
    	const currentTime = new Date();
    	//TODO  60px because 57px is the size of the input field
    	const styleChat = 'height:'+(props.conf.wrapperHeight-60)+'px;';

    	return (
    		<ol class="chat" style={styleChat} >
    			{
    				props.messages.map((message) => {
    					//from is either 'visitor' or 'chatbot'
    					const msgTime = new Date(message.time);
    					const MessageComponent = messageTypes[message.type] || 'text';

    					return (
    						<li class={message.from}>
    							<div class="msg">
                                    <MessageComponent message={message} {...this.props} />
    								{ (props.conf.displayMessageTime) ?
    									<div class="time">
    										{
    											currentTime - msgTime < dayInMillis ?
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
    				})
    			}
    		</ol>
    	);
    }

}
