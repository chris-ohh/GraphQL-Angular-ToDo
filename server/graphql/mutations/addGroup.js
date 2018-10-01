
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GroupType = require('../types/group');
var GroupModel = require('../../models/group');

exports.addGroup = {
  type: GroupType.groupType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const uModel = new GroupModel(params);
    const newGroup = uModel.save();
    if (!newGroup) {
      throw new Error('Error');
    }
    return newGroup
  }
}
