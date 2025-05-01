import { BaseJsonStorageDataNotDeserializableException, BaseJsonStorageServiceKeyAlreadyExistsException, BaseJsonStorageServiceKeyNotFoundException } from "./BaseJsonStorageServiceExceptions.js";

export class BaseJsonStorageService {
    static #storageKeySet = new Set();
    static #isExistingStorageKey(storageKey) {
        if (BaseJsonStorageService.#storageKeySet.has(storageKey)) return true;
        return false;
    }

    #storageKey = null;
    #localStorage = null;

    /**
     * storageKey가 이미 존재하는 경우 예외 발생
     * @param {String} storageKey
     */
    constructor(storageKey, localStorage = window.localStorage) {
        if (BaseJsonStorageService.#isExistingStorageKey(storageKey)) {
            throw new BaseJsonStorageServiceKeyAlreadyExistsException(storageKey);
        }
        BaseJsonStorageService.#storageKeySet.add(storageKey);

        this.#localStorage = localStorage;
        this.#storageKey = storageKey;
    }

    #serializeData(serializableData) {
        try {
            return JSON.stringify(serializableData);
        } catch {
            throw new BaseJsonStorageDataNotDeserializableException();
        }
    }

    #deserializeData(serializedData) {
        try {
            return JSON.parse(serializedData);
        } catch {
            throw new BaseJsonStorageDataNotDeserializableException();
        }
    }

    /**
     * @param {Object} data
     */
    setData(data) {
        const serializedData = this.#serializeData(data);
        this.#localStorage.setItem(this.#storageKey, serializedData);
    }

    /**
     * @returns {Object}
     */
    getData() {
        const serializedData = this.#localStorage.getItem(this.#storageKey);
        if (serializedData === null) return null;
        return this.#deserializeData(serializedData);
    }

    clear() {
        this.#localStorage.removeItem(this.#storageKey);
        BaseJsonStorageService.#storageKeySet.delete(this.#storageKey);
    }
}
