const Channel = require('../models/Channel');

const regChannel = async ctx => {
    if(String(ctx.channelPost) !== 'undefined'){
        const channelsFound = await Channel.find({channel_id: ctx.channelPost.chat.id});
        if(channelsFound.length === 0){
            const newChannel = new Channel(
                {channel_id: ctx.channelPost.chat.id,
                channel_name: ctx.channelPost.chat.title,
                channel_username: ctx.channelPost.chat.channel_username,
                posts: ctx.channelPost.message_id
            })
            await newChannel.save(err => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('New Channel saved successfuly!');
                }
            });
        }
        else{
            let channel = await Channel.findOne({channel_id: ctx.channelPost.chat.id});
            let newPosts = channel.posts + 1;
            await Channel.findOneAndUpdate({channel_id: String(ctx.channelPost.chat.id)}, {posts: newPosts});
        }
    }
}

module.exports = regChannel;