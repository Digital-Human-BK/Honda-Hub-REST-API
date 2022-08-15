const {Schema, model} = require('mongoose');

const modelSchema = new Schema({
  id: {
    type: String
  },
  model: {
    type: String
  },
  generations: {
    type: Array
  }
});

const Model = model('Model', modelSchema);

module.exports = Model;