const { ApolloServer } = require("apollo-server");
const { prisma } = require("./prisma/generated/prisma-client");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("./schema.graphql");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    prisma,
    request: req
  }),
  cors: true
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
