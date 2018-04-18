import { h, Component } from "preact";
import MessageArea from "./message-area";
import { botman } from "./botman";
import {IMessage, IConfiguration} from "../typings";

export default class Chat extends Component<IChatProps, IChatState> {

    [key: string]: any
    botman: any;
    input: HTMLInputElement;
    textarea: HTMLInputElement;

    constructor(props: IChatProps) {
        super(props);

        this.botman = botman;
        this.botman.setUserId(this.props.userId);
        this.botman.setChatServer(this.props.conf.chatServer);
        this.state.messages = [];
        this.state.replyType = ReplyType.Text;
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

                {this.state.replyType === ReplyType.Text ? (
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
                ) : ''}

                {this.state.replyType === ReplyType.TextArea ? (
                    <div>

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             onClick={this.handleSendClick}
                             style="cursor: pointer; position: absolute; width: 25px; bottom: 19px; right: 16px; z-index: 1000"
                             viewBox="0 0 535.5 535.5">
                            <g>
                                <g id="send">
                                    <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"/>
                                </g>
                            </g>
                        </svg>

                        <textarea
                            id="userText"
                            class="textarea"
                            placeholder={this.props.conf.placeholderText}
                            ref={input => {
                                this.textarea = input as HTMLInputElement;
                            }}
                            autofocus
                        />
                    </div>
                ) : ''}

                <a class="banner" href={this.props.conf.aboutLink} target="_blank">
                    {this.props.conf.aboutText === "AboutIcon" ? (
                        <svg
                            style="position: absolute; width: 14px; bottom: 6px; right: 6px;"
                            fill="#EEEEEE"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1536 1792"
                        >
                            <path d="M1024 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                        </svg>
                    ) : (
                        this.props.conf.aboutText
                    )}
                </a>
            </div>
        );
    }

    handleKeyPress = (e: KeyboardEvent) => {
        if (e.keyCode === 13 && this.input.value.replace(/\s/g, "")) {
            this.say(this.input.value);

            // Reset input value
            this.input.value = "";
        }
    };

    handleSendClick = (e: MouseEvent) => {
        this.say(this.textarea.value);

        // Reset input value
        this.textarea.value = "";
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

	    if (msg.additionalParameters && msg.additionalParameters.replyType) {
	        this.setState({
                replyType: msg.additionalParameters.replyType
            });
        }
	};
}

interface IChatProps {
    userId: string,
    conf: IConfiguration
}

enum ReplyType {
    Text = "text",

    TextArea = "textarea"
}

interface IChatState {
    messages: IMessage[],

    replyType: string,
}