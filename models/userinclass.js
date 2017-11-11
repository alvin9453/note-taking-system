var mongoose = require('mongoose');

module.exports = mongoose.model('UserInClass' , {
	user: String,
	classID: String,
    className : String,
    classDepartment : String,
    classTeacher: String,
    classTime: String,
	isTakeNote : String
});
