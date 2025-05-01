import { State } from "../State.js";

const state = new State({ count: 0 }, (key, value) => {
    console.log("rerendered : ", key, value);
});

(() => {
    const interval = setInterval(() => {
        state.count++;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
})();
