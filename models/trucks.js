var mongoose = require('mongoose');

var TruckSchema = mongoose.Schema({
	truck: {
		name: String,
		defaultUser: String,
		dateAdded: Date,
		active: Boolean,
		lastModifiedUser: String,
		lastModifiedDate: Date,
		equipmentAssigned: [{
			name: String,
			description: String,
			id: String
		}]
	}
});

module.exports = mongoose.model('truck', TruckSchema);