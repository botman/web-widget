export const defaultConfiguration = {
	chatServer: '/botman',
	titleClosed: '...',
	titleOpen: 'BotMan Widget',
	closedStyle: 'button', // button or chat
	timeFormat: 'HH:MM',
	dateTimeFormat: 'm/d/yy HH:MM',
	closedChatAvatarBackground: '#196eb4',
	closedChatAvatarUrl: '',
	cookieExpiration: 1, // in days. Once opened, closed chat title will be shown as button (when closedStyle is set to 'chat')
	introMessage: '', //empty value will not show any message
	autoResponse: '...', //empty value will not show any message
	//requestReceivedByServerResponse: '<div class="loading-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>',
	playSound: true,
	placeholderText: 'Send a message...',
	displayMessageTime: true,
	mainColor: '#196eb4',
	alwaysUseFloatingButton: false,
	desktopHeight: 450,
	desktopWidth: 370,
	mobileHeight: '100%',
	mobileWidth: '300px',
	aboutLink: 'https://botman.io',
	aboutText: 'Powered by BotMan',
	chatId: '',
	userId: '',
	videoHeight: 160
};
