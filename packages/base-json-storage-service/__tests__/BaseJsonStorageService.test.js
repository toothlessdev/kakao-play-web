import { localStorageMock } from "../__mocks__/localStorage.mock.js";
import { BaseJsonStorageService } from "../BaseJsonStorageService.js";

export class JsonStorage extends BaseJsonStorageService {
    constructor() {
        super("test-storage", localStorageMock);
    }
}

// 초기 빈 객체 생성
const jsonStorage = new JsonStorage();
console.log(JSON.stringify(jsonStorage.getData()) == JSON.stringify(null));

// 1
const testData = {
    name: "test",
    age: 30,
};
jsonStorage.setData(testData);
console.log(JSON.stringify(testData) == JSON.stringify(jsonStorage.getData()));

// 2
const testData2 = {
    name: "test2",
    age: 31,
};
jsonStorage.setData(testData2);
console.log(JSON.stringify(testData2) == JSON.stringify(jsonStorage.getData()));

// 3
jsonStorage.clear();
console.log(jsonStorage.getData());
