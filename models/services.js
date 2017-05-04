var mongoose = require('mongoose');

var ServiceSchema = mongoose.Schema({
	service: {
		name: String,
		description: String
	}
});

module.exports = mongoose.model('service', ServiceSchema);