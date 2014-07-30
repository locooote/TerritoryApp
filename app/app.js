var app = angular.module('territoryApp', ['ngRoute','xeditable']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/publishers',
            {
                controller: 'PublishersController',
                templateUrl: site_url + '/app/partials/publishers.html'
            })
        // publisher (:publisherID)
        .when('/publisher/:publisherID',
            {
                controller: 'PublisherController',
                templateUrl: site_url + '/app/partials/publisher.html'
            })
		// Territories
        .when('/territories',
            {
                controller: 'TerritoriesController',
                templateUrl: site_url + '/app/partials/territories.html'
            })
		// Territory with parameter (:territoryID)
        .when('/territory/:territoryID',
            {
                controller: 'TerritoryController',
                templateUrl: site_url + '/app/partials/territory.html'
            })
        .otherwise({ redirectTo: '/publishers' });
});




