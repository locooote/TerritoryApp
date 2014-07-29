app.service('publishersService', function ($http) {

	var publishers = [];

	jQuery.ajaxSetup({
		url: site_url + "server-api/index.php",
		global: false,
		cache: false,
		async: false,
		dataType: "json",
		type: "POST"
	});

	this.retrievePublishers = function() {
		var data = {
			module: 'publishers',
			column: '*',
			view: 1
		};

        $http({
            method: 'POST',
            url: site_url + "server-api/index.php",
            data: $.param(data),
            dataType: "json",
            cache: false,
            async: false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(this.setPublishers);

 	};

    this.setPublishers = function(newlist) {
        window.publishers = newlist;
    };

    this.getPublishers = function ($route) {
		if(window.publishers) publishers = window.publishers;
        else // Wait 1 sec...
        setTimeout(function() {
            if(window.publishers) publishers = window.publishers;
            // console.log(window.publishers);
            $route.reload();
        }, 100);
        return publishers;
     };

    this.insertPublisher = function (firstName, lastName) {
        var data = {
            module: 'publishers',
			column: 'firstName, lastName',
			add: 1,
            firstName: firstName,
            lastName: lastName
        };

		jQuery.ajax({
			data: data
		});

    };

    this.deletePublisher = function (id) {
        for (var i = publishers.length - 1; i >= 0; i--) {
            if (publishers[i].id === id) {
                publishers.splice(i, 1);
                break;
            }
        }
    };

    this.getPublisher = function (id) {
        for (var i = 0; i < publishers.length; i++) {
            if (publishers[i].id == id) {
                return publishers[i];
            }
        }
        return null;
    };

	this.assignTerritory = function(id, date, terrNumber, publisherId, assignedTerritories) {
		console.log('assignTerritory');
		var assignedAlready = false;
		if(! assignedTerritories) assignedTerritories = {};
		for (var i = 0; i < assignedTerritories.length; i++) {
            if (assignedTerritories[i].id == id) {
 				assignedAlready = true;
            }
        }
		if(! assignedAlready)
			assignedTerritories.push({
				id: id,
				terrNumber: terrNumber,
				date: date
			});
		this.updatePublisherTerritory(publisherId, assignedTerritories);
	}

	this.unassignTerritory = function(id, publisherId, assignedTerritories) {

		for (var i = 0; i < assignedTerritories.length; i++) {
            if (assignedTerritories[i].id == id) {
 				assignedTerritories.splice(i, 1);
            }
        }
		// console.log(assignedTerritories);
		this.updatePublisherTerritory(publisherId, assignedTerritories);

	}

	this.updatePublisherTerritory = function(publisherId, assignedTerritories) {
		var data = {
            module: 'publishers',
			column: 'territories',
			edit: 1,
            id: publisherId,
            territories: angular.toJson(assignedTerritories).replace(/[\[\]']+/g,'')
        };
		jQuery.ajax({ data: data });
	}

	this.updatePublisher = function(publisherId, firstName, lastName) {
		var data = {
            module: 'publishers',
			column: 'firstName, lastName',
			edit: 1,
            id: publisherId,
			firstName: firstName,
			lastName: lastName
        };
		jQuery.ajax({ data: data });
	}

});
