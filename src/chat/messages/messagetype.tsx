import { h, Component } from 'preact';
import {IMessageTypeProps, IMessageTypeState} from '../../typings';

export default abstract class MessageType extends Component<IMessageTypeProps, IMessageTypeState> {

    constructor() {
        super();
        this.state = {
            visible: false,
            visibilityChanged: false,
            attachmentsVisible: true
        };
    }

    /**
     * Check if we have a timeout
     */
    componentDidMount() {
        setTimeout(() => {
            this.state.visible = true;
            this.state.visibilityChanged = true;
            this.props.onVisibilityChange(this.props.message, this.state);
        }, this.props.timeout || 0);
    }

}