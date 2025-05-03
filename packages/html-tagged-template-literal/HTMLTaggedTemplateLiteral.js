export function html(htmlStrings, ...values) {
    const template = document.createElement("template");

    const rawHTML = htmlStrings.reduce((acc, str, i) => {
        const value = values[i] ?? "";

        /**
         * @todo
         * 여기서 value instanceof Node || value instanceof HTMLFragment 인경우
         * 예를들어, html`${arr.map((item) => html`<div>${item}</div>`)}`
         * 이런 경우에 대해서도 처리해줘야하는데 어떻게 해야할지 모르겠음
         *
         * 우선은 재귀적으로 안들어온다고 가정하고 처리함
         */
        if (value instanceof Array) return acc + str + value.join("");

        return acc + str + value;
    }, "");

    template.innerHTML = rawHTML;
    return template.content.cloneNode(true);
}
