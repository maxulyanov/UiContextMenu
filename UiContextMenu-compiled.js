/*
 * UiContextMenu: Class to create the context menu for interaction with users.
 * 1.0
 *
 * By Max Ulyanov
 * Src: https://github.com/M-Ulyanov/UiContextMenu
 * Example https://m-ulyanov.github.io/UiContextMenu/
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

;(function () {

	'use strict';

	var names = {
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

	var defaultOptions = {
		theme: 'blue',
		containerClass: ''
	};

	var UiContextMenu = (function () {

		/**
   *
   * @param structure
   * @param options
   */

		function UiContextMenu(structure, options) {
			_classCallCheck(this, UiContextMenu);

			this.menuDOM = null;
			this.options = Object.assign({}, defaultOptions, options);
			this._isOpen = false;

			if (Array.isArray(structure) && structure.length > 0) {
				this._buildMenu(structure);
			}
		}

		/**
   *
   * @param event
   */

		_createClass(UiContextMenu, [{
			key: 'show',
			value: function show(event) {
				var _this = this;

				if (this._isOpen) {
					this.hide();
				}

				var _getPositionMenu2 = this._getPositionMenu(event);

				var left = _getPositionMenu2.left;
				var top = _getPositionMenu2.top;

				this.menuDOM.style.left = left + 'px';
				this.menuDOM.style.top = top + 'px';
				document.body.appendChild(this.menuDOM);

				this._isOpen = true;

				setTimeout(function () {
					_this.menuDOM.classList.add('is-open');
					var event = _this._factoryCustomEvent(names.events.show);
					_this.menuDOM.dispatchEvent(event);
				}, 0);
			}

			/**
    *
    */
		}, {
			key: 'hide',
			value: function hide() {

				if (!this._isOpen) {
					return;
				}

				var event = this._factoryCustomEvent(names.events.hide);
				this.menuDOM.dispatchEvent(event);
				this.menuDOM.parentNode.removeChild(this.menuDOM);
				this.menuDOM.classList.remove('is-open');

				this._isOpen = false;
			}
		}, {
			key: 'updateStructure',

			/**
    *
    * @param structure
    */
			value: function updateStructure(structure) {
				if (Array.isArray(structure) && structure.length > 0) {
					this._buildMenu(structure);
				}
			}

			/**
    *
    * @returns {boolean}
    */
		}, {
			key: 'getIsOpen',
			value: function getIsOpen() {
				return this._isOpen;
			}

			/**
    *
    * @param structure
    * @private
    */
		}, {
			key: '_buildMenu',
			value: function _buildMenu(structure) {
				var menuDOM = document.createElement('div');
				menuDOM.classList.add(names.classes.menu);
				menuDOM.className = names.classes.menu + ' ' + this.options.containerClass;

				itar.call(this, structure, menuDOM);

				function itar(structure, parent) {
					var _this2 = this;

					structure.forEach(function (item) {
						var name = item.name;
						var title = item.title;
						var attrs = item.attrs;
						var icon = item.icon;
						var disabled = item.disabled;
						var separator = item.separator;
						var child = item.child;

						if (!name) {
							return;
						}

						// ITEM
						var menuItemDOM = document.createElement('div');
						menuItemDOM.className = names.classes.item + ' ui-context-menu-theme-' + _this2.options.theme.toLowerCase();

						// ATTRS
						if (attrs) {
							for (var key in attrs) {
								if (attrs.hasOwnProperty(key)) {
									menuItemDOM.setAttribute(key, attrs[key]);
								}
							}
						}

						// ICON
						if (icon) {
							menuItemDOM.classList.add('has-icon');
							var menuItemIconDOM = document.createElement('i');
							menuItemIconDOM.className = 'icon ' + names.classes['icon-custom'] + ' ' + icon;
							menuItemDOM.appendChild(menuItemIconDOM);
						}

						// NAME
						var menuItemNameDOM = document.createElement('div');
						menuItemNameDOM.classList.add(names.classes.name);
						menuItemNameDOM.innerHTML = name;
						menuItemDOM.appendChild(menuItemNameDOM);

						// DISABLED
						if (disabled) {
							menuItemDOM.classList.add('is-disabled');
						}

						// SEPARATOR
						if (separator) {
							menuItemDOM.classList.add('has-separator');
						}

						// HAS CHILD
						if (child && child.length > 0) {
							(function () {
								var menuItemSubDOM = document.createElement('div');
								menuItemSubDOM.className = names.classes.menu + ' is-submenu';
								menuItemDOM.classList.add('is-parent');

								menuItemDOM.addEventListener('mouseenter', function () {
									var _getPositionSubMenu2 = _this2._getPositionSubMenu(menuItemDOM);

									var left = _getPositionSubMenu2.left;

									menuItemSubDOM.style.left = left + '%';
									menuItemSubDOM.classList.add('is-open');
								});

								menuItemDOM.addEventListener('mouseleave', function () {
									menuItemSubDOM.classList.remove('is-open');
								});

								menuItemSubDOM.addEventListener('mouseleave', function () {
									menuItemSubDOM.classList.remove('is-open');
								});

								var menuItemParentIconDOM = document.createElement('i');
								menuItemParentIconDOM.className = 'icon ' + names.classes['icon-parent'] + ' angle right';
								menuItemDOM.appendChild(menuItemParentIconDOM);

								itar.call(_this2, child, menuItemSubDOM, true);
								menuItemDOM.appendChild(menuItemSubDOM);
							})();
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
		}, {
			key: '_factoryCustomEvent',
			value: function _factoryCustomEvent(eventName) {
				var detail = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
		}, {
			key: '_setEvents',
			value: function _setEvents() {
				var _this3 = this;

				this.menuDOM.addEventListener('click', function (event) {
					event.preventDefault();

					var target = event.target;
					var parent = target.closest('.' + names.classes.item);
					if (parent) {
						var ev = _this3._factoryCustomEvent(names.events.select, {
							element: parent
						});
						target.dispatchEvent(ev);
					}
				});

				window.addEventListener('resize', function () {
					_this3.hide();
				});
			}

			/**
    *
    * @param event
    * @returns {{left: number, top: number}}
    * @private
    */
		}, {
			key: '_getPositionMenu',
			value: function _getPositionMenu(event) {
				var shadowMenu = this.menuDOM.cloneNode(true);
				document.body.appendChild(shadowMenu);
				shadowMenu.style.display = 'block';

				var width = shadowMenu.offsetWidth;
				var height = shadowMenu.offsetHeight;
				shadowMenu.parentNode.removeChild(shadowMenu);

				var left = event.pageX + 1;
				var top = event.pageY + 1;
				var pageWidth = document.body.scrollWidth;
				var pageHeight = document.body.scrollHeight;

				if (left + width > pageWidth) {
					left = pageWidth - width;
				}

				if (top + height > pageHeight) {
					top = pageHeight - height;
				}

				return {
					left: left,
					top: top
				};
			}

			/**
    *
    * @param menu
    * @returns {{left: number}}
    * @private
    */
		}, {
			key: '_getPositionSubMenu',
			value: function _getPositionSubMenu(menu) {
				var coords = menu.getBoundingClientRect();
				var left = coords.left + document.body.scrollLeft + menu.offsetWidth * 2 > document.body.offsetWidth ? -100 : 100;
				return {
					left: left
				};
			}
		}]);

		return UiContextMenu;
	})();

	window['UiContextMenu'] = UiContextMenu;
})();

//# sourceMappingURL=UiContextMenu-compiled.js.map