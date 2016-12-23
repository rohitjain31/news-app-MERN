const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: String,
    email: String,
    userName: String,
    password: String
});

const userInformation = mongoose.model('userinformation', userSchema);

module.exports = userInformation;
