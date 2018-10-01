var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
//var Task = require('./task').Model;

var groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }]
});
var Model = mongoose.model('Group', groupSchema);
module.exports = Model;
