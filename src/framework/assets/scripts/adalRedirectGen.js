const fs = require('fs');
const args = require('yargs').argv;
const angularCore = require('@angular-devkit/core');
let _env = args.env || args.environment;
let env = '';
// This below check for local or specific environment file!
if (_env !== undefined) {
  env = require('./../../../environments/environment.' + _env);
} else {
  env = require('./../../../environments/environment');
}
const html = `
<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <link rel="icon" type="image/x-icon" href="favicon.ico">
        </head>
        <body>
            <script src="framework/assets/scripts/adal.js"></script>
            <script>
            const config = ${JSON.stringify(env.environment.adalConfig)};
            var authContext = new AuthenticationContext(config);
            authContext.handleWindowCallback();
            </script>
            
        </body>
    </html>
`;

fs.writeFileSync('./src/adalRedirect.html', html);
if (_env === undefined) {
  _env = 'local';
}
console.log(
  angularCore.terminal.bold(angularCore.terminal.green(`Redirect file for the ${_env} environment is generated`))
);
