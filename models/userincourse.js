var mongoose = require('mongoose');

module.exports = mongoose.model('UserInCourse' , {
	user: String,
	courseID: String,
    courseName : String,
    courseDepartment : String,
    courseTeacher: String,
    courseTime: String
});
