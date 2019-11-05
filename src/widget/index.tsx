import {h, render} from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './configuration';
import {IConfiguration} from "../typings";

if (window.attachEvent) {
    window.attachEvent('onload', initialize);
} else {
    window.addEventListener('load', initialize, false);
}

function getUrlParameter(name: string, defaults = '') {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(document.getElementById('botmanWidget').getAttribute('src'));
    return results === null ? defaults : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUserId(conf: IConfiguration) {
    return conf.userId || generateRandomId();
}

function getConfig () :IConfiguration {

    let settings = {};
    try {
        settings = JSON.parse(getUrlParameter('settings', '{}'));
    } catch (e) { }

    const dynamicConf = window.botmanWidget || {} as IConfiguration; // these configuration are loaded when the chat frame is opened

    dynamicConf.userId = getUserId({...defaultConfiguration, ...dynamicConf});

    if (typeof dynamicConf.echoChannel === 'function') {
        dynamicConf.echoChannel = dynamicConf.echoChannel(dynamicConf.userId);
    }

    return {...defaultConfiguration, ...settings, ...dynamicConf};
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 6);
}

function initialize () {

    const conf = getConfig();

    if (conf.autoInit) {
        injectChat();
    } else {
        window.botmanInit = injectChat;
    }
}

function injectChat() {
    let root = document.createElement('div');
    root.id = 'botmanWidgetRoot';
    document.getElementsByTagName('body')[0].appendChild(root);

    const conf = getConfig();

    const iFrameSrc = conf.frameEndpoint;

    render(
        <Widget
            isMobile={window.screen.width < 500}
            iFrameSrc={iFrameSrc}
            conf={conf}
        />,
        root
    );

    delete window.botmanInit;
}

declare global {
    interface Window { attachEvent: Function, botmanWidget: IConfiguration, botmanInit: Function }
}
