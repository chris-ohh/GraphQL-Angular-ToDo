
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GroupModel = require('../../models/group');
var groupType = require('../types/group').groupType;

// Query
exports.groupQueryType =
    {
      type: new GraphQLList(groupType),
      resolve: function () {
            const groups = GroupModel.find().exec()
            if (!groups) {
              throw new Error('Error')
            }
            return groups
          }
      }
