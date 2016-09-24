/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 20.09.16
 * Time: 14:39
 */

'use strict';

let menus = [];

let menu = new UiContextMenu([
	{
		name: 'Open',
	},
	{
		name: 'Open in new window',
		separator: true
	},
	{
		name: 'Cut',
	},
	{
		name: 'Copy',
	},
	{
		name: 'Paste',
		separator: true
	},
	{
		name: 'Delete',
	},
	{
		name: 'Rename',
	},
]);
menus.push(menu);


let init1 = document.querySelector('#context-menu-init-1');
init1.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu.show(event);
});


let init2 = document.querySelector('#context-menu-init-2');
init2.addEventListener('click', function(event) {
	event.preventDefault();
	hideMenus();
	menu.show(event);
});


let init3 = document.querySelector('#context-menu-init-3');
init3.addEventListener('click', function(event) {
	if(event.ctrlKey) {
		event.preventDefault();
		hideMenus();
		menu.show(event);
	}
});

let init4 = document.querySelector('#context-menu-init-4');
init4.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu.show(event);
});


let menuStructure = [
	{
		name: 'New',
		icon: 'file outline'
	},
	{
		name: 'Cut',
		icon: 'cut'
	},
	{
		name: 'Copy',
		icon: 'copy'
	},
	{
		name: 'Paste',
		icon: 'paste'
	},
	{
		name: 'Find..',
		icon: 'folder open outline'
	},
	{
		name: 'Delete',
		icon: 'remove'
	},
]
let menu2 = new UiContextMenu(menuStructure);
menus.push(menu2);

let init5 = document.querySelector('#context-menu-init-5');
init5.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu2.show(event);
});



let menu3 = new UiContextMenu([
	{
		name: 'New',
		icon: 'file outline',
		child: [
			{
				name: 'File',
				icon: 'file text outline',
				child: [
					{
						name: 'PHP',
					},
					{
						name: 'Javascript',
					},
					{
						name: 'HTML',
					},
					{
						name: 'CSS',
					}
				]
			},
			{
				name: 'Folder',
				icon: 'folder outline'
			},
			{
				name: 'Fork',
				icon: 'fork'
			},
			{
				name: 'Data Source',
				icon: 'database'
			}
		]
	},
	{
		name: 'Refactor',
		icon: 'edit',
		child: [
			{
				name: 'Rename',
			},
			{
				name: 'Move',
			},
			{
				name: 'Copy',
			}
		]
	},
	{
		name: 'Run',
		icon: 'play'
	},
	{
		name: 'History',
		icon: 'history'
	},
	{
		name: 'Delete',
		disabled: true,
		icon: 'remove'
	},
]);
menus.push(menu3);


let init6 = document.querySelector('#context-menu-init-6');
init6.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu3.show(event);
});


let menu4 = new UiContextMenu(menuStructure);
menus.push(menu4);
let init7 = document.querySelector('#context-menu-init-7');
init7.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu4.show(event);
});


let menu5 = new UiContextMenu(menuStructure, {theme: 'red'});
menus.push(menu5);
let init8 = document.querySelector('#context-menu-init-8');
init8.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu5.show(event);
});


let menu6 = new UiContextMenu(menuStructure, {theme: 'green'});
menus.push(menu6);
let init9 = document.querySelector('#context-menu-init-9');
init9.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu6.show(event);
});


let menu7 = new UiContextMenu(menuStructure, {theme: 'yellow'});
menus.push(menu7);
let init10 = document.querySelector('#context-menu-init-10');
init10.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu7.show(event);
});

let menu8 = new UiContextMenu(menuStructure, {theme: 'gray'});
menus.push(menu8);
let init11 = document.querySelector('#context-menu-init-11');
init11.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu8.show(event);
});



let menu9 = new UiContextMenu(menuStructure, {containerClass: 'js-events-support'});
menus.push(menu9);
let init12 = document.querySelector('#context-menu-init-12');
init12.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	hideMenus();
	menu9.show(event);
});

document.body.addEventListener('context-menu-select', function(event) {
	if(event.target.closest('.js-events-support')) {
		console.log(event)
		console.log('selected:' + event.detail.element.querySelector('.ui-context-menu-item__name').textContent);
	}
}, false);


document.body.addEventListener('context-menu-show', function(event) {
	if(event.target.classList.contains('js-events-support')) {
		console.log(event);
		console.log('SHOW');
	}
}, false);

document.body.addEventListener('context-menu-hide', function(event) {
	if(event.target.classList.contains('js-events-support')) {
		console.log(event);
		console.log('HIDE');
	}
}, false)




document.body.addEventListener('click', function(event) {
	if(!event.target.classList.contains('js-ignore-body-click')) {
		event.preventDefault();
		hideMenus();
	}
});


function hideMenus() {
	menus.forEach(function (menu) {
		menu.hide();
	});
}

