require('@babel/register') ({ presets: [ '@babel/env' ],  plugins: ['@babel/plugin-transform-runtime']})

//模拟应用启动

module.exports = require('./Application')