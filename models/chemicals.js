var mongoose = require('mongoose');

var ChemicalSchema = new mongoose.Schema({
		name: String,
		type: String,
		price: Number,
		mixUnit: String,
		mixPerUnit: Number,
		amountUnit: String,
		amountPerUnit: Number,
		dateAdded: Date,
		active: Boolean,
		lastModifiedUser: String,
		lastModifiedDate: Date,
		services: [{
			name: String,
			description: String
		}]

});

module.exports = mongoose.model('chemical', ChemicalSchema);