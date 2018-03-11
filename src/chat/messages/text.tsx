import { h, Component } from "preact";

export default class TextType extends Component {
    render(props) {
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
                    <audio controls autoplay="" style="max-width: 100%;">
                        <source src={attachment.url} type="audio/mp3" />
                    </audio>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "video" ? (
                    <video
                        height={props.conf.videoHeight}
                        controls
                        autoplay=""
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
