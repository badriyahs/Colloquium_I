import { runtime } from '@observablehq/runtime';
import define from '@observablehq/notebook';

new runtime().module(define, name => {
    if (name === "chart") return new Inspector(document.querySelector("#chart"));
});