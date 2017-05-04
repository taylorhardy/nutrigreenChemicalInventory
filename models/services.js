var mongoose = require('mongoose');

var ServiceSchema = mongoose.Schema({
	service: {
		name: String,
		description: String,
		dateAdded: Date,
		active: Boolean
	}
});

module.exports = mongoose.model('service', ServiceSchema);