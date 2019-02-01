const autoprefixer = require('autoprefixer')
const pxToRem = require('postcss-pxtorem')

module.exports = {
  plugins: [
    autoprefixer({
      grid: 'no-autoplace'
    }),
    pxToRem({
      rootValue: 18
    })
  ]
}
