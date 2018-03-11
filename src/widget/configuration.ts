export interface IConfiguration {
    /**
     * The URL of the BotMan route / server to use.
     */
    chatServer: string,
    /**
     * The location of your chat frame URL / route.
     */
    frameEndpoint: string,
    /**
     * Date and time format to use
     */
    timeFormat: string;
    dateTimeFormat: string,
    /**
     * The title to use in the widget header.
     */
    title: string,
    /**
     * How many days is the cookie valid?
     */
    cookieValidInDays: number,
    /*
     * This is a welcome message that every new user sees
     * when the widget is opened for the first time.
     */
    introMessage: string,
    /*
     * Input placeholder text
     */
    placeholderText: string,
    /*
     * Toggle display of message times
     */
    displayMessageTime: boolean,
    mainColor: string,
    bubbleBackground: string,
    bubbleAvatarUrl: string,
    desktopHeight: number,
    desktopWidth: number,
    mobileHeight: string,
    mobileWidth: string,
    videoHeight: number,
    aboutLink: string,
    aboutText: string,
    chatId: string,
    userId: string,
    wrapperHeight: number,
    alwaysUseFloatingButton: boolean,
}

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
