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
import { IConfiguration } from '../typings';
import { setCookie, getCookie } from '../utils';

export default class Widget extends Component<any, IWidgetState> {

    state: IWidgetState;

    constructor() {
        super();
        this.state.isChatOpen = false;
        this.state.pristine = true;
        this.state.wasChatOpened = this.wasChatOpened();
    }

    componentDidMount() {
        window.botmanChatWidget = new Api(this);
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
            wrapperStyle = (isChatOpen || this.wasChatOpened()) ?
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

                    (isChatOpen || this.wasChatOpened()) ?
                        (isChatOpen ?
                            <div style={{background: conf.mainColor, ...desktopTitleStyle}} onClick={this.toggle}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', padding: '0px 30px 0px 0px',
                                    fontSize: '15px', fontWeight: 'normal'
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
            wasChatOpened: false,
    	};
    	if (!this.state.isChatOpen && !this.wasChatOpened()) {
    		setCookie('chatwasopened', 1, this.props.conf.cookieValidInDays);
    		stateData.wasChatOpened = true;
    	}
    	this.setState(stateData);
    };

    open() {
        this.setState({
            pristine: false,
            isChatOpen: true
        });
    }

    close() {
        this.setState({
            pristine: false,
            isChatOpen: false
        });
    }

    wasChatOpened() {
    	return (getCookie('chatwasopened') !== false);
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
