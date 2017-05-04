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
			dateAdded: Date,
			active: Boolean,
			applicationTypes: [{
				name: String
			}]
		},
		amountAdded: Number,
		amountUsed: Number,
		totalAmount: Number,
		dateAdded: Date,
	}]
});

module.exports = mongoose.model('Inventory', InventorySchema);