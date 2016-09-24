/*
 * UiContextMenu: Class to create the context menu for interaction with users.
 * 1.0
 *
 * By Max Ulyanov
 * Src: https://github.com/M-Ulyanov/UiContextMenu
 * Example https://m-ulyanov.github.io/UiContextMenu/
 */




;(() => {


	'use strict';


	const names = {
		events: {
			select: 'context-menu-select',
			show: 'context-menu-show',
			hide: 'context-menu-hide'
		},
		classes: {
			menu: 'container-ui-context-menu',
			item: 'b-ui-context-menu-item',
			name: 'ui-context-menu-item__name',
			'icon-parent': 'ui-context-menu-item__icon-parent',
			'icon-custom': 'ui-context-menu-item__icon-custom'
		}
	};

	const defaultOptions = {
		theme: 'blue',
		containerClass: ''
	};


	class UiContextMenu {


		/**
		 *
		 * @param structure
		 * @param options
		 */
		constructor(structure, options) {
			this.menuDOM = null;
			this.options = Object.assign({}, defaultOptions, options);
			this._isOpen = false;

			if(Array.isArray(structure) && structure.length > 0) {
				this._buildMenu(structure);
			}
		}



		/**
		 *
		 * @param event
		 */
		show(event) {

			if(this._isOpen) {
				this.hide();
			}

			let {left, top} = this._getPositionMenu(event);
			this.menuDOM.style.left = left + 'px';
			this.menuDOM.style.top = top + 'px';
			document.body.appendChild(this.menuDOM);

			this._isOpen = true;

			setTimeout(() => {
				this.menuDOM.classList.add('is-open');
				let event = this._factoryCustomEvent(names.events.show);
				this.menuDOM.dispatchEvent(event);
			}, 0);
		}



		/**
		 *
		 */
		hide() {

			if(!this._isOpen) {
				return;
			}

			let event = this._factoryCustomEvent(names.events.hide);
			this.menuDOM.dispatchEvent(event);
			this.menuDOM.parentNode.removeChild(this.menuDOM);
			this.menuDOM.classList.remove('is-open');

			this._isOpen = false;

		};



		/**
		 *
		 * @param structure
		 */
		updateStructure(structure) {
			if(Array.isArray(structure) && structure.length > 0) {
				this._buildMenu(structure);
			}
		}



		/**
		 *
		 * @returns {boolean}
		 */
		getIsOpen() {
			return this._isOpen;
		}



		/**
		 *
		 * @param structure
		 * @private
		 */
		_buildMenu (structure) {
			let menuDOM = document.createElement('div');
			menuDOM.classList.add(names.classes.menu);
			menuDOM.className = `${names.classes.menu} ${this.options.containerClass}`;

			itar.call(this, structure, menuDOM);

			function itar(structure, parent) {

				structure.forEach((item) => {
					let {name, title, attrs, icon, disabled, separator, child} = item;
					if(!name) {
						return;
					}


					// ITEM
					let menuItemDOM = document.createElement('div');
					menuItemDOM.className = `${names.classes.item} ui-context-menu-theme-${this.options.theme.toLowerCase()}`;


					// ATTRS
					if(attrs) {
						for(let key in attrs) {
							if(attrs.hasOwnProperty(key)) {
								menuItemDOM.setAttribute(key, attrs[key]);
							}
						}
					}


					// ICON
					if(icon) {
						menuItemDOM.classList.add('has-icon');
						let menuItemIconDOM = document.createElement('i');
						menuItemIconDOM.className = `icon ${names.classes['icon-custom']} ${icon}`;
						menuItemDOM.appendChild(menuItemIconDOM);

					}


					// NAME
					let menuItemNameDOM = document.createElement('div');
					menuItemNameDOM.classList.add(names.classes.name);
					menuItemNameDOM.innerHTML = name;
					menuItemDOM.appendChild(menuItemNameDOM);


					// DISABLED
					if(disabled) {
						menuItemDOM.classList.add('is-disabled');
					}


					// SEPARATOR
					if(separator) {
						menuItemDOM.classList.add('has-separator');
					}


					// HAS CHILD
					if(child && child.length > 0) {
						let menuItemSubDOM = document.createElement('div');
						menuItemSubDOM.className = `${names.classes.menu} is-submenu`;
						menuItemDOM.classList.add('is-parent');


						menuItemDOM.addEventListener('mouseenter', () => {
							let {left} = this._getPositionSubMenu(menuItemDOM);
							menuItemSubDOM.style.left = left + '%';
							menuItemSubDOM.classList.add('is-open');
						});

						menuItemDOM.addEventListener('mouseleave', () => {
							menuItemSubDOM.classList.remove('is-open');
						});

						menuItemSubDOM.addEventListener('mouseleave', () => {
							menuItemSubDOM.classList.remove('is-open');
						});


						let menuItemParentIconDOM = document.createElement('i');
						menuItemParentIconDOM.className = `icon ${names.classes['icon-parent']} angle right`;
						menuItemDOM.appendChild(menuItemParentIconDOM);

						itar.call(this, child, menuItemSubDOM, true);
						menuItemDOM.appendChild(menuItemSubDOM);
					}


					parent.appendChild(menuItemDOM);

				});

			}

			this.menuDOM = menuDOM;
			this._setEvents();
		}



		/**
		 *
		 * @param eventName
		 * @param detail
		 * @returns {CustomEvent}
		 * @private
		 */
		_factoryCustomEvent(eventName, detail = {}) {
			return new CustomEvent(eventName, {
				bubbles: true,
				cancelable: true,
				detail: detail
			});
		}



		/**
		 *
		 * @private
		 */
		_setEvents() {
			this.menuDOM.addEventListener('click', (event) => {
				event.preventDefault();

				let target = event.target;
				let parent = target.closest(`.${names.classes.item}`);
				if(parent) {
					let ev = this._factoryCustomEvent(names.events.select, {
						element: parent
					});
					target.dispatchEvent(ev);
				}
			});

			window.addEventListener('resize', () => {
				this.hide();
			});

		}



		/**
		 *
		 * @param event
		 * @returns {{left: number, top: number}}
		 * @private
		 */
		_getPositionMenu(event) {
			let shadowMenu = this.menuDOM.cloneNode(true);
			document.body.appendChild(shadowMenu);
			shadowMenu.style.display = 'block';

			let width = shadowMenu.offsetWidth;
			let height = shadowMenu.offsetHeight;
			shadowMenu.parentNode.removeChild(shadowMenu);

			let left = event.pageX + 1;
			let top = event.pageY + 1;
			let pageWidth = document.body.scrollWidth;
			let pageHeight = document.body.scrollHeight;

			if((left + width) > pageWidth) {
				left = pageWidth - width;
			}

			if((top + height) > pageHeight) {
				top = pageHeight - height;
			}

			return {
				left,
				top
			}
		}



		/**
		 *
		 * @param menu
		 * @returns {{left: number}}
		 * @private
		 */
		_getPositionSubMenu(menu) {
			let coords = menu.getBoundingClientRect();
			let left = (coords.left + document.body.scrollLeft + (menu.offsetWidth * 2)) > document.body.offsetWidth ? -100 : 100;
			return {
				left
			}
		}



	}


	window['UiContextMenu'] = UiContextMenu;


})();



