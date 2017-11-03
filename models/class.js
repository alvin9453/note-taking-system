var mongoose = require('mongoose');

module.exports = mongoose.model('Class' , {
	cid: String,
	name: String,
	department: String,
	teacher: String,
	time: String
});
