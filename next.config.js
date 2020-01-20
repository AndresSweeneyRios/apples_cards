const withSass = require('@zeit/next-sass')

const { WS_PORT } = process.env

module.exports = withSass({
    cssModules: true,
    env: {
        WS_PORT,
    },
})