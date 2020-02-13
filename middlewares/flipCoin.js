/*
    @function name: flipCoin
    @params: context object (msg format : /flip; /flip [param1] [param2])
    @return: String (param1 || param2 / орёл || решка)
*/

const flipCoin = ctx => {
    const userInput = ctx.message.text.split(' ');
    let heads = 'Орёл', tails = 'Решка';
    switch(userInput.length){
        case 1:
            return Math.floor(Math.random() * 2) === 1 ? heads : tails;
        case 3:
            heads = userInput[1];
            tails = userInput[2];
            return Math.floor(Math.random() * 2) === 1 ? heads : tails;
        default:
            return undefined;
    }
 }

 module.exports = flipCoin;
