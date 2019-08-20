import axios from 'axios';
import { IAttachment, IMessage, IExtra } from './../typings';

class BotMan {

	extra: IExtra;
	userId: string;
	chatServer: string;
	
	setExtra(params: IExtra) {
		this.extra = params;
	}

    setUserId(userId: string) {
        this.userId = userId;
    }

    setChatServer(chatServer: string) {
        this.chatServer = chatServer;
    }

    callAPI = (text: string, interactive = false, attachment: IAttachment = null, perMessageCallback: Function, callback: Function) => {
    	let data = new FormData();
    	const postData: { [index: string] : string|Blob } = {
    		driver: 'web',
    		userId: this.userId,
    		message: text,
    		attachment: attachment as Blob,
    		interactive: interactive ? '1' : '0'
		};
		
		if (this.extra) {

			Object.keys(this.extra).forEach(key => data.append(key, this.extra[key]));
		}
	
    	Object.keys(postData).forEach(key => data.append(key, postData[key]));

    	axios.post(this.chatServer, data).then(response => {
    		const messages = response.data.messages || [];

			if (perMessageCallback) {
				messages.forEach((msg: IMessage) => {
					perMessageCallback(msg);
				});
			}

    		if (callback) {
    			callback(response.data);
    		}
    	});
    };

}

export let botman = new BotMan();
