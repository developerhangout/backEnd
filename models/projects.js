let mongoose = require('mongoose');

let otherSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

let projectSchema = mongoose.Schema({
	creator: {
		type: String,
		required: true
	},
	stack: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	source: {
		type: [otherSchema],
		required: true
	},
	demo: {
		type: [otherSchema],
		required: false
	},
	other: {
		type: [otherSchema],
		required: false
	}
});

module.exports = mongoose.model('Projects', projectSchema);