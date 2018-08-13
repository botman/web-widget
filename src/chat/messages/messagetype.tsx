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

    onVisibilityChange = () => {};

    /**
     * Check if we have a timeout
     */
    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible : true });
            //this.state.visibilityChanged = true;
            this.setState({ visibilityChanged: true });
            this.onVisibilityChange();
            this.props.onVisibilityChange(this.props.message, this.state);
        }, this.props.timeout || 0);
    }

}
