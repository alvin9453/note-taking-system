var mongoose = require('mongoose');

module.exports = mongoose.model('Course' , {
	cid: String,
	name: String,
	department: String,
	teacher: String,
	time: String
});
