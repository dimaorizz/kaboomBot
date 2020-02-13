/*
    @function name: 
    @params: ctx (messages: /karma - returns rating list of karma in group; /karma @username - returns karma for @username;
         /karma @username) [-2 <=> +2] - adds karma for another user
    @return: 
    TODO: every 20 messages karma +2
*/

//

const mongoose = require('mongoose');
const User = require('../models/User');

const karmaModule = {
    karma: async ctx => {
        const users = await User.find({chat_id: ctx.message.chat.id});
        if(users.length !== 0){
            users.sort((a, b) => b.karma - a.karma); // backsort
            let output = [];

            for(let i = 0; i < users.length; i++){
                output.push({username: users[i].username, karma: users[i].karma});
            }
            return output;
        }
        else{
            return null;
        }
    },
    userKarma: async ctx => {
        let userInput = ctx.message.text.split(' ');
        userInput[1] = userInput[1].split('');
        userInput[1].shift();
        userInput[1] = userInput[1].join('');
        let username = userInput[1];
        const user = await User.find({chat_id: ctx.message.chat.id, username});
        if(user.length === 0){
                return null;
        }
        else{
            return user[0];
        }
    },
    changeUserKarma: async ctx => {
        let userInput = ctx.message.text.split(' ');
        userInput[1] = userInput[1].split('');
        userInput[1].shift();
        userInput[1] = userInput[1].join('');
        let username = userInput[1];
        let value = Number(userInput[2]);
        if(isNaN(value)){
            return null;
        }
        else if(value > 2 || value < -2){
            return null;
        }
        else{
            const user = await User.find({chat_id: ctx.message.chat.id, username});
            if(user.length === 0){
                return null;
            }
            else{
                newKarma = user[0].karma + value;
                await User.findOneAndUpdate({chat_id: ctx.message.chat.id, username}, {karma: newKarma});
            }
        }
    },
}

module.exports = karmaModule;