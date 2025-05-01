import { RequestHandler } from "./RequestHandler.js";

export class BaseApiService {
    static apiServiceInstance = null;
    static baseUrl = "";
    static baseOptions = {};

    #requestHandler = null;

    /**
     * @param {String} baseUrl
     * @param {RequestInit} baseOptions
     * @param {import("./RequestHandler.js").RequestHandler} requestHandler
     */
    constructor(baseUrl, baseOptions, requestHandler = new RequestHandler()) {
        if (BaseApiService.apiServiceInstance) return BaseApiService.apiServiceInstance;

        this.#requestHandler = requestHandler;
        BaseApiService.baseUrl = baseUrl;
        BaseApiService.baseOptions = baseOptions;
        BaseApiService.apiServiceInstance = this;
    }

    /**
     * @param {String} endPoint
     * @param {RequestInit} options
     * @returns {Promise<Response>}
     */
    async #request(endPoint = "", options = {}) {
        const url = BaseApiService.baseUrl + endPoint;
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
            ...BaseApiService.baseOptions,
            ...options,
        };
        return this.#requestHandler.handleRequest(url, requestOptions);
    }

    /**
     * @param {String} endPoint
     * @param {RequestInit} options
     */
    async get(endPoint = "", options = {}) {
        return this.#request(endPoint, { method: "GET", ...options });
    }

    /**
     * @param {String} endPoint
     * @param {Record<string, any>} body
     * @param {RequestInit} options
     */
    async post(endPoint = "", body = {}, options = {}) {
        return this.#request(endPoint, {
            method: "POST",
            body: JSON.stringify(body),
            ...options,
        });
    }

    /**
     * @param {String} endPoint
     * @param {Record<string, any>} body
     * @param {RequestInit} options
     */
    async put(endPoint = "", body = {}, options = {}) {
        return this.#request(endPoint, {
            method: "PUT",
            body: JSON.stringify(body),
            ...options,
        });
    }

    /**
     * @param {String} endPoint
     * @param {RequestInit} options
     */
    async delete(endPoint = "", options = {}) {
        return this.#request(endPoint, {
            method: "DELETE",
            ...options,
        });
    }
}
