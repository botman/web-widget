import axios from 'axios';
import { IAttachment, IMessage } from './../typings';

class BotMan {

	userId: string;
	chatServer: string;
	messagesServer: string;

    setUserId(userId: string) {
        this.userId = userId;
    }

    setChatServer(chatServer: string, messagesServer: string) {
        this.chatServer = chatServer;
        this.messagesServer = messagesServer;
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

    getNextMessages = (since: number, callback: Function) => {
        let url: string = `${this.messagesServer}&user_id=${this.userId}`;

        if (since) {
            url += `&since=${since}`;
        }

        axios.get(url).then(response => {
            callback(response.data);
        });
    }

}

export let botman = new BotMan();
