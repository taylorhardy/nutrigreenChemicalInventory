var mongoose = require('mongoose');

var EquipmentSchema = mongoose.Schema({
	equipment: {
		name: String,
		description: String,
		id: String,
		dateAdded: Date,
		active: Boolean,
		lastModifiedUser: String,
		lastModifiedDate: Date
	}
});

module.exports = mongoose.model('equipment', EquipmentSchema);