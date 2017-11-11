var mongoose = require('mongoose');

module.exports = mongoose.model('UserInLesson' , {
	user: String,
	classID: String,
    className : String,
    lessonNum : String,
    title: String,
    isTakeNote : String
});
