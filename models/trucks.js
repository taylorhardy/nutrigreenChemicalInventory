var mongoose = require('mongoose');

var TruckSchema = mongoose.Schema({
	truck: {
		name: String,
		defaultUser: String,
		equipmentAssigned: [{
			name: String,
			description: String,
			id: String
		}]
	}
});

module.exports = mongoose.model('truck', TruckSchema);