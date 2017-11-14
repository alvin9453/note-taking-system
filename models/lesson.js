var mongoose = require('mongoose');

module.exports = mongoose.model('Lesson' , {
	classID: String,
    lessonNum : String,
    title: String,
});
