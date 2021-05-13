var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  email: String,
  password: String,
});

// Compile model from schema
var user = mongoose.model("user", SomeModelSchema);

