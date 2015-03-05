(function ($) {

	$.fn.swipeTable = function (method) {
		// plugin's default options
		var defaults = {
			width:          '100%',
			height:         '100%'
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
			console.log('initializing')

			var fixedTable = table.clone(),
				wrapper = $('<div class="swipetable-wrapper" />'),
				inner = $('<div class="swipetable-inner" />');

			table.addClass('is-initialized');
			fixedTable.addClass('is-fixed is-initialized');
			table.wrap(inner);
			table.closest('.swipetable-inner').wrap(wrapper);

			// Check width of first column
			var fixedColumnWidth = table.find('thead th:first').width();
			table.find('thead th:first').addClass('is-hidden').width(fixedColumnWidth)
			table.find('tbody tr').each(function() {
				$(this).find('td:first-of-type').addClass('is-hidden').width(fixedColumnWidth);
			});

			// remove everyting but the first column of each row
			fixedTable.find('thead th:not(:first)').remove();
			fixedTable.find('tbody tr').each(function() {
				$(this).find('td:not(:first)').remove();
			});

			fixedTable.find('td, th').addClass('swipetable-persistant-column')

			fixedTable.css({
				position: 'absolute',
				top: 0,
				left: 0,
				'z-index': 10,
				width: fixedColumnWidth
			});

			console.log(fixedTable)

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