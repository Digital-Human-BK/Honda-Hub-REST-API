const Model = require('../models/Model');

async function getModel(modelId) {
  return Model.findOne({model: modelId}).lean();
}

async function getAllModels() {
  return Model.findOne({ id: 'all-models' }).lean();
}

module.exports = {
  getModel,
  getAllModels
};
