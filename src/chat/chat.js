import {h, Component} from 'preact';
import MessageArea from './message-area';
import {botman} from './botman';

export default class Chat extends Component {

    constructor(props) {
        super(props);

        this.botman = botman;
        this.botman.setUserId(this.props.userId);
        this.botman.setChatServer(this.props.conf.chatServer);
        this.state.messages = [];
    }

    componentDidMount() {
        if (!this.state.messages.length && this.props.conf.introMessage) {
            this.writeToMessages({
                text: this.props.conf.introMessage,
                type: 'text',
                from: 'chatbot'
            });
        }
        // Add event listener for widget API
        window.addEventListener('message', (event) => {
            try {
                this[event.data.method].apply(this, event.data.params);
            } catch (e) {
                //
            }
        });
    }

    sayAsBot (text) {
        this.writeToMessages({
            text,
            type: 'text',
            from: 'chatbot'
        });
    }

    say (text, showMessage = true) {

        const message = {
            text,
            type: 'text',
            from: 'visitor'
        };

        // Send a message from the html user to the server
        this.botman.callAPI(message.text, false, null, (msg) => {
        	msg.from = 'chatbot';
            this.writeToMessages(msg);
        });

        if (showMessage) {
        	this.writeToMessages(message);
        }
    }

    whisper (text) {
        this.say(text, false);
    }

    render({}, state) {
        return (
            <div>
                <div id="messageArea">
                    <MessageArea messages={state.messages} conf={this.props.conf} messageHandler={this.writeToMessages} />
                </div>
                <input id="userText" class="textarea" type="text" placeholder={this.props.conf.placeholderText}
                    ref={(input) => {
                        this.input = input;
                    }}
                    onKeyPress={this.handleKeyPress} autofocus />

                <a class="banner" href={this.props.conf.aboutLink} target="_blank">
                    {(this.props.conf.aboutText === 'AboutIcon') ?
                        <svg style="position: absolute; width: 14px; bottom: 6px; right: 6px;" fill="#EEEEEE" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1024 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
                        : this.props.conf.aboutText}
                </a>
            </div>
        );
    }

    handleKeyPress = (e) => {
    	if (e.keyCode === 13 && this.input.value.replace(/\s/g,'')) {
    		this.say(this.input.value);

    		// Reset input value
    		this.input.value = '';
    	}
    };

    writeToMessages = (msg) => {
    	if (typeof msg.time === 'undefined') {
    		msg.time = (new Date()).toJSON(); //2015-10-26T07:46:36.611Z
    	}
    	if (msg.attachment === null) {
    		msg.attachment = {};
    	}

    	this.state.messages.push(msg);

    	this.setState({
    		messages: this.state.messages
    	});
    }
}

