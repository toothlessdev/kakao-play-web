export class State {
    constructor(initialState = {}, onChange = () => {}) {
        return new Proxy(initialState, {
            set(target, key, value) {
                if (target[key] !== value) {
                    target[key] = value;
                    onChange(key, value);
                }
                return true;
            },
            deleteProperty(target, key) {
                if (key in target) {
                    delete target[key];
                    onChange(key, undefined);
                }
                return true;
            },
        });
    }
}
