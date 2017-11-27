var mongoose = require('mongoose');

module.exports = mongoose.model('UserInLesson' , {
	user: String,
	courseID: String,
    courseName : String,
    lessonNum : String,
    title: String,
    isTakeNote : String
});
