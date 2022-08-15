const router = require('express').Router();

const mapErrors = require('../util/mappers');
const service = require('../services/catalogService');
router.get('/models', async (req, res) => {
  try {
    const models = await service.getAllModels();
    res.status(200).json(models);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
})

router.get('/model/:id', async (req, res) => {
  const modelId = req.params.id;
  try {
    const model = await service.getModel(modelId);
    res.status(200).json(model);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;