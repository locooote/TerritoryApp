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
    
    this.getTerritory = function (id) {
        for (var i = 0; i < territories.length; i++) {
            if (territories[i].id == id) {
                return territories[i];
            }
        }
        return null;
    };

    this.insertTerritory = function (terrNumber, street, city) {
        var data = {
            module: 'territories',
			column: 'terrNumber, street, city',
			add: 1,
            terrNumber: terrNumber,
            street: street,
            city: city
        };
        jQuery.ajax({ data: data });
    };
    
    this.updateTerritory = function(TerritoryId, terrNumber, street, city) {
		var data = {
            module: 'territories',
			column: 'terrNumber, street, city',
			edit: 1,
            id: TerritoryId,
			terrNumber: terrNumber,
			street: street,
            city: city
        };
		jQuery.ajax({ data: data });
	}
    
    this.addAddress = function (TerritoryId, name, address, phone, date, notes) {
        var data = {
            module: 'addresses',
			column: 'name, address, phone, territory_id',
			add: 1,
            territory_id : TerritoryId,
            name: name,
            address: address,
            phone: phone,
            date: date,
            notes: notes
        };
        jQuery.ajax({ data: data });
    };
    
    this.updateAddress = function (addressId,name,value) {
        var data = {
            module: 'addresses',
			column: name,
			edit: 1,
            id: addressId
        };
        data[name] = value;
        jQuery.ajax({ data: data });
    }

    this.deleteTerritory = function (id) {
        for (var i = territories.length - 1; i >= 0; i--) {
            if (territories[i].id === id) {
                territories.splice(i, 1);
                break;
            }
        }
    };

});
