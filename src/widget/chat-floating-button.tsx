import { h, Component } from 'preact';
import { mobileClosedMessageAvatarStyle, closedChatAvatarImageStyle } from './style';
import { IConfiguration } from '../typings';

export default class ChatFloatingButton extends Component<IChatFloatingButtonProps, any> {

    render({onClick, conf}: IChatFloatingButtonProps, {}) {
        return (
            <div style={{position: 'relative', cursor: 'pointer'}} onClick={this.props.onClick}>
                <div
                    className="mobile-closed-message-avatar"
                    style={{
                        background: conf.bubbleBackground,
                        ...mobileClosedMessageAvatarStyle
                    }}
                >
                    {(conf.bubbleAvatarUrl === '') ?
                        <img src={'assets/img/chat-bubble.svg'} style={{paddingTop: 4}} />
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

interface IChatFloatingButtonProps {
    onClick: any,
    conf: IConfiguration
}