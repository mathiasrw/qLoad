// First code snippp version...
	
	(function($) {
		var	buffer = [];
		var cache = [];
		var history = [];
		var countLoading = 0;

		$.preLoadImages = function() {
			var args_len = arguments.length;
			for (var i = args_len; i--;) { 
				if(0<=$.inArray(arguments[i], history)){
					continue;
				}
				if(0<=$.inArray(arguments[i], buffer)){
					buffer.splice(buffer.indexOf(arguments[i]),1)	
				}
				buffer.push(arguments[i]);
			}
			jQuery.preLoadNextImage();
			jQuery.preLoadNextImage();
		}

		$.preLoadNextImage = function() {
			if(4<countLoading){
				return
			}
			countLoading++
			var cacheImage = $('<img/>').load(function(){
				history.push($(this).attr('src'));
				countLoading--;
				jQuery.preLoadNextImage();
			}).attr('src', buffer.pop());
			cache.push(cacheImage);
		}
	})(jQuery)