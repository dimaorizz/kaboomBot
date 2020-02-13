/*
    @function name: roll
    @params: context object (msg format : /roll; /roll max; /roll min max)
    @return: random number in defined interval
*/
const roll = ctx => {
    const userInput = ctx.message.text.split(' ');
    let maxValue = 100, minValue = 0;
    switch(userInput.length){
        case 1:
            return Math.floor(Math.random() * maxValue);
        case 2:
            maxValue = Number(userInput[1]);
            if(isNaN(maxValue)){
                return undefined;
            }
            else{
                return Math.floor(Math.random() * maxValue);
            }
        case 3:
            minValue = Number(userInput[1]);
            maxValue = Number(userInput[2]);
            if(minValue > maxValue){
                minValue = [maxValue, maxValue = minValue][0]; // value swap of maxValue and minValue
            }
            if(isNaN(minValue) || isNaN(maxValue)){
                return undefined;
            }
            else{
                return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
            }
        default:
            return undefined;
    }
}

module.exports = roll;
