# Accessible Submenus

Make your dropdown menus accessible!

Screen reader accessible, customizable behavior, and small and lightweight footprint (~2K minizipped), and best practices based on eBay's [MIND Patterns Fake Menu](https://ebay.gitbooks.io/mindpatterns/content/navigation/fakemenu.html).

## Before Javascript

```html
<!-- Regular markup before javascript -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a href="#" class="js-submenu-expand">Expand to see more search engines</a>  
  <ul class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

## After Javascript

```html
<!-- Markup after javascript has run -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a role="button" href="#" aria-expanded="false" class="js-submenu-expand">Expand Menu</a>
  <ul id="js-submenu-8j6kl" class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

## Behavior

Screen readers will announce the button as a "toggle button" and read the text "Expand Menu".

Pressing ENTER or SPACEBAR on the button (or clicking on the button) will expand the flyout.

Hitting ESC while the flyout is open will close the flyout.

When the expandable menu should be open, the button will have get `aria-expanded="true"` attribute. Also, it's `aria-controls` attribute will be present.

```html
<!-- Open menu state -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a role="button" href="#" aria-expanded="false" aria-controls="sub-menu-8j6kl" class="js-submenu-expand">Expand Menu</a>
  <ul id="js-submenu-8j6kl" class="js-submenu">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

**You should use your own CSS to show the flyout.**

```css
/* closed flyout */
li > ul {
  display: none;
}

/* expanded flyout */
[aria-expanded="true"] + ul {
  display: block;
}
```

Of course you can use whatever CSS you like.

## Usage
`AccessibleSubmenu(element, [options])`

Pass in the list item (or some root element) and options.

### Including

```javascript
const AccessibleSubmenu = require('accessible-submenu');

const li = document.querySelector('li');
const expand = AccessibleSubmenu(li, options);
```

### Standalone

It can also be used as a standalone javascript file. Find the files in `dist`.

```html
<script src="accessible-submenu.min.js"></script>
<!-- window.AccessibleSubmenu is now defined -->
```

### Options

```javascript
AccessibleSubmenu(element, {
  // the css seelctor for the button
  buttonSelector: '.js-submenu-expand',

  // the submenu menu
  submenuSelector: '.js-submenu',

  // apply this class to the el when submenu is open
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

Whether or not to focus the first link when the flyout opens

### `onOpen`
`function`, defaults to `null`

Function to run when the menu is opened. Will recieve the instance as first argument.

### `onClose`
`function`, defaults to `null`

Function to run when the menu is opened. Will recieve the instance as first argument.

### `stylingClass`

The top level list item will get this class when the flyout is open (for extra styling)

## Methods

### `AccessibleSubmenu.open()`

This method can be used to programatically open the menu.

### `AccessibleSubmenu.close()`

This method can be used to programatically close the menu.`

## Examples

To run the examples, run: `yarn run example` and then open [localhost:9000](http://localhost:9000/) in your browser.
