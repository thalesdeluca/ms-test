import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

class App {
    private app: express.Application;

    private port: number;

    private apolloServer : ApolloServer;

    constructor(controllers, schema, port) {
      this.app = express();
      this.port = port;

      this.initControllers(controllers);
      this.initGraphQL(schema);
    }

    private initGraphQL({ typeDefs, resolvers }) {
      this.apolloServer = new ApolloServer({
        schema: makeExecutableSchema({
          typeDefs,
          resolvers,
        }),
      });
      this.apolloServer.applyMiddleware({ app: this.app });
    }

    private initControllers(controllers) {
      controllers.forEach((controller) => {
        this.app.use('/api', controller.router);
      });
    }

    public listen() {
      this.app.listen(this.port, () => {
        console.log(`started at port ${this.port}`);
      });
    }
}

export default App;
