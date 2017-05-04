var mongoose = require('mongoose');

var ChemicalSchema = mongoose.Schema({
	chemical: {
		name: String,
		type: String,
		price: Number,
		mixUnit: String,
		mixPerUnit: Number,
		amountUnit: String,
		amountPerUnit: Number,
		services: [{
			name: String,
			description: String
		}]
	}
});

module.exports = mongoose.model('Chemical', ChemicalSchema);