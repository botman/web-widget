import { h, Component } from "preact";
import MessageArea from "./message-area";
import { botman } from "./botman";
import { IMessage, IConfiguration } from "../typings";

export default class Chat extends Component<IChatProps, IChatState> {

    [key: string]: any
    botman: any;
    input: HTMLInputElement;

    constructor(props: IChatProps) {
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
                type: "text",
                from: "chatbot"
            });
        }
        // Add event listener for widget API
        window.addEventListener("message", (event: MessageEvent) => {
            try {
                this[event.data.method](...event.data.params);
            } catch (e) {
                //
            }
        });
    }

    sayAsBot(text: string) {
        this.writeToMessages({
            text,
            type: "text",
            from: "chatbot"
        });
    }

    say(text: string, showMessage = true) {
        const message: IMessage = {
            text,
            type: "text",
            from: "visitor"
        };

        // Send a message from the html user to the server
        this.botman.callAPI(message.text, false, null, (msg: IMessage) => {
            msg.from = "chatbot";
            this.writeToMessages(msg);
        });

        if (showMessage) {
            this.writeToMessages(message);
        }
    }

    whisper(text: string) {
        this.say(text, false);
    }

    render({}, state: IChatState) {
        return (
            <div>
                <div id="messageArea">
                    <MessageArea
                        messages={state.messages}
                        conf={this.props.conf}
                        messageHandler={this.writeToMessages}
                    />
                </div>
                <input
                    id="userText"
                    class="textarea"
                    type="text"
                    placeholder={this.props.conf.placeholderText}
                    ref={input => {
                        this.input = input as HTMLInputElement;
                    }}
                    onKeyPress={this.handleKeyPress}
                    autofocus
                />

                <a class="banner" href={this.props.conf.aboutLink} target="_blank">
                    {this.props.conf.aboutText === "AboutIcon" ? (
                        <img style="position: absolute; width: 14px; bottom: 6px; right: 6px;" src={'assets/img/about.svg'} />

                    ) : (
                        this.props.conf.aboutText
                    )}
                </a>
            </div>
        );
    }

	handleKeyPress = (e: KeyboardEvent) => {
	    if (e.keyCode === 13 && this.input.value.trim()) {
	        this.say(this.input.value);

	        // Reset input value
	        this.input.value = "";
	    }
	};

    static generateUuid() {
        let uuid = '', ii;
        for (ii = 0; ii < 32; ii += 1) {
            switch (ii) {
                case 8:
                case 20:
                    uuid += '-';
                    uuid += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    uuid += '-';
                    uuid += '4';
                    break;
                case 16:
                    uuid += '-';
                    uuid += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    uuid += (Math.random() * 16 | 0).toString(16);
            }
        }
        return uuid;
    }

	writeToMessages = (msg: IMessage) => {
        if (typeof msg.time === "undefined") {
            msg.time = new Date().toJSON();
        }
        if (typeof msg.visible === "undefined") {
            msg.visible = false;
        }
        if (typeof msg.timeout === "undefined") {
            msg.timeout = 0;
        }
        if (typeof msg.id === "undefined") {
            msg.id = Chat.generateUuid();
        }

	    if (msg.attachment === null) {
	        msg.attachment = {}; // TODO: This renders IAttachment useless
	    }

	    this.state.messages.push(msg);
	    this.setState({
	        messages: this.state.messages
	    });
	};
}

interface IChatProps {
    userId: string,
    conf: IConfiguration
}

interface IChatState {
    messages: IMessage[],
}