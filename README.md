# UiContextMenu
Class to create the context menu for interaction with users

[![](http://m-ulyanov.github.io/UiContextMenu/UiContextMenu-promo.png)](https://github.com/M-Ulyanov/UiContextMenu)


##Getting started
2. Include UiContextMenu.js, UiContextMenu.css and icons folder
3. Create instance UiContextMenu with your structure and options
4. Call `instance.show()`
```javascript
let menu = new UiContextMenu([
	{
		name: 'Open',
	},
	{
		name: 'Cut',
	},
	{
		name: 'Copy',
	},
	{
		name: 'Paste',
	},
	{
		name: 'Delete',
	},
]);
menu.show();
```

##Syntax
`UiContextMenu(structure, [options])`
`structure` - array menu items<br>
`structure.item` - object item<br>
`structure.item.name` - string name<br>
`structure.item.icon` - string icon, full list of supported values - `http://semantic-ui.com/elements/icon.html`<br>
`structure.item.child` - array submenu items <br>
`structure.item.attrs` -  object any attrs for item<br>
`structure.item.disabled` - block item<br>
`options` - object<br>
`options.theme` - ready themes style. List: `blue`, `red`, `green`, `yellow`, `gray`; Default: `blue`<br>
`options.containerClass` - add your class to the main container


##Public API
`show` - show menu<br>
`hide` - hide menu<br>
`updateStructure` - update structure<br>
`getIsOpen` - get state menu<br>
Example: <br>
```javascript 
    let state = menu.getIsOpen();
```


##Events
`context-menu-select` - click item menu<br>
`context-menu-show` - show menu<br>
`context-menu-hide` - hide menu <br>
Example: <br>
```javascript 
document.body.addEventListener('context-menu-show', function(event) {
	console.log(event);
    console.log('SHOW');
}, false);
```

