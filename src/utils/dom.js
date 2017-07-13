// dom related utility functions

/* eslint-disable */

/**
 * Given a DOM node and CSS selector, this function looks up the tree until it
 * finds another DOM node that matches the provided CSS selector.
 *
 * Modified polyfill for Element.closest found on MDN
 * https://goo.gl/8VF5W1
 *
 * @param {String} CSS selector
 * @param {HTMLElement} el Element to search relative from
 */
export function closest(selector, el) {
  let matches = document.querySelectorAll(selector),
    i;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {};
  } while ((i < 0) && (el = el.parentElement));
  return el;
}