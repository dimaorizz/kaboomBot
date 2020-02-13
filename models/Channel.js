const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    channel_id: String,
    channel_name: String,
    channel_username: String,
    posts: Number,
});

module.exports = mongoose.model('channels', ChannelSchema);