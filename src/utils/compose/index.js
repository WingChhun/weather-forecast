/**
 * function compose
 *
 * read https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
 */
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);

export default compose;
