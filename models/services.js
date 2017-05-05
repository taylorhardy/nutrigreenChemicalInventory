var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
	service: {
		name: String,
		description: String,
		dateAdded: Date,
		addedBy: String,
		active: Boolean,
		lastModified: Date,
		ModifiedBy: String
	}
});

module.exports = mongoose.model('service', ServiceSchema);