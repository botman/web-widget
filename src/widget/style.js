
export const desktopWrapperStyle = {
	position: 'fixed',
	bottom: '20px',
	right: '20px',
	zIndex: 2147483647,
	borderRadius: '5px',
	boxSizing: 'content-box',
	boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
	overflow: 'hidden'
};

export const desktopClosedWrapperStyleChat = {
	position: 'fixed',
	bottom: '0px',
	right: '0px',
	zIndex: 2147483647,
	minWidth: '400px',
	boxSizing: 'content-box',
	overflow: 'hidden',
	minHeight: '120px'
};

export const mobileClosedWrapperStyle = {
	position: 'fixed',
	bottom: '0px',
	right: '0px',
	zIndex: 2147483647,
	minWidth: '400px',
	boxSizing: 'content-box',
	overflow: 'hidden',
	minHeight: '120px'
};

export const mobileOpenWrapperStyle = {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	zIndex: 2147483647,
	width: '100%',
	height: '100%',
	overflowY: 'visible',
	boxSizing: 'content-box'
};

export const desktopTitleStyle = {
	height: '40px',
	lineHeight: '30px',
	fontSize: '20px',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '5px 0 5px 20px',
	fontFamily: 'Lato, sans-serif',
	color: '#fff',
	cursor: 'pointer',
	boxSizing: 'content-box',
	mozBoxSizing: 'content-box',
	webkitBoxSizing: 'content-box'
};

export const mobileTitleStyle = {
	height: 52,
	width: 52,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	webkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
	boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
	cursor: 'pointer',
	borderRadius: '50%'
};

export const desktopClosedMessageStyle = {
	letterSpacing: '1px',
	color: '#fff',
	display: 'block',
	position: 'absolute',
	fontSize: '14px',
	top: 0,
	right: '130px',
	marginTop: '23px',
	borderRadius: '5px',
	padding: '15px 20px',
	boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)'
};

export const desktopIntroMessageStyle = {
	width: 0,
	height: 0,
	position: 'absolute',
	top: '12px',
	right: '-10px',
	borderTop: '10px solid transparent',
	borderBottom: '10px solid transparent'
};

export const desktopClosedMessageAvatarStyle = {
	display: 'block',
	position: 'absolute',
	top: '38px',
	right: '20px',
	height: '60px',
	width: '60px',
	border: 0,
	borderRadius: '50%',
	boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)'
};

export const mobileClosedMessageAvatarStyle = {
	display: 'block',
	position: 'absolute',
	top: '46px',
	right: '20px',
	height: '52px',
	width: '52px',
	border: 0,
	borderRadius: '50%',
	boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)'
};

export const closedChatAvatarImageStyle = {
	width: '100%',
	height: 'auto',
	borderRadius: '999px'
};
