const fs = require('fs');
const args = require('yargs').argv;
const angularCore = require('@angular-devkit/core');

const txt = `
${new Date()}
`;

fs.writeFileSync('./src/build.txt', txt);

 console.log(angularCore.terminal.bold(angularCore.terminal.green(`Build file is generated`))); 