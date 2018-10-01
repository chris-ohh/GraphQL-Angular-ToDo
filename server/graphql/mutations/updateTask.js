var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var TaskType = require('../types/task');
var TaskModel = require('../../models/task');

exports.updateTask = {
  type: TaskType.taskType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    checked: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  resolve(root, params) {
    return TaskModel.findByIdAndUpdate(
      params.id,
      { $set: { checked: params.checked } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}
