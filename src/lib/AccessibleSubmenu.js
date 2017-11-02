// expandableMenus.js
import randomID from 'random-id';
import extend from '../utils/extend';
import { closest } from '../utils/dom';

// keyboard keyCodes
const keys = { tab: 9, enter: 13, esc: 27, space: 32 };

/**
 * Controls Expandable Menus
 *
 * MIND Patterns defines these as "Fake Menus" and we follow the rules here
 * @see https://goo.gl/PU5oiP
 */
class AccessibleSubmenu {
  /**
   * Constructor
   *
   * @param {HTMLLIElement} el The element containing the button and submenu
   */
  constructor(el, opts) {
    const defaults = {
      // the css seelctor for the button
      buttonSelector: '.js-submenu-expand',

      // the submenu menu
      submenuSelector: '.js-submenu',

      // this class will be applied to the root element when submenu is open
      stylingClass: 'js-submenu-expanded',

      // apple aria-current="page" to links that point to the current page
      applyAriaCurrent:	true,

      // whether or not to close on tab out
      closeOnTabOut: true,

      // focus the first link when submenu opens
      focusFirstLink: true,

      // onClose callback
      onClose: null,

      // onOpen callback
      onOpen: null,
    };

    // merge options
    this.options = extend(defaults, opts, true);

    this.dom = {
      el,
      button: el.querySelector(this.options.buttonSelector),
      submenu: el.querySelector(this.options.submenuSelector),
    };

    // make sure we have everything we need
    if (el && this.dom.button && this.dom.submenu) {
      // build some extra dom stuff
      this.build();

      // bind events
      this.bindEvents();
    }
  }

  /**
   * Handles linking the button and submenu with ID and aria attribute
   */
  build() {
    // If you require a fake menu that is opened by hovering on a link, rather
    // than clicking on a button, then append a stealth button immediately after
    // the anchor tag. This button will appear, and receive focus, as soon as the
    // user tabs past the hyperlink.
    // connect the button to the submenu
    // to the sub menu with the aria attributes and IDs
    // create unique ID
    this.id = this.dom.submenu.id || this.generateUniqueID();
    if (!this.dom.button.getAttribute('aria-expanded')) {
      this.dom.button.setAttribute('aria-expanded', false);
    }
    if (!this.dom.submenu.id) {
      this.dom.submenu.id = this.id;
    }
    this.dom.submenu.role = 'navigation';
  }

  /**
   * Clicking and hitting keys on the keyboard are handled here :)
   */
  bindEvents() {
    // Click / ENTER on button will open submenu
    this.dom.button.addEventListener('click', this.handleExpandClick.bind(this));

    // SPACEBAR on button will open submenu
    this.dom.button.addEventListener('keyup', (event) => {
      if (event.keyCode === keys.space) {
        this.toggleOpenClose();
      }
    });

    // ESC will close the submenu and return focus to the button.
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === keys.esc) {
        if (this.isExpanded()) {
          this.close();
          this.dom.button.focus();
        }
      }
    });
  }

  /**
   * Blur event handler
   * Tabbing out of the list should close the list.
   */
  handleBlur(event) {
    if (event.keyCode === keys.tab) {
      if (closest(`${this.options.submenuSelector}`, document.activeElement) !== this.dom.submenu) {
        this.close();
      }
    }
  }

  /**
   * This function should be the event handler for a click on the .js-expand element.
   * It will toggle the display of the sub menu.
   */
  handleExpandClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleOpenClose();
  }

  /**
   * Toggles the open / closed state. Useful for a switch.
   */
  toggleOpenClose() {
    if (this.isExpanded()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.dom.button.setAttribute('aria-expanded', true);
    // The aria-controls attribute should only be present when aria-expanded state is true.
    this.dom.button.setAttribute('aria-controls', this.id);
    // focus first available link element
    if (this.options.focusFirstLink) {
      const firstLink = this.dom.submenu.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    }

    // Add styling class when opened
    this.dom.el.classList.add(this.options.stylingClass);

    // TABBING out of submenu will close submenu.
    if (this.options.closeOnTabOut) {
      document.addEventListener('keyup', this.handleBlur.bind(this));
    }

    // callback if provided
    if (typeof this.options.onOpen === 'function') {
      this.options.onOpen(this);
    }
  }

  close() {
    this.dom.button.setAttribute('aria-expanded', false);
    this.dom.button.removeAttribute('aria-controls');
    this.dom.el.classList.remove(this.options.stylingClass);

    if (this.options.closeOnTabOut) {
      document.removeEventListener('keyup', this.handleBlur.bind(this));
    }

    // callback if provided
    if (typeof this.options.onClose === 'function') {
      this.options.onClose(this);
    }
  }

  /**
   * Generate unique menu id (not already used on page)
   */
  generateUniqueID() {
    let id = `js-submenu-${randomID(6, 0)}`;
    if (document.getElementById(id)) {
      id = this.generateUniqueID();
    }
    return id;
  }

  /**
   * Check the expanded status
   */
  isExpanded() {
    return this.dom.button.getAttribute('aria-expanded') === 'true';
  }

  // @todo fill out
  destroy() {
    // unbind all event handlers
    // remove any added functionality?
  }
}

export default AccessibleSubmenu;
