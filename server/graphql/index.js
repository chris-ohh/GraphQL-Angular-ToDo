var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var query = require('./queries/index');
var mutation = require('./mutations/index');


exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: query
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})
