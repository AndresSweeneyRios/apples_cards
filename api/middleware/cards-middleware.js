const cards = require('./cards')

const shuffle = (array) => {
    let counter = array.length

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }

    return array
}

module.exports = (req, res, next) => {
    req.cards = cards

    req.blackDeck = () => shuffle([...cards.blackCards])

    req.whiteDeck = () => shuffle([...cards.whiteCards])

    next()
}