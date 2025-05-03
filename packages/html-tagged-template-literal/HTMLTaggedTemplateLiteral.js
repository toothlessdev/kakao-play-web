export function html(htmlStrings, ...values) {
    const template = document.createElement("template");

    const rawHTML = htmlStrings.reduce((acc, str, i) => {
        const val = values[i] ?? "";
        return acc + str + val;
    }, "");

    template.innerHTML = rawHTML;
    return template.content.cloneNode(true);
}
