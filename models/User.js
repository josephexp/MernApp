var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
	},
	password: {
		type: String,
	},
});

// Compile model from schema
module.exports = { User: mongoose.model('user', userSchema) };
