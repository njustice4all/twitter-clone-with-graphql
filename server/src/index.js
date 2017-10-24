import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';

import './config/db';
import constants from './config/constants';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mocks from './mocks';

const server = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

server.use(bodyParser.json());

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_URL,
  })
);

server.use(
  constants.GRAPHQL_URL,
  graphqlExpress({
    schema,
  })
);

const graphQLServer = createServer(server);

mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App listen to port: ${constants.PORT}`);
    }
  });
});
