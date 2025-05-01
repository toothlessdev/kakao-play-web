export class BaseJsonStorageServiceException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BaseJsonStorageServiceKeyAlreadyExistsException extends BaseJsonStorageServiceException {
    constructor(storageKey) {
        super(`이미 존재하는 storageKey: ${storageKey}`);
        this.name = this.constructor.name;
    }
}

export class BaseJsonStorageServiceKeyNotFoundException extends BaseJsonStorageServiceException {
    constructor(storageKey) {
        super(`존재하지 않는 storageKey: ${storageKey}`);
        this.name = this.constructor.name;
    }
}

export class BaseJsonStorageDataNotSerializableException extends BaseJsonStorageServiceException {
    constructor() {
        super("JSON.stringify() 를 통해 직렬화할 수 없는 데이터입니다");
        this.name = this.constructor.name;
    }
}

export class BaseJsonStorageDataNotDeserializableException extends BaseJsonStorageServiceException {
    constructor() {
        super("JSON.parse() 를 통해 역직렬화할 수 없는 데이터입니다");
        this.name = this.constructor.name;
    }
}
