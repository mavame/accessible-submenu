# Accessible Submenus

Make your dropdown menus accessible!

Screen reader accessible, customizable behavior, and small and lightweight footprint (~2K minizipped), and best practices based on eBay's [MIND Patterns Fake Menu](https://ebay.gitbooks.io/mindpatterns/content/navigation/fakemenu.html).

## Install
First install the module:
```bash
npm install accessible-submenu --save
```

## Using

The class can be used as follows:
`new AccessibleSubmenu(element, [options])`

It can be included as a standalone file. Find the files in `dist`.
```html
<script src="accessible-submenu.min.js"></script>
<!-- AccessibleSubmenu is now defined -->
```

Or, it can be included as a CommonJS or AMD module or ES2015 module:
```javascript
import AccessibleSubmenu from 'accessible-submenu';
```

Pass in the list item (or some root element) and options.

```javascript
const li = document.querySelector('li');
const expand = new AccessibleSubmenu(li, options);
```

## Behavior

### Before Javascript

```html
<!-- Regular markup before javascript -->
<li>
  <a href="http://google.com">Top search engine</a>
  <button class="js-submenu-expand">Expand to see more search engines</button>  
  <ul class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

### After Javascript

```html
<!-- Markup after javascript has run -->
<li>
  <a href="http://google.com">Top search engine</a>
  <button aria-expanded="false" class="js-submenu-expand">Expand to see more search engines</button>
  <ul id="js-submenu-8j6kl" class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

### Screen Readers & Accessibility

Screen readers will announce the button as a "toggle button" and read the text "Expand Menu".

Pressing ENTER or SPACEBAR on the button (or clicking on the button) will expand the submenu.

Hitting ESC while the submenu is open will close the submenu.

When the expandable menu should be open, the button will have get `aria-expanded="true"` attribute. Also, it's `aria-controls` attribute will be present.

```html
<!-- Open menu state -->
<li>
  <a href="http://google.com">Top search engine</a>
  <button aria-expanded="true" aria-controls="js-submenu-8j6kl" class="js-submenu-expand">Expand to see more search engines</button>
  <ul id="js-submenu-8j6kl" class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

**You should use your own CSS to show the submenu.**

```css
/* closed submenu */
li > ul {
  display: none;
}

/* expanded submenu */
[aria-expanded="true"] + ul {
  display: block;
}
```

Of course you can use whatever CSS you like.

## Options

```javascript
new AccessibleSubmenu(element, {
  // the css selector for the button
  buttonSelector: '.js-submenu-expand',

  // the submenu menu
  submenuSelector: '.js-submenu',

  // apply this class to the el when submenu is open
  stylingClass: 'js-submenu-expanded',

  // apple aria-current="page" to links that point to the current page
  applyAriaCurrent: true,

  // whether or not to close on tab out
  closeOnTabOut: true,

  // focus the first link when submenu opens
  focusFirstLink: true,

  // onClose callback
  onClose: null,

  // onOpen callback
  onOpen: null,
});
```

### `submenuSelector`
`string`, defaults to `.js-submenu`

Specify the CSS selector of the element you will use as the submenu (must be nested inside the root element)

### `buttonSelector`
`string`, defaults to `.js-submenu-expand`

Specify the CSS selector for the "button" that you will use to toggle the submenu display (must be nested inside the root element)

### `closeOnTabOut`
`boolean`, defaults to `true`

Specify whether or not the TAB key press should close the submenu if the submenu loses focus.

### `focusFirstLink`
`boolean`, defaults to `true`

Whether or not to focus the first link when the submenu opens

### `onOpen`
`function`, defaults to `null`

Function to run when the menu is opened. Will receive the instance as first argument.

### `onClose`
`function`, defaults to `null`

Function to run when the menu is opened. Will receive the instance as first argument.

### `stylingClass`

The top level list item will get this class when the submenu is open (for extra styling)

## Methods

### `AccessibleSubmenu.open()`

This method can be used to programmatically open the menu.

### `AccessibleSubmenu.close()`

This method can be used to programmatically close the menu.`

## Examples

To run the examples, run: `yarn run example` and then open [localhost:9000](http://localhost:9000/) in your browser.
