
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TaskType = require('../types/task');
var TaskModel = require('../../models/task');

exports.addTask = {
  type: TaskType.taskType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const uModel = new TaskModel(params);
    const newTask = uModel.save();
    if (!newTask) {
      throw new Error('Error');
    }
    return newTask
  }
}
