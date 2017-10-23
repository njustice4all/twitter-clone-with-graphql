import express from 'express';
import bodyParser from 'body-parser';

import './config/db';

const server = express();

const PORT = process.env.PORT || 3000;

server.use(bodyParser.json());

server.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${PORT}`);
  }
});
