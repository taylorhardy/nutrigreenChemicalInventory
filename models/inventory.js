var mongoose = require('mongoose');

var InventorySchema = mongoose.Schema({
	inventory: [{
		owner: String,
		chemical: {
			name: String,
			type: String,
			price: Number,
			mixUnit: String,
			mixPerUnit: Number,
			applicationTypes: [{
				name: String
			}]
		},
		amountAdded: Number,
		amountUsed: Number,
		totalAmount: Number
	}]
});

module.exports = mongoose.model('Inventory', InventorySchema);