const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    chat_id: String,
    karma: Number,
    username: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('users', UserSchema);
