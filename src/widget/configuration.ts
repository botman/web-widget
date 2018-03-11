import { IConfiguration } from "../typings";

export const defaultConfiguration: IConfiguration = {
    chatServer: '/botman',
    frameEndpoint: '/botman/chat',
    timeFormat: 'HH:MM',
    dateTimeFormat: 'm/d/yy HH:MM',
    title: 'BotMan Widget',
    cookieValidInDays: 1,
    introMessage: '',
    placeholderText: 'Send a message...',
    displayMessageTime: true,
    mainColor: '#408591',
    bubbleBackground: '#408591',
    bubbleAvatarUrl: '',
    desktopHeight: 450,
    desktopWidth: 370,
    mobileHeight: '100%',
    mobileWidth: '300px',
    videoHeight: 160,
    aboutLink: 'https://botman.io',
    aboutText: '⚡ Powered by BotMan',
    chatId: '',
    userId: '',
    // FIXME: this is overrided in widget.tsx, probably shouldn't be in conf
    wrapperHeight: 100,
    alwaysUseFloatingButton: false,
};
