const path = require('path');
const express = require('express');
const http = require('http');
const api = require('./api.js');

const server = express();

let env = process.env.NODE_ENV;
if (env) env = env.trim();
const isDev = env === 'development';
const isProd = env == 'production';

/**********************
 * DEVELOPMENT server *
 **********************/
if (isDev) {
  const port = 3000;
  const hostname = 'localhost';
  server.use('/api', api);
  server.all('*', (req, res) => handle(req, res));

  http.createServer(server).listen(port, hostname, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on https://${hostname}:${port} [${env}]`);
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
