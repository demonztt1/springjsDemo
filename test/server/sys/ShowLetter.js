
// show  Windows letter, to compatible Windows xp

var exec = require('child_process').exec;

var childProcess = require('child_process');

// show  Windows letter
function showLetter(callback) {
    exec('wmic logicaldisk get caption', function(err, stdout, stderr) {
        if(err || stderr) {
            console.log("root path open failed" + err + stderr);
            return;
        }
        callback(stdout);
    });
}

  //  showLetter(console.log)

function showLetter1( ) {
    return    new Promise(async resolve => {
        try {
            resolve(childProcess.execSync('wmic logicaldisk get caption'));
        } catch(error) {
            reject(error)
        }
    })
}

   let roots=   showLetter1()

roots .then(function (root) {

    //console.log(root.toString())
    let roote=root.toString();
    let nosds= roote.replace(new RegExp(/( )/g),"").split(/[\r+\n]+/)
    nosds  .splice(0, 1);
    nosds  .splice(nosds.length-1, 1);
    debugger
    console.log(   nosds.length)
})

/**
 *  output:
 *  Caption
 *  C:
 *  D:
 *  E:
 *  F:
 *  G:
 **/


