import { html } from "../HTMLTaggedTemplateLiteral.js";

let _string = "string";
let _number = 123;
let _boolean = true;
let _array = [1, 2, 3];

const template = html`
    <div>
        <h1>${_string}</h1>
        <p>${_number}</p>
        <p>${_boolean}</p>
        <p>${_array.join(", ")}</p>
    </div>
`;

console.log(template);
