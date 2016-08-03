'use strict';
starter.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider){

		$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'view/login.html',
			controller: 'LoginCtrl'
		})
		.state('feeds', {
			url: '/feeds',
			templateUrl: 'view/feeds.html',
			controller: 'FeedsCtrl'
		})

		.state('feeds-detail', {
			url: '/feed/:feedId',
			templateUrl: 'view/feed-detail.html',
			controller: 'FeedsDetailCtrl'
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');
}]);
