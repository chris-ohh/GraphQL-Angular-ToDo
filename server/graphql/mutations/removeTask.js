var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TaskType = require('../types/task');
var TaskModel = require('../../models/task');

exports.removeTask = {
  type: TaskType.taskType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedtask = TaskModel.findByIdAndRemove(params.id).exec();
    if (!removedtask) {
      throw new Error('Error')
    }
    return removedtask;
  }
}
