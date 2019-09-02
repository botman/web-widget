import axios from 'axios';
import {h, Component} from 'preact';
import ChatFrame from './chat-frame';
import ChatFloatingButton from './chat-floating-button';
import ChatTitleMsg from './chat-title-msg';
import ArrowIcon from './arrow-icon';
import Api from './api';
import {
    desktopTitleStyle,
    desktopWrapperStyle,
    mobileOpenWrapperStyle,
    mobileClosedWrapperStyle,
    desktopClosedWrapperStyleChat
} from './style';
import {IConfiguration, IMessage} from '../typings';
import Echo from "laravel-echo";

export default class Widget extends Component<any, IWidgetState> {

    Echo: Echo;

    state: IWidgetState;

    constructor() {
        super();
        this.state.isChatOpen = false;
        this.state.pristine = true;
        this.state.wasChatOpened = false;
    }

    componentDidMount() {
        window.botmanChatWidget = new Api(this);

        this.setupEcho();

        if (typeof this.props.conf.init === 'function') {
            this.props.conf.init(window.botmanChatWidget);
        }
    }

    private setupEcho() {
        if (this.props.conf.useEcho === true) {

            this.Echo = new Echo(this.props.conf.echoConfiguration);
            // Join channel
            let channel;
            if (this.props.conf.echoChannelType === 'private') {
                channel = this.Echo.private(this.props.conf.echoChannel);
            } else {
                channel = this.Echo.channel(this.props.conf.echoChannel);
            }

            channel.listen(this.props.conf.echoEventName, (message: IMessage) => {
                window.botmanChatWidget.writeToMessages(message);
            });
        }
    }

    render(props: IWidgetProps, state: IWidgetState) {

        const {conf, isMobile} = props;
        const {isChatOpen, pristine} = state;
        const wrapperWidth = {width: isMobile ? conf.mobileWidth : conf.desktopWidth};
        const desktopHeight = (window.innerHeight - 100 < conf.desktopHeight) ? window.innerHeight - 90 : conf.desktopHeight;
        conf.wrapperHeight = desktopHeight;

        let wrapperStyle;

        if (!isChatOpen && (isMobile || conf.alwaysUseFloatingButton)) {
            wrapperStyle = { ...mobileClosedWrapperStyle}; // closed mobile floating button
        } else if (!isMobile){
            wrapperStyle = (isChatOpen || this.state.wasChatOpened) ?
                (isChatOpen) ?
                    { ...desktopWrapperStyle, ...wrapperWidth} // desktop mode, button style
                    :
                    { ...desktopClosedWrapperStyleChat}
                :
                { ...desktopClosedWrapperStyleChat}; // desktop mode, chat style
        } else {
            wrapperStyle = mobileOpenWrapperStyle; // open mobile wrapper should have no border
        }


        return (

            <div style={wrapperStyle}>

                {/* Open/close button */}
                {(isMobile || conf.alwaysUseFloatingButton) && !isChatOpen ?

                    <ChatFloatingButton onClick={this.toggle} conf={conf}/>

                    :

                    (isChatOpen || this.state.wasChatOpened) ?
                        (isChatOpen ?
                            <div style={{background: conf.mainColor, ...desktopTitleStyle}} onClick={this.toggle}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', padding: '0px 30px 0px 0px',
                                    fontSize: '15px', fontWeight: 'normal', color: conf.headerTextColor
                                }}>
                                    {conf.title}
                                </div>
                                <ArrowIcon isOpened={isChatOpen}/>
                            </div> : <ChatTitleMsg onClick={this.toggle} conf={conf}/>)
                        :
                        <ChatTitleMsg onClick={this.toggle} conf={conf}/>
                }

                {/*Chat IFrame*/}
                <div key='chatframe' style={{
                    display: isChatOpen ? 'block' : 'none',
                    height: isMobile ? conf.mobileHeight : desktopHeight
                }}>
                    {pristine ? null : <ChatFrame {...this.props} />}
                </div>

            </div>
        );
    }

    toggle = () => {
    	let stateData = {
    		pristine: false,
            isChatOpen: !this.state.isChatOpen,
            wasChatOpened: this.state.wasChatOpened
    	};
    	if (!this.state.isChatOpen && !this.state.wasChatOpened) {
    	    if (this.props.conf.sendWidgetOpenedEvent) {
    	        setTimeout(() => {
    	            this.sendOpenEvent();
                }, 500);
            }
    		stateData.wasChatOpened = true;
    	}
    	this.setState(stateData);
    };

    open() {
        this.setState({
            pristine: false,
            isChatOpen: true,
            wasChatOpened: true
        });
    }

    close() {
        this.setState({
            pristine: false,
            isChatOpen: false
        });
    }

    private sendOpenEvent() {
        let data = new FormData();
        data.append('driver', 'web');
        data.append('eventName', 'widgetOpened');
        data.append('eventData', this.props.conf.widgetOpenedEventData);
        data.append('userId', window.botmanWidget.userId);

        axios.post(this.props.conf.chatServer, data).then(response => {
            const messages = response.data.messages || [];

            messages.forEach((message : IMessage) => {
                window.botmanChatWidget.writeToMessages(message);
            });
        });
    }
}

interface IWidgetState {
    isChatOpen: boolean,
    pristine: boolean,
    wasChatOpened: boolean,
}


interface IWidgetProps {
    iFrameSrc: string,
    conf: IConfiguration,
    isMobile: boolean,
}

declare global {
    interface Window { attachEvent: Function, botmanChatWidget: Api }
}

// FIXME: toGMTString is deprecated
interface IDate extends Date {
  toUTCString(): string;
}
