import {h, render} from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './configuration';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

function getUrlParameter(name: string, defaults = '') {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(document.getElementById('botmanWidget').getAttribute('src'));
    return results === null ? defaults : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function injectChat() {
    let root = document.createElement('div');
    root.id = 'botmanWidgetRoot';
    document.getElementsByTagName('body')[0].appendChild(root);

    let settings = {};
    try {
        settings = JSON.parse(getUrlParameter('settings', '{}'));
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
    interface Window { attachEvent: Function, botmanWidget: Widget }
}
