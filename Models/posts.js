const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String,require: true}
});

const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    lastName: {type: String, require: true}
});

const studentSchema = mongoose.Schema({
    studentName: {type: String, require: true},
    studentLastname: {type: String,require: true}
});

module.exports = mongoose.model("Post", postSchema);
module.exports = mongoose.model('Student', studentSchema);