import { h, Component } from 'preact';
import {desktopClosedMessageStyle, desktopIntroMessageStyle, desktopClosedMessageAvatarStyle, closedChatAvatarImageStyle} from './style';

export default class ChatTitleMsg extends Component<any, any> {

    render({conf}: IChatTitleMsgProps,{}) {
        return (
            <div style={{position: 'relative', cursor: 'pointer'}} onClick={this.props.onClick}>
                <div
                    className="desktop-closed-message-avatar"
                    style={{
                        background: conf.bubbleBackground,
                        ...desktopClosedMessageAvatarStyle
                    }}
                >
                    {(conf.bubbleAvatarUrl === '') ?
                        <img style={{
                            width: '60%',
                            height: 'auto'
                        }}
                        src={'assets/img/bubble-avatar-url.svg'} />
                        :
                        ((conf.bubbleAvatarUrl.indexOf('/')!==-1) ?
                            <img
                                src={conf.bubbleAvatarUrl}
                                style={{...closedChatAvatarImageStyle}}
                            />: <div style={{ display: 'flex', alignItems: 'center' }}><br/>{conf.bubbleAvatarUrl}</div>)
                    }
                </div>
            </div>
        );
    }
}

interface IChatTitleMsgProps {
    conf: { 
        bubbleAvatarUrl: string,
        bubbleBackground: string
    }
}