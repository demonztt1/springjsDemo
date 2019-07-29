var babel = require("@babel/core");

function testable(isTestable) {
    console.log(isTestable);
    return function(target) {
        target.isTestable = isTestable;
    }
}


let code=` 
 import React, { Component } from './node_modules/react/cjs/react.development.js'; 
function testable(isTestable) {
 
    return function(target) {
       console.log('-----------------');

        target.isTestable = isTestable;
          console.log(new target())
             console.log('-----------------');
    }
}
  
 @testable('xxxxxxx')
class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
export default App;
`

let options= { presets: [ '@babel/env' ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-syntax-dynamic-import"],
        ["@babel/plugin-transform-react-jsx"]

    ]
}



/*
 动态加载模块
 */
function requireFromString(src, filename) {
    var Module = module.constructor;
    var m = new Module();
    m._compile(src, filename);
    return m.exports;
}


//es6代码转换 es5代码
babel.transformAsync(code,options).then(result => {
console.log( result.code)

    debugger;

    let rr=requireFromString( result.code,'WebPdfApplication' )

    debugger;

    console.log(rr.isTestable)
    result.code;
    result.map;
    result.ast;
});





