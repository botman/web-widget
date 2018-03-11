import axios from 'axios';
import { IAttachment, IMessage } from './../typings';

class BotMan {

	userId: string;
	chatServer: string;

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
    		interactive: interactive ? '0' : '1' // FIXME: 
    	};

    	Object.keys(postData).forEach(key => data.append(key, postData[key]));

    	axios.post(this.chatServer, data).then(response => {
    		const messages = response.data.messages || [];

    		messages.forEach((msg: IMessage) => {
    			if (perMessageCallback) {
    				perMessageCallback(msg);
    			}
    		});

    		if (callback) {
    			callback(response.data);
    		}
    	});
    };

}

export let botman = new BotMan();