import { h, render } from 'preact';
import Chat from './chat';

if (window.attachEvent) {
	window.attachEvent('onload', injectChat);
} else {
	window.addEventListener('load', injectChat, false);
}

let conf = {};
const confString = getUrlParameter('conf');
if (confString) {
	try {
		conf = JSON.parse(confString);
	} catch (e) {
		console.error('Failed to parse conf', confString, e);
	}
}

function injectChat() {
	let root = document.createElement('div');
	root.id = 'botmanChatRoot';
	document.getElementsByTagName('body')[0].appendChild(root);

	render(
		<Chat
			userId={getUserId()}
			conf={conf}
		/>,
		root
	);
}



function getUrlParameter(name) {
	name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
	let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	let results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUserId () {
	return conf.userId || generateRandomId();
}

function generateRandomId() {
	return Math.random().toString(36).substr(2, 6);
}