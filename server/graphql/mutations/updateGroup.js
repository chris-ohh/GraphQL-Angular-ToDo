var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GroupType = require('../types/group').groupType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GroupModel = require('../../models/group');
var TaskType = require('../types/task').taskType;

exports.updateGroup = {
  type: GroupType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    task: {
      type: GraphQLString,
      args: {
          data: { type: new GraphQLNonNull(TaskType) }
      },
      resolve: function (_, args) {
        return 'success!';
      }
    }
  },
  resolve(root, params) {
    return GroupModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}
