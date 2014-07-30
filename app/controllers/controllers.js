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
app.controller('TerritoriesController', function ($scope, $sce,  $location, $route, territoriesService) {
    $scope.territories = [];

    init();

    function init() {
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
app.controller('TerritoryController', function ($scope, $location, $route, $routeParams, territoriesService) {
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
    
    // ADDRESSES
    $scope.addAddress = function () {
        territoriesService.addAddress($scope.territory.id, $scope.newAddress.name, $scope.newAddress.address, $scope.newAddress.phone, $scope.newAddress.date, $scope.newAddress.notes);
        
        var findInsertedAddress = setInterval( function() {
            insertedAddress = territoriesService.insertedAddress();
            console.log(insertedAddress); 
            if(!insertedAddress.id) // loop
                loopAgain = 1;
            else {
                clearInterval(findInsertedAddress);
                console.log(insertedAddress);
                $scope.territory.addresses.push(insertedAddress);
		        $route.reload();
            }
        }, 100);
        
    };
    
    $scope.updateAddress = function (addressId,name,data) {
        console.log(addressId + ' name: ' + name + ' data: ' + data); 
        territoriesService.updateAddress(addressId,name,data);
    };
    
    $scope.deleteAddress = function (selectedAddressId) {
		$scope.selectedAddressId = selectedAddressId;
		$('#DeleteAddressModal').modal('show');
    };
    
    $scope.deleteAddressEntry = function (selectedAddressId) {
        territoriesService.deleteAddressEntry(selectedAddressId);
        for(key in $scope.territory.addresses) {
            if($scope.territory.addresses[key].id == selectedAddressId)
                $scope.territory.addresses.splice(key,1);
        }
        $('#DeleteAddressModal').modal('hide');
        $route.reload();
    };
    
    // DATES/NOTES
    $scope.addDate = function (addressSelected) {
		$scope.addressSelected = addressSelected;
		
        // ini datepicker
		$('#AddDateModal input.date').datepicker({
		    format: "mm-dd-yyyy",
    		autoclose: true,
			todayHighlight: true
		}).on('changeDate', function(e){
			if($(this).val() != '') $scope.newDate.date = $(this).val();
	    });
        var date = new Date();
 		$scope.newDate = {"date": date.getMonth()+1 + '-' + date.getDate() + '-' + date.getFullYear() };
        
        $('#AddDateModal').modal('show');
    };

	$scope.addDateEntry = function(addressSelectedID) {
		territoriesService.addDateEntry(addressSelectedID, $scope.newDate.date, $scope.newDate.notes);
        
        var findInsertedDate = setInterval( function() {
            insertedDate = territoriesService.insertedDate();
            console.log(insertedDate); 
            if(!insertedDate.id) // loop
                loopAgain = 1;
            else {
                clearInterval(findInsertedDate);
                console.log('insertedDate: ' +insertedDate);
                for(key in $scope.territory.addresses) {
                    if($scope.territory.addresses[key].id == insertedDate.address_id)
                        $scope.territory.addresses[key].dates.push(insertedDate);
                }
                $('#AddDateModal').modal('hide');
		        $route.reload();
            }
        }, 1000);
	};
    
    $scope.deleteDate = function (selectedDateId,selectedAddressId) {
 		$scope.selectedDateId = selectedDateId;
        $scope.selectedAddressId = selectedAddressId;
		$('#DeleteDateModal').modal('show');
    };

    $scope.deleteDateEntry = function (selectedDateId,selectedAddressId) {
        territoriesService.deleteDateEntry(selectedDateId);
        console.log("selectedDateId: "+selectedDateId+", selectedAddressId: "+ selectedAddressId);
        for(key in $scope.territory.addresses) {
            if($scope.territory.addresses[key].id == selectedAddressId)
               for(dateKey in $scope.territory.addresses[key].dates) {
                   if($scope.territory.addresses[key].dates[dateKey].id == selectedDateId)
                       $scope.territory.addresses[key].dates.splice(dateKey,1);
               }
        }
        $('#DeleteDateModal').modal('hide');
        $route.reload();
    };
    
});
