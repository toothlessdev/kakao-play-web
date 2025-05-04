import { BaseJsonStorageService } from "../base-json-storage-service/BaseJsonStorageService.js";
import { BaseGlobalState } from "./BaseGlobalState.js";

class BasePersistStorage extends BaseJsonStorageService {
    constructor(storageKey, localStorage) {
        super(`persist/${storageKey}`, localStorage);
    }
}

export class BasePersistGlobalState extends BaseGlobalState {
    /**
     * @param {String} storageKey
     * @param {window.localStorage} localStorage
     */
    constructor(storageKey, initialState, localStorage = window.localStorage) {
        const basePersistStorage = new BasePersistStorage(storageKey, localStorage);
        const persisted = basePersistStorage.getData();

        super(persisted || initialState);
        this.basePersistStorage = basePersistStorage;
    }

    onDispatch() {
        this.basePersistStorage.setData(this.state);
    }
}
