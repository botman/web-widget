import { h, Component } from "preact";
import { IMessage } from "../chat-action";
import { IConfiguration } from "../../widget/configuration";

interface ITextTypeProps {
    message: IMessage,
    messageHandler: Function,
    conf: IConfiguration
}


export default class TextType extends Component<ITextTypeProps, any> {
    render(props: ITextTypeProps) {
        const message = props.message;
        const attachment = message.attachment;

        const textObject = { __html: message.text };

        return (
            <div>
                <p dangerouslySetInnerHTML={textObject} />

                {attachment && attachment.type === "image" ? (
                    <img src={attachment.url} style="max-width: 100%;" />
                ) : (
                    ""
                )}
                {attachment && attachment.type === "audio" ? (
                    <audio controls autoPlay={false} style="max-width: 100%;">
                        <source src={attachment.url} type="audio/mp3" />
                    </audio>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "video" ? (
                    <video
                        height={props.conf.videoHeight}
                        controls
                        autoPlay={false}
                        style="max-width: 100%;"
                    >
                        <source src={attachment.url} type="video/mp4" />
                    </video>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
