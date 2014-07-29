app.controller('PublishersController', function ($scope, $route, $routeParams, publishersService) {

    init();

    function init() {
		publishersService.retrievePublishers();
        $scope.publishers = publishersService.getPublishers($route);
		$scope.site_url = site_url;
    }

    $scope.insertPublisher = function () {
        var firstName = $scope.newPublisher.firstName;
        var lastName = $scope.newPublisher.lastName;
        publishersService.insertPublisher(firstName, lastName);
        $scope.newPublisher.firstName = '';
        $scope.newPublisher.lastName = '';
        $scope.newPublisher.city = '';
		$route.reload();
    };

    $scope.deletePublisher = function (id) {
        publishersService.deletePublisher(id);
    };
});


app.controller('PublisherController', function ($scope, $route, $routeParams, publishersService, territoriesService) {
    $scope.publisher = {};
   	$scope.territories = [];

    init();

    function init() {
        var publisherID = ($routeParams.publisherID) ? parseInt($routeParams.publisherID) : 0;
        if (publisherID > 0) {
            $scope.publisher = publishersService.getPublisher(publisherID);
        }

		territoriesService.retrieveTerritories(); // Get all territories
		$scope.territories = territoriesService.getTerritories();

 		var date = new Date();
 		$scope.newTerritory = {"date": date.getMonth()+1 + '-' + date.getDate() + '-' + date.getFullYear() }

		// ini datepicker
		$('.container input.date').datepicker({
		    format: "mm-dd-yyyy",
    		autoclose: true,
			todayHighlight: true
		}).on('changeDate', function(e){
			if($(this).val() != '') $scope.newTerritory.date = $(this).val();
	    });

		$scope.site_url = site_url;
    }

	$scope.updatePublisher = function () {
        publishersService.updatePublisher($scope.publisher.id, $scope.publisher.firstName, $scope.publisher.lastName);
		$route.reload();
    };

	$scope.assignTerritory = function () {
        publishersService.assignTerritory( $scope.newTerritory.terrSelected.id, $scope.newTerritory.date, $scope.newTerritory.terrSelected.terrNumber, $scope.publisher.id, $scope.publisher.territories);
        $scope.newTerritory.terrSelected = '';
        $scope.newTerritory.date = '';
		$route.reload();
    };

    $scope.unassignTerritory = function (terrSelected) {
		$scope.confirmUnassign = { terrSelected: terrSelected };
		$('#unassignTerr').modal('show');
    };

	$scope.unassignTerritoryConfirm = function(terrSelected) {
		publishersService.unassignTerritory(terrSelected,$scope.publisher.id, $scope.publisher.territories);
		$('#unassignTerr').modal('hide');
		$route.reload();
	};

});


app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});

app.controller('OrderChildController', function ($scope) {
    $scope.orderby = 'product';
    $scope.reverse = false;
    $scope.ordersTotal = 0.00;

    init();

    function init() {
        if ($scope.publisher && $scope.publisher.orders) {
            var total = 0.00;
            for (var i = 0; i < $scope.publisher.orders.length; i++) {
                var order = $scope.publisher.orders[i];
                total += order.orderTotal;
            }
            $scope.ordersTotal = total;
        }
    }

    $scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };

});


// TerritoriesController
app.controller('TerritoriesController', function ($scope, $route, territoriesService) {
    $scope.territories = [];

    init();

    function init() {
		// first, get latest from db
		territoriesService.retrieveTerritories();

		$scope.territories = territoriesService.getTerritories();
		$scope.site_url = site_url;
    }
    
    $scope.insertTerritory = function () {
        territoriesService.insertTerritory($scope.newTerritory.terrNumber, $scope.newTerritory.street, $scope.newTerritory.city);
        $scope.newTerritory.terrNumber = '';
        $scope.newTerritory.street = '';
        $scope.newTerritory.city = '';
		$route.reload();
    };
    
});


// TerritoriesController
app.controller('TerritoryController', function ($scope, $route, $routeParams, territoriesService) {
    $scope.territory = [];

    init();

    function init() {
		var territoryID = ($routeParams.territoryID) ? parseInt($routeParams.territoryID) : 0;
        if (territoryID > 0) {
            $scope.territory = territoriesService.getTerritory(territoryID);
        }
        
        var date = new Date();
 		$scope.newAddress = {"date": date.getMonth()+1 + '-' + date.getDate() + '-' + date.getFullYear() }
        
        // ini datepicker
		$('.container input.date').datepicker({
		    format: "mm-dd-yyyy",
    		autoclose: true,
			todayHighlight: true
		}).on('changeDate', function(e){
			if($(this).val() != '') $scope.newAddress.date = $(this).val();
	    });
		$scope.site_url = site_url;
    }
    
    $scope.updateTerritory = function () {
        territoriesService.updateTerritory($scope.territory.id, $scope.territory.terrNumber, $scope.territory.street, $scope.territory.city);
		$route.reload();
    };
    
    $scope.addAddress = function () {
        territoriesService.addAddress($scope.territory.id, $scope.newAddress.name, $scope.newAddress.address, $scope.newAddress.phone, $scope.newAddress.date, $scope.newAddress.notes);
        console.log($scope.newAddress);
        $scope.territory.addresses.push($scope.newAddress);
		$route.reload();
    };
    
    $scope.addDate = function (addressSelected) {
		$scope.newDateEntry = { addressSelected: addressSelected };
		$('#AddDateModal').modal('show');
    };

	$scope.addDateEntry = function(addressSelected) {
		publishersService.addDateEntry(addressSelected,$scope.publisher.id, $scope.publisher.territories);
		$('#AddDateModal').modal('hide');
		$route.reload();
	};
    
    $scope.addDateEntry = function(addressSelected) {
		publishersService.addDateEntry(addressSelected,$scope.publisher.id, $scope.publisher.territories);
		$('#AddDateModal').modal('hide');
		$route.reload();
	};
    
    $scope.updateAddress = function (addressId,name,data) {
        console.log(addressId + ' name: ' + name + ' data: ' + data); 
        territoriesService.updateAddress(addressId,name,data);
        // $route.reload();
    };
    
    $scope.deleteDate = function (selectedDateId) {
		$scope.selectedDateId = selectedDateId;
		$('#DeleteDateModal').modal('show');
    };
    
    $scope.deleteAddress = function (selectedAddressId) {
		$scope.selectedAddressId = selectedAddressId;
		$('#DeleteAddressModal').modal('show');
    };
    
});
