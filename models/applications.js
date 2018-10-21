let mongoose = require('mongoose');

let applicationSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	languages: {
		type: String,
		required: true
	},
	learn: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	info: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Applications', applicationSchema);