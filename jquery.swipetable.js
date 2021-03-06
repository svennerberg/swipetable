(function ($) {

	$.fn.swipeTable = function (method) {
		// plugin's default options
		var defaults = {
			width: '100%',
			height: '100%',
			perisistentColumns: 2
		};

		var settings = {};

		var methods = {
			init: function (options) {
				settings = $.extend({}, defaults, options);

				// iterate through all the DOM elements we are attaching the plugin to
				return this.each(function () {

					var that = $(this);

					if (!that.hasClass('is-initialized')) {
						initTable(that);
					} else {
						refreshTable(that);
					}

				});
			},
			refresh: function() {
				console.log('Refreshing')
				refreshTable($(this));
			}
		};

		function initTable(table) {

			var wrapper = $('<div class="swipetable-wrapper" />'),
				inner = $('<div class="swipetable-inner" />');

			table.addClass('is-initialized');
			table.wrap(inner);
			table.closest('.swipetable-inner').wrap(wrapper);

			var fixedColumnWidth = 0;
			table.find('thead th:lt(' + settings.perisistentColumns + ')').each(function() {
				fixedColumnWidth += $(this).outerWidth();
			});

			table.find('th, td').each(function() {
				var td = $(this);
				td.height(td.height());
				td.width(td.width());
			});

			var fixedTable = table.clone();

			table.find('thead th:lt(' + settings.perisistentColumns + ')').addClass('is-hidden');

			table.find('tbody tr').each(function() {
				$(this).find('td:lt(' + settings.perisistentColumns + ')').addClass('is-hidden');
			});

			// remove everyting but the first column of each row
			var ths = fixedTable.find('thead th');
			ths.not(ths.slice(0,settings.perisistentColumns)).remove();

			fixedTable.find('tbody tr').each(function() {
				var tds = $(this).find('td');
				tds.not(tds.slice(0,settings.perisistentColumns)).remove();
			});

			fixedTable.find('td, th').addClass('swipetable-persistant-column')

			fixedTable.addClass('is-fixed is-initialized');
			fixedTable.css({
				position: 'absolute',
				top: 0,
				left: 0,
				'z-index': 10,
				width: fixedColumnWidth
			});

			table.closest('.swipetable-wrapper').append(fixedTable);
		}

		function refreshTable() {

		}


		// if a method as the given argument exists
		if (methods[method]) {

			// call the respective method
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

		// if an object is given as method OR nothing is given as argument
		} else if (typeof method === 'object' || !method) {

			// call the initialization method
			return methods.init.apply(this, arguments);

		} else {

			// trigger an error
			$.error('Method "' +  method + '" does not exist in swipeTable plugin!');

		}
	};

})(jQuery);