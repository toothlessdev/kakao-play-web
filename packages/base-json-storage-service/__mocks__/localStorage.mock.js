export const localStorageMock = {
    storage: {},

    setItem: function (key, value) {
        this.storage[key] = value;
    },
    getItem: function (key) {
        return this.storage[key] || null;
    },
    removeItem: function (key) {
        delete this.storage[key];
    },
    clear: function () {
        this.storage = {};
    },
};
