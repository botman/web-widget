export const getUrlParameter = (url: string, name: string, defaults = '') => {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url);
    return results === null ? defaults : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


export const generateRandomId = () => Math.random().toString(36).substr(2, 6);

export const setCookie = (name: string, value: any, expirationInDays: string) => {
    let date = new Date();
    let expirationTime = parseInt(expirationInDays);
    date.setTime(date.getTime() + (expirationTime * 24 * 60 * 60 * 1000));

    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export const getCookie = (name: string) => {
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return false;
}