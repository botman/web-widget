import dateFormat from 'dateformat';
import { h, Component } from 'preact';
import ChatAction from './chat-action';

const dayInMillis = 60 * 60 * 24 * 1000;

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
    				props.messages.map(({name, text, from, time, type, attachment, actions}) => {
    					//from is either 'visitor' or 'chatbot'
    					const msgTime = new Date(time);
    					const textObject = {'__html':text};
    					return (
    						<li class={from}>
    							<div class="msg">
    								<p dangerouslySetInnerHTML={textObject} />
    								{attachment && attachment.type === 'image' ?
    									<img src={attachment.url} style="max-width: 100%;" />
    									:
    									''
    								}
    								{attachment && attachment.type === 'audio' ?
    									<audio controls autoplay="" style="max-width: 100%;">
    										<source src={attachment.url} type="audio/mp3" />
    									</audio>
    									:
    									''
    								}
    								{attachment && attachment.type === 'video' ?
    									<video height={props.conf.videoHeight} controls autoplay="" style="max-width: 100%;">
    										<source src={attachment.url} type="video/mp4" />
    									</video>
    									:
    									''
    								}
    								{type === 'actions' &&
                                        actions.map((action, index) => <ChatAction messageHandler={this.props.messageHandler} action={action} />)
    								}
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
