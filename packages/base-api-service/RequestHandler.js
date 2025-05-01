export class RequestHandler {
    /**
     * @param {String} url
     * @param {RequestInit} options
     */
    async handleRequest(url, options = {}) {
        const response = await fetch(url, options);
        return response;
    }
}
