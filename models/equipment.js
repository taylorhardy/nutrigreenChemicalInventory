var mongoose = require('mongoose');

var EquipmentSchema = mongoose.Schema({
	equipment: {
		name: String,
		description: String,
		id: String
	}
});

module.exports = mongoose.model('equipment', EquipmentSchema);