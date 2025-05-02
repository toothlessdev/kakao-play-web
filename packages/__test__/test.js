/**
 * @param {String} description
 * @param {Function} callback
 */
export function test(description, callback) {
    try {
        callback();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.log(`❌ ${description}`);
        console.log(error);
    }
}

export function expect(received) {
    return {
        /** 원시값 테스트 */
        toBe: (expected) => {
            if (received !== expected) {
                throw new Error(`Expected ${received} to be ${expected}`);
            }
        },
        /** 객체값 테스트 */
        toEqual: (expected) => {
            const _received = JSON.stringify(received);
            const _expected = JSON.stringify(expected);
            if (_received !== _expected) {
                throw new Error(`Expected ${_received} to equal ${_expected}`);
            }
        },
    };
}
