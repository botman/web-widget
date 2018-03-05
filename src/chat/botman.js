import axios from 'axios';

class BotMan {

	setUserId(userId) {
		this.userId = userId;
	}

	setChatServer(chatServer) {
		this.chatServer = chatServer;
	}

    callAPI = (text, interactive = false, attachment = null, perMessageCallback, callback) => {
    	let data = new FormData();
    	const postData = {
    		driver: 'web',
    		userId: this.userId,
    		message: text,
    		attachment,
    		interactive
    	};

    	Object.keys(postData).forEach(key => data.append(key, postData[key]));

    	axios.post(this.chatServer, data).then(response => {
    		const messages = response.data.messages || [];

    		messages.forEach(msg => {
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