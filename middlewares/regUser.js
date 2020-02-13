const mongoose = require('mongoose');
const User = require('../models/User.js');

const regUser = async ctx => {
    if(String(ctx.message) !== 'undefined'){
        const usersFound = await User.find({id: ctx.message.from.id, chat_id: ctx.message.chat.id});
        if(usersFound.length === 0){
            const newUser = new User({id: ctx.message.from.id, chat_id: ctx.message.chat.id, karma: 100, username: ctx.message.from.username});
            await newUser.save(err => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('New user saved successfuly!');
                }
            });
        }
        else{
            await User.updateOne({id: ctx.message.from.id, chat_id: ctx.message.chat.id}, {username: ctx.message.from.username});
        }
    }
}

module.exports = regUser;
