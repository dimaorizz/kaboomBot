/*
    @function name: rps
    @params: 
    @return: 1 / 2 / 3 (1 - rock; 2 - paper; 3 - scissors)
*/
const rps = () => {
    const maxRandomValue = 3,
          minRandomValue = 1;
    return Math.floor(minRandomValue + Math.random() * (maxRandomValue - minRandomValue + 1));
}
/*
    @function name: isPlayerWinner
    @params: context object (msg format : /rps playerOption)
    @return: -1 / 0 / 1 (-1 - draw; 0 - botWins; 1 - palyerWins)
*/
// TODO : заменить смайлики на код
const isPlayerWinner = async ctx => {
    const botTurn = rps();
    let playerTurn = ctx.message.text.split(' ')[1];

    if(playerTurn === '✊'){  // rock
        playerTurn = 1;
    }
    else if(playerTurn === '🤚'){  // paper
        playerTurn = 2;
    }
    else if(playerTurn === '✌️'){ // scissors
        playerTurn = 3;
    }
    else{
        return undefined;
    }

    if(botTurn === 1){
        await ctx.reply('✊');
    }
    else if(botTurn === 2){
        await ctx.reply('🤚');
    }
    else{
        await ctx.reply('✌️');
    }

    if(playerTurn === 1 && botTurn === 3 || playerTurn === 2 && botTurn === 1 || playerTurn === 3 && botTurn === 2){  // winCondition for player
        return 1;
    }
    else if(playerTurn === botTurn){    // winCondition for draw
        return -1;
    }
    else{       // winCondition for bot
        return 0;
    }
}

module.exports = isPlayerWinner;