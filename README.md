# Accessible Sub Menus

Make your dropdown menus accessible

## Features

- Best practices based on [eBay MIND Patterns Fake Menu](https://ebay.gitbooks.io/mindpatterns/content/navigation/fakemenu.html)
- Screen reader accessible
- Customizable behavior
- Small and lightweight (~2K minizipped)

## Before Javascript

```html
<!-- Regular markup before javascript -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a href="#" class="js-dt-flyout-expand">Expand to see more search engines</a>  
  <ul class="js-dt-flyout">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

## Use Javascript

Include in your HTML file:

```html
<script src="dt-flyout.min.js"></script>
```

Or, using ES6:

```javascript
const AccessibleSubmenu = require('dt-flyout');

const li = document.querySelector('li');
const expand = AccessibleSubmenu(li, options);
```

## After Javascript

```html
<!-- Markup after javascript has run -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a role="button" href="#" aria-expanded="false" class="js-dt-flyout-expand">Expand Menu</a>
  <ul id="js-dt-flyout-8j6kl" class="js-dt-flyout">
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

When the expandable menu should be open, the button will have get `aria-expanded="true"` attribute. Also, it's `aria-controls` attribute will be present. **You should use your own CSS to show the flyout.**

```html
<!-- Open menu state -->
<li>
  <a href="http://google.com">Top search engine</a>
  <a role="button" href="#" aria-expanded="false" aria-controls="sub-menu-8j6kl" class="js-dt-flyout-expand">Expand Menu</a>
  <ul id="js-dt-flyout-8j6kl" class="js-dt-flyout">
    <li><a href="http://msn.com">MSN</a></li>
    <li><a href="http://yahoo.com">Yahoo</a></li>
    <li><a href="http://bing.com">Bing</a></li>
  </ul>
</li>
```

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

## Options

All options are optional.

<table>
<thead>
<tr>
<th>Option</th>
<th style="text-align:center">Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<th>buttonSelector</th>
<td style="text-align:center"><code>.js-dt-expand</code></td>
<td>A css selector that matches the HTML element that should be used as the toggle button. If not found, an anchor with a role of <code>button</code> will be created and inserted before the flyout.</td>
</tr>
<tr>
<th>closeOnTabOut</th>
<td style="text-align:center">true</td>
<td>Tab key out of flyout will close flyout</td>
</tr>
<tr>
<th>flyoutSelector</th>
<td style="text-align:center"><code>.js-dt-flyout</code></td>
<td>A css selector that matches the HTML element that should be used as the flyout menu. If not found, the first <code>&lt;ul&gt;</code> element will be used.</td>
</tr>
<tr>
<th>focusFirstLink</th>
<td style="text-align:center">true</td>
<td>Whether or not to focus the first link when the flyout opens</td>
</tr>
<tr>
<th>onClose</th>
<td style="text-align:center">null</td>
<td>Function to run when the menu is closed. Will recieve the instance as first parameter.</td>
</tr>
<tr>
<th>onOpen</th>
<td style="text-align:center">null</td>
<td>Function to run when the menu is opened. Will recieve the instance as first parameter.</td>
</tr>
<tr>
<th>stylingClass</th>
<td style="text-align:center"><code>js-dt-flyout-open</code></td>
<td>The top level list item will get this class when the flyout is open (for extra styling).</td>
</tr>
</tbody>
</table>

**Using Options**

```javascript
const AccessibleSubmenu = require('dt-flyout');

const li = document.querySelector('li');
const options = {
  closeOnTabOut: false
};
const expand = AccessibleSubmenu(li, options);
```

**Methods**

<table>
<thead>
<tr>
<th>Method</th>
<th style="text-align:center">Arguments</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<th>open</th>
<td style="text-align:center">-</td>
<td>Call this method of programatically open the menu.</td>
</tr>
<tr>
<th>close</th>
<td style="text-align:center">-</td>
<td>Call this method of programatically close the menu.</td>
</tr>
<tr>
<th>destroy</th>
<td style="text-align:center">-</td>
<td>Stops the behavior</td>
</tr>
</tbody>
</table>

## Examples

To run the examples, run: `yarn run example` and then open [localhost:9000](http://localhost:9000/) in your browser.
