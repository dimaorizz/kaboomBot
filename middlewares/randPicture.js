/*
    @function name: getRandomPicture
    @params: context object (msg format : /rpic)
    @return: random picture url

    TODO: Random picture by tag
*/
const getRandomPicture = ctx => {
    const maxId = 100000;
    const uniquePictureId = Math.floor(1 + Math.random() * maxId - 1);
    return `https://picsum.photos/1920/1080?random=${uniquePictureId}`;
}

module.exports = getRandomPicture;