const angularCore = require('@angular-devkit/core');
const env = require('./../../../environments/environment.prod');

if (!env.environment.appInsightsKey) {
  console.log(
    angularCore.terminal.bold(
      angularCore.terminal.red(`App Insights should be enabled for PROD environment. Please set the App Insights instrumentation key
  environment.prod.ts file!`)
    )
  );
  process.exit(-1);
}
