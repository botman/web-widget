import {h, render} from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './configuration';
import { getUrlParameter } from '../utils';
import { IConfiguration } from '../typings';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}


function injectChat() {
    let root = document.createElement('div');
    root.id = 'botmanWidgetRoot';
    document.getElementsByTagName('body')[0].appendChild(root);

    let settings = {};
    try {
        settings = JSON.parse(getUrlParameter(document.getElementById('botmanWidget').getAttribute('src'), 'settings', '{}'));
    } catch (e) { }

    const dynamicConf = window.botmanWidget || {}; // these configuration are loaded when the chat frame is opened

    const conf = {...defaultConfiguration, ...settings, ...dynamicConf};

    const iFrameSrc = conf.frameEndpoint;

    render(
        <Widget
            isMobile={window.screen.width < 500}
            iFrameSrc={iFrameSrc}
            conf={conf}
        />,
        root
    );

}

declare global {
    interface Window { attachEvent: Function, botmanWidget: IConfiguration }
}
