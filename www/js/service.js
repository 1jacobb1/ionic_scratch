starter
.factory('Feeds', ['$http', function($http){
	var fac = {};
	var feedsUrl = 'http://infinigag.k3min.eu/';

	fac.getFeeds = function(category, pagination, callback){
		var cat = typeof category === 'undefined' || category == '' ? 'hot' : category;
		var page = pagination === '' ? '' : '/'+pagination;
		var url = feedsUrl+cat+page;
		$http.get(url)
		.then(function(response){
			if(typeof callback === 'function') { callback(response); }
		})
		.catch(function(err){ console.log(err); });
	};

	fac.getFeedDetail = function(id, callback) {
		$http.get(feedsUrl+'gag/'+id)
		.then(function(response) {
			if(typeof callback === 'function') { callback(response); }
		})
		.catch(function(err) {
			console.warn('Error media link: '+res);
			console.log(err);
		});
	};

	fac.getFeedDetailComments = function(id, callback) {
		$http.get(feedsUrl+'comments/'+id+'?count=10')
		.then(function(res) {
			if(typeof callback === 'function') { callback(res); }
		})
		.catch(function(err) {
			console.warn('Error media link: '+res);
			console.log(err);
			return;
		});
	};

	fac.trustMediaLink = function(feeds, SCE) {
		for(var i=0; i<feeds.length; i++) {
			if(feeds[i].media) {
				feeds[i].media.mp4 = SCE.trustAsResourceUrl(feeds[i].media.mp4);
			}
		}
		return feeds;
	};

	return fac;

}]);
