require('dotenv').config();
const Channel = require('../models/Channel');

const getRandomMemeFormChannel = async ctx => {
    let channel = await Channel.findOne({channel_id: process.env.POST_CHANNEL_ID})
    let maxPostId = channel.posts;
    let minPostId = 1;
    const currID = Math.floor(minPostId + Math.random() * (1 + maxPostId - minPostId));
    ctx.telegram.forwardMessage(ctx.message.chat.id, process.env.POST_CHANNEL_ID, currID).catch(() => {
        getRandomMemeFormChannel(ctx);
    });
}

module.exports = getRandomMemeFormChannel;
