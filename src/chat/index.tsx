import { h, render } from 'preact';
import Chat from './chat';
import { IConfiguration } from '../typings';
import { getUrlParameter, generateRandomId } from '../utils';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

let conf = {};

const confString = getUrlParameter(location.search, 'conf');
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
            conf={conf as IConfiguration}
        />,
        root
    );
}

function getUserId() {
    return (conf as IConfiguration).userId || generateRandomId();
}

