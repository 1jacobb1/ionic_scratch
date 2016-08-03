starter
// LoginController
.controller('LoginCtrl', ['$rootScope' , '$scope', '$state', function($rs, $s, $state) {
	$s.loginMessage = '';
	$s.login = function(user){
		console.log(user);
		if (typeof user === "undefined") {
			$s.loginMessage = 'Username and password are required';
		} else {
			if(user.username == "jacobb" && user.password == "admin123") {
				console.log('feeds');
				$state.go('feeds', {});
			} else {
				$s.loginMessage = 'Username or password is incorrect';
			}
		}
	};
}])
// FeedDetailController
.controller('FeedsDetailCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', 'Feeds', function($rs, $s, $st, $stP, $sce, Feeds) {
	$s.feedId = '';
	$s.comments = '';
	$s.headTitle = 'Feed';
	$s.feedId = $stP.feedId;
	Feeds.getFeedDetail($s.feedId, function(res) {
		$s.headTitle = res.data.caption;

		// if media is not false, trust the resource url to play video
		if(res.data.media) {
			res.data.media.mp4 = $sce.trustAsResourceUrl(res.data.media.mp4);
		}
		$s.feed = res.data;
	});

	Feeds.getFeedDetailComments($s.feedId, function(res) {
		var comments = res.data.data;
		$s.comments = res.data.data;
		// convert undecode html comment
		for(var i = 0; i<$s.comments.length; i++) {
			$s.comments[i].text = htmlDecode($s.comments[i].text);
		}
	});

	function htmlDecode(input){
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes[0].nodeValue;
	}

}])
// FeedsController
.controller('FeedsCtrl', ['$rootScope', '$scope', '$state', '$sce', 'Feeds',function($rs, $scope, $state, $sce, Feeds){

	$scope.feeds = [];
	$scope.hasNext = false;
	$scope.loadMore = function(){
		Feeds.getFeeds('',$scope.hasNext, function(res){
			$scope.hasNext = res.data.paging.next;
			if ($scope.hasNext !== null){
				$scope.$broadcast('scroll.infiniteScrollComplete');
				res.data.data = Feeds.trustMediaLink(res.data.data, $sce);
				$scope.feeds = $scope.feeds.concat(res.data.data);
			}
		});
	};

	$scope.doRefresh = function(){
		Feeds.getFeeds('','', function(res){
			$scope.newFeeds = res.data.data;
			$scope.feeds = Feeds.trustMediaLink($scope.newFeeds, $sce);
			$scope.$broadcast('scroll.refreshComplete');
		});
  };

}]);
