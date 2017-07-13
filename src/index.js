import isElement from './utils/isElement';
import AccessibleSubmenu from './lib/AccessibleSubmenu';

/**
 * Main export.
 */
module.exports = function(element, options) {
  // require argument
  if (!isElement(element)) {
    console.warn('accessible-submenu requires a valid HTMLElement.', element);
    return;
  }

  return new AccessibleSubmenu(element, options);
}