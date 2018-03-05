import {h, render} from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './default-configuration';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

function getUrlParameter(name, defaults = '') {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(document.getElementById('botmanWidget').src);
    return results === null ? defaults : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getBaseUrl(){
    return document.getElementById('botmanWidget').src.split( 'js/widget.js' )[0];
}

function injectChat() {
    let root = document.createElement('div');
    root.id = 'botmanWidgetRoot';
    document.getElementsByTagName('body')[0].appendChild(root);

    const settings = JSON.parse(getUrlParameter('settings', '{}'));

    const dynamicConf = window.botmanWidget || {}; // these configuration are loaded when the chat frame is opened

    const conf = {...defaultConfiguration, ...settings, ...dynamicConf};
    const iFrameSrc = getBaseUrl()+conf.frameEndpoint;

    render(
        <Widget
            isMobile={window.screen.width < 500}
            iFrameSrc={iFrameSrc}
            conf={conf}
        />,
        root
    );

}
