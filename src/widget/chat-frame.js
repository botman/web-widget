import { h, Component } from 'preact';

export default class ChatFrame extends Component {

	shouldComponentUpdate() {
		// do not re-render via diff:
		return false;
	}

	render({iFrameSrc, isMobile, conf},{}) {
		let dynamicConf = window.botmanWidget || {}; // these configuration are loaded when the chat frame is opened
		let encodedConf = encodeURIComponent(JSON.stringify({...conf, ...dynamicConf}));
		return (
			<iframe id="chatBotManFrame" src={iFrameSrc + '?conf=' + encodedConf}
				width='100%'
				height={isMobile ? '94%' : '100%'}
				frameborder='0'
				allowtransparency='true'
				style='background-color:transparent' />
		);
	}
}
