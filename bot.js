require('dotenv').config();
const Telegraf = require('telegraf');
const mongoose = require('mongoose');

const roll = require('./middlewares/roll.js');
const flip = require('./middlewares/flipCoin.js');
const randPic = require('./middlewares/randPicture.js');
const regUser = require('./middlewares/regUser.js');
const rps = require('./middlewares/rps.js');
const karma = require('./middlewares/karma.js');
const getMeme = require('./middlewares/memes.js');
const { monday, tuesday, wednesday, thursday, friday, saturday } = require('./middlewares/shedule');
const regChannel = require('./middlewares/regChannel');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('MongoDB Connected!');
    }
});

const bot = new Telegraf(process.env.BOT_TOKEN);

//logger middleware
bot.use((ctx, next) => {
    console.log(ctx.message || ctx.channelPost);
    return next();
});
//reg new user
bot.on('message', async (ctx, next) => {
    await regUser(ctx);
    return next();
});

bot.on('channel_post', async ctx => {
    await regChannel(ctx);
})


bot.command('roll', async ctx => {
    const randNumber = roll(ctx);
    if(String(randNumber) === 'undefined'){
        await ctx.reply('Команда введена неверно, попробуйте еще раз.');
    }
    else{
        await ctx.reply(`Ваше случайное число: ${randNumber}`);
    }
});

bot.command('flip', async ctx => {
    const flipResult = flip(ctx);
    if(String(flipResult) === 'undefined'){
        await ctx.reply('Команда введена неверно, попробуйте еще раз.');
    }
    else{
        await ctx.reply(`${flipResult}`);
    }
});

bot.command('pic', async ctx => {
    const pictureUrl = randPic(ctx);
    await ctx.replyWithPhoto(pictureUrl);
});

bot.command('rps', async ctx => {
    const winner = await rps(ctx);
    if(winner === -1){
        await ctx.reply('Ничья! Повезло тебе, человек.');
    }
    else if(winner === 0){
        await ctx.reply('Ахахах какой ты жалкий.')
    }
    else if(winner === 1){
        await ctx.reply('Не радуйся, я просто поддался на этот раз.');
    }
    else{
        await ctx.reply('Не жульничай, я всё вижу.');
    }
    //await ctx.reply(result);
});

bot.command('monday', async ctx => {
    monday(ctx);
});

bot.command('tuesday', async ctx => {
    tuesday(ctx);
});

bot.command('wednesday', async ctx => {
    wednesday(ctx);
});

bot.command('thursday', async ctx => {
    thursday(ctx);
});

bot.command('friday', async ctx => {
    friday(ctx);
});

bot.command('saturday', async ctx => {
    saturday(ctx);
});


bot.command('karma', async ctx => {
    let msg = '';
    switch(ctx.message.text.split(' ').length){
        case 1:
            let topSize = 10;
            const users = await karma.karma(ctx);
            if(users.length < topSize){
                topSize = users.length;
            }
            for(let i = 0; i < topSize; i++){
                msg += `${i + 1}. @${users[i].username} имеет ${users[i].karma} очков кармы\n`;
            }
            break;
        case 2:
            const user = await karma.userKarma(ctx);
            if(user === null){
                msg = 'Что это за ничтожество?';
            }
            else{
                msg = `У @${user.username} ${user.karma} очков кармы`;
            }
            break;
        case 3:
            await karma.changeUserKarma(ctx);
            msg = 'Карма изменена';
            break;
        default:
            msg = `Неверно введна команда!`;
            break;
    }
    await ctx.reply(msg);
});

bot.command('meme', async ctx => {
    await getMeme(ctx);
})

bot.launch();
