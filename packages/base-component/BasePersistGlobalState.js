import { BaseJsonStorageService } from "../base-json-storage-service/BaseJsonStorageService.js";
import { BaseGlobalState } from "./BaseGlobalState.js";

export class BasePersistGlobalState extends BaseGlobalState {
    /**
     * @param {String} storageKey
     * @param {window.localStorage} localStorage
     */
    constructor(storageKey, localStorage = window.localStorage) {
        const jsonStorageService = new BaseJsonStorageService(storageKey, localStorage);

        const persisted = jsonStorageService.getData();
        super(persisted || {});
        this.jsonStorageService = jsonStorageService;
    }

    onDispatch() {
        this.jsonStorageService.setData(this.state);
    }
}
