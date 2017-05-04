var mongoose = require('mongoose');

var ChemicalSchema = mongoose.Schema({
	chemical: {
		name: "",
		type: "",
		price: 0,
		mixUnit: "",
		mixPerUnit: 0,
		applicationTypes: [{
			name: ""
		}]
	}
});

module.exports = mongoose.model('Chemical', ChemicalSchema);