const chalk = require('chalk')

module.exports = {
    success (script, ...args) {
        console.log(`[ ${chalk.green(script)} ]`, ...args)
    },

    error (script, ...args) {
        console.log(`[ ${chalk.redBright(script)} ]`, ...args)
    },
}