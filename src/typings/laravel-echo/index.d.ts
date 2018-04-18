interface IEchoChannel {
    /**
     * The Echo options.
     *
     * @type {any}
     */
    options: any;

    /**
     * Listen for an event on the channel instance.
     *
     * @param  {string} event
     * @param  {Function} callback
     * @return {IEchoChannel}
     */
    listen(event: string, callback: Function): IEchoChannel;

    /**
     * Listen for an event on the channel instance.
     *
     * @param  {string} event
     * @param  {Function} callback
     * @return {IEchoChannel}
     */
    notification(callback: Function): IEchoChannel;

    /**
     * Listen for a whisper event on the channel instance.
     *
     * @param  {string} event
     * @param  {Function}   callback
     * @return {PusherChannel}
     */
    listenForWhisper(event: string, callback: Function): IEchoChannel;
}

interface IEchoPresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     *
     * @param  {Function} callback
     * @return {object} IEchoPresenceChannel
     */
    here(callback: Function): IEchoPresenceChannel;

    /**
     * Listen for someone joining the channel.
     *
     * @param  {Function} callback
     * @return {IEchoPresenceChannel}
     */
    joining(callback: Function): IEchoPresenceChannel;

    /**
     * Listen for someone leaving the channel.
     *
     * @param  {Function} callback
     * @return {IEchoPresenceChannel}
     */
    leaving(callback: Function): IEchoPresenceChannel;
}

declare module 'laravel-echo' {

    export default class Echo {
        /**
         * The broadcasting connector.
         *
         * @type {object}
         */
        connector: any;

        /**
         * The Echo options.
         *
         * @type {array}
         */
        options: any;

        /**
         * Create a new class instance.
         *
         * @param  {object} options
         */
        constructor(options: any);

        /**
         * Register a Vue HTTP interceptor to add the X-Socket-ID header.
         */
        registerVueRequestInterceptor(): void;

        /**
         * Register an Axios HTTP interceptor to add the X-Socket-ID header.
         */
        registerAxiosRequestInterceptor(): void;

        /**
         * Register jQuery AjaxSetup to add the X-Socket-ID header.
         */
        registerjQueryAjaxSetup(): void;

        /**
         * Listen for an event on a channel instance.
         */
        listen(channel: string, event: string, callback: Function): Function;

        /**
         * Get a channel instance by name.
         *
         * @param  {string}  channel
         * @return {object}
         */
        channel(channel: string): IEchoChannel;

        /**
         * Get a private channel instance by name.
         *
         * @param  {string} channel
         * @return {object}
         */
        private(channel: string): IEchoChannel;

        /**
         * Get a presence channel instance by name.
         *
         * @param  {string} channel
         * @return {object}
         */
        join(channel: string): IEchoPresenceChannel;

        /**
         * Leave the given channel.
         *
         * @param  {string} channel
         */
        leave(channel: string): void;

        /**
         * Get the Socket ID for the connection.
         *
         * @return {string}
         */
        socketId(): string;

        /**
         * Disconnect from the Echo server.
         *
         * @return void
         */
        disconnect(): void;
    }

}