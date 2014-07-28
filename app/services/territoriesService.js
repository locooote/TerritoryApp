app.service('territoriesService', function () {

    var territories = [];

	$.ajaxSetup({
		url: site_url + "server-api/index.php",
		global: false,
		cache: false,
		async: false,
		dataType: "json",
		type: "POST"
	});

	this.retrieveTerritories = function() {

		// read from api
		var data = {
			module: 'territories',
			column: '*',
			join: 'addresses',
			view: 1
		};

 		jQuery.ajax({
			data: data,
			success: function(json) {
				// console.log(json);
				if( json ) {
					// console.log(json);
	 				window.territories = json;
				} else {
					console.log('No Success');
				}
			}

		}); // jQuery.ajax
	}

    this.getTerritories = function () {
		// update latest from db
		if(window.territories) territories = window.territories;
        return territories;
    };

    this.insertTerritory = function (firstName, lastName, city) {
        var topID = territories.length + 1;
        territories.push({
            id: topID,
            firstName: firstName,
            lastName: lastName,
            city: city
        });
    };

    this.deleteTerritory = function (id) {
        for (var i = territories.length - 1; i >= 0; i--) {
            if (territories[i].id === id) {
                territories.splice(i, 1);
                break;
            }
        }
    };

    this.getTerritory = function (id) {
        for (var i = 0; i < territories.length; i++) {
            if (territories[i].id == id) {
                return territories[i];
            }
        }
        return null;
    };

});
