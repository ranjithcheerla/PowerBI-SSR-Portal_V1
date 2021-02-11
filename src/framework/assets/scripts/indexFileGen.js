const fs = require('fs');
const args = require('yargs').argv;
const angularCore = require('@angular-devkit/core');
let _env = args.env;
let env = '';
// This below check for local or specific environment file!
if (_env !== undefined) {
  env = require('./../../../environments/environment.' + _env);
} else {
  env = require('./../../../environments/environment');
}

const index = require('./../../../index');

const omniture_internal = {
  dev: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-5de63a04e7e50a1b77e7df4eb99dabb9fdf80017-staging.js',
  qa: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-5de63a04e7e50a1b77e7df4eb99dabb9fdf80017-staging.js',
  staging:
    '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-5de63a04e7e50a1b77e7df4eb99dabb9fdf80017-staging.js',
  uat: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-5de63a04e7e50a1b77e7df4eb99dabb9fdf80017-staging.js',
  prod: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-5de63a04e7e50a1b77e7df4eb99dabb9fdf80017.js'
};

const omniture_external = {
  dev: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-efd6120a6f6ed94da49cf49e2ba626ac110c7e3c-staging.js',
  qa: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-efd6120a6f6ed94da49cf49e2ba626ac110c7e3c-staging.js',
  uat: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-efd6120a6f6ed94da49cf49e2ba626ac110c7e3c-staging.js',
  staging:
    '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-efd6120a6f6ed94da49cf49e2ba626ac110c7e3c-staging.js',
  prod: '//assets.adobedtm.com/572ee9d70241b5c796ae15c773eaaee4365408ec/satelliteLib-efd6120a6f6ed94da49cf49e2ba626ac110c7e3c.js'
};

const omnitureUrls = index.ApplicationInfo.omnitureExternalSites ? omniture_external : omniture_internal;

const defaultConfig = `
  <meta charset="utf-8">
  <title>${index.ApplicationInfo.title}</title>
  <base href="${index.ApplicationInfo.baseHref}">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- Meta Tags for PWA -->
  <!-- <meta name="theme-color" content="#1976d2"> -->
  <!-- iOS Meta Tags for PWA  -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="${index.ApplicationInfo.title}">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <style type="text/css">
    .cf-dots {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 58px;
    }

    .cf-dots div {
      position: absolute;
      top: 33px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #00538a;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .cf-dots div:nth-child(1) {
      left: 8px;
      animation: cf-dots1 0.6s infinite;
      background: #a3daff;
    }

    .cf-dots div:nth-child(2) {
      left: 8px;
      animation: cf-dots2 0.6s infinite;
      background: #169af3;
    }

    .cf-dots div:nth-child(3) {
      left: 32px;
      animation: cf-dots2 0.6s infinite;
      background: #0071bc;
    }

    .cf-dots div:nth-child(4) {
      left: 56px;
      animation: cf-dots3 0.6s infinite;
      background: #00538a;
    }

    @keyframes cf-dots1 {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes cf-dots3 {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }

    @keyframes cf-dots2 {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(24px, 0);
      }
    }

    .cf-apploader {
      display: none;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: rgba(255, 255, 255, 1);
    }

    body.apploader .cf-apploader {
      display: inline-flex;
    }
  </style>

`;
const omniture = `
<script>
    var wbgData = {
      site: {
        pageLoad: 'N'
      }
    };
  </script>
  <script src="${_env === undefined ? omnitureUrls['dev'] : omnitureUrls[_env]}"></script>
`;

const antiClickJackingScript = `
<style id="antiClickjack">body{display:none !important;}</style>
  <script type="text/javascript">
  if (self === top) {
      var antiClickjack = document.getElementById("antiClickjack");
      antiClickjack.parentNode.removeChild(antiClickjack);
  } else {
      top.location = self.location;
  }
</script>
`;
const body = `
  <div class="cf-apploader">
    <div class="cf-dots">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <app-root>
    <style type="text/css">
      /* home page spinner */

      body {
        text-align: center;
        background: linear-gradient(141deg, #ffffff 25%, #eee 40%, #def0fd 55%);
        font-size: 18px;
        padding-top: 30vh;
        height: 100vh;
        overflow: hidden;
        font-family: "Open Sans", Arial, sans-serif;
        color: #48535c;
      }

      .cf-loader{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        display: inline-flex; 
        z-index: 9991;  
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.7);
      }
      
      .animated-words {
        display: inline-block;
        font-size: 14px;
        text-align: center;
        width: 75px;
        height: 20px;
      }
    
      .animated-words span {
        position: absolute;
        display: block;
        opacity: 0;
        overflow: hidden;
        -webkit-animation: animateWord 7s linear infinite 1s;
        -ms-animation: animateWord 7s linear infinite 1s;
        animation: animateWord 7s linear infinite 1s;
      }
    
      .animated-words span:nth-child(2) {
        -webkit-animation-delay: 4s;
        -ms-animation-delay: 4s;
        animation-delay: 4;
      }
    
      .animated-words span:nth-child(3) {
        -webkit-animation-delay: 6s;
        -ms-animation-delay: 6s;
        animation-delay: 6s;
      }
    
    
      @keyframes animateWord {
        0% {
          opacity: 0;
        }
    
        2% {
          opacity: 0;
          -webkit-transform: translateY(0);
        }
    
        5% {
          opacity: 1;
          -webkit-transform: translateY(0);
        }
    
        17% {
          opacity: 1;
          -webkit-transform: translateY(0);
        }
    
        20% {
          opacity: 0;
          -webkit-transform: translateY(0);
        }
    
        80% {
          opacity: 0;
        }
    
        100% {
          opacity: 0;
        }
      }
    </style>

    <div class="cf-loader">
      <div class="cf-dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="page-spinner-title">${index.ApplicationInfo.title}</div>
      <div class="animated-words">
        <span>Please wait</span>
        <span>Loading...</span>
        <!-- <span>Loaded</span> -->
      </div>
    </div>
  </app-root>
  <noscript>Please enable JavaScript to continue using this application.</noscript>
`;

const html = `
<!doctype html>
  <html lang="en">
  <head>
    ${defaultConfig}
    ${index.ApplicationInfo.includeOmniture ? omniture : ''}
    ${index.ApplicationInfo.externalScriptAtHeadOfFile}
    ${antiClickJackingScript}
    
  </head>
   <body>
     ${body}
     ${index.ApplicationInfo.externalScriptAtEndOfFile}
   </body>
</html>

`;

fs.writeFileSync('./src/index.html', html);
if (_env === undefined) {
  _env = 'local';
}
console.log(angularCore.terminal.bold(angularCore.terminal.green(`index.html file for the ${_env} environment is generated`)));
