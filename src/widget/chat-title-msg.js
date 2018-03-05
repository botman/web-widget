import { h, Component } from 'preact';
import {desktopClosedMessageStyle, desktopIntroMessageStyle, desktopClosedMessageAvatarStyle, closedChatAvatarImageStyle} from './style';

export default class ChatTitleMsg extends Component {

    render({conf},{}) {
        return (
            <div style={{position: 'relative', cursor: 'pointer'}} onClick={this.props.onClick}>
                { (conf.introMessage) ?
                    <div
                        className="desktop-closed-message"
                        style={{background: conf.mainColor, ...desktopClosedMessageStyle}}
                    >
                        {conf.introMessage}
                        <div
                            style={{borderLeft: '10px solid '+conf.mainColor, ...desktopIntroMessageStyle}}
                        />
                    </div>:''}
                <div
                    className="desktop-closed-message-avatar"
                    style={{
                        background: conf.closedChatAvatarBackground,
                        ...desktopClosedMessageAvatarStyle
                    }}
                >
                    {(conf.closedChatAvatarUrl === '') ?
                        <svg style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '999px'
                        }}
                        fill="#000000" height="24" viewBox="0 0 24 24" width="24"
                        xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z" />
                        </svg>
                        :
                        ((conf.closedChatAvatarUrl.indexOf('/')!==-1) ?
                            <img
                                src={conf.closedChatAvatarUrl}
                                style={{...closedChatAvatarImageStyle}}
                            />: <center><br/>{conf.closedChatAvatarUrl}</center>)
                    }
                    { (conf.introMessage) ?
                        <div
                            style={{
                                background: '#d0021b',
                                width: '20px',
                                height: '20px',
                                borderRadius: '999px',
                                position: 'absolute',
                                right: '-5px',
                                bottom: '-5px',
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '0.8em',
                                lineHeight: '20px'
                            }}
                        >
                        1
                        </div>:''}

                </div>
            </div>
        );
    }
}
