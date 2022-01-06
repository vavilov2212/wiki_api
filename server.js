const path = require('path');
const express = require('express');
const http = require('http');
const api = require('./api.js');

const server = express();

let prEnv = process.env;
let env = process.env.NODE_ENV;
if (env) env = env.trim();
const isDev = env === 'development';
const isProd = env == 'production';
console.log(prEnv)
/**********************
 * DEVELOPMENT server *
 **********************/
if (isDev) {
    const port = process.env.PORT || 8080;
    server.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', ['Accept', 'Accept-Encoding', 'Accept-Language',
            'User-Agent', 'Sec-Fetch-Site', 'Sec-Fetch-Mode', 'Sec-Fetch-Dest', 'Referer', 'Origin', 'Host', 'Connection', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Content-Type']);
        next();
    });

    server.use('/api', api);
    server.all('*', (req, res) => res.status(400));

    http.createServer(server).listen(port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Ready on https:// [${env}]`);
    });
}

if (isProd) {
    const port = process.env.PORT || 8080;
    server.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', ['Accept', 'Accept-Encoding', 'Accept-Language',
            'User-Agent', 'Sec-Fetch-Site', 'Sec-Fetch-Mode', 'Sec-Fetch-Dest', 'Referer', 'Origin', 'Host', 'Connection', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Content-Type']);
        next();
    });

    server.use('/api', api);
    server.all('*', (req, res) => res.status(400));

    http.createServer(server).listen(port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Ready on https:// [${env}]`);
    });
}
/*****************************
 * PROSUCTION build & server *
 *****************************/
/* if (isProd) { */
/*   const hostname = 'vavilov2212.github.io'; */
/*   const port = 3000; */
/*   const app = next({ */
/*     dir: path.join(__dirname, '../'), */
/*     isDev */
/*   }); */
/*   const handle = app.getRequestHandler(); */

/*   app.prepare() */
/*     .then(() => { */

/*       server.use('/api', api); */
/*       server.all('*', (req, res) => handle(req, res)); */

/*       server.listen(port, async (err) => { */
/*         if (err) { */
/*           throw err; */
/*         } */
/*         /1* console.log(`> Ready on https://${hostname}:${port} [${env}]`); *1/ */
/*       }); */

/*     }) */
/*     .catch(err => { */
/*       console.log('An error occurred, unable to start the server'); */
/*       console.log(err); */
/*     }); */
/* } */
