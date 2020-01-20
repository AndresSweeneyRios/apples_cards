const cards = require('./cards')

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [a[i], a[j]] = [a[j], a[i]]
    }
    
    return a
}

module.exports = (req, res, next) => {
    req.cards = cards

    req.blackDeck = () => shuffle([...cards.blackCards])

    req.whiteDeck = () => shuffle([...cards.whiteCards])

    next()
}