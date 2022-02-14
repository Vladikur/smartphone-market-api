const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getSmartphons,
  createSmartphone,
  deleteSmartphone,
} = require('../controllers/smartphons');

router.get('/', getSmartphons);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      description: Joi.string().required().min(2).max(500),
      operatingSystem: Joi.string().required(),
      condition: Joi.string().required(),
      price: Joi.number().required(),
    }),
  }),
  createSmartphone,
);

router.delete(
  '/:smartphoneId',
  celebrate({
    params: Joi.object().keys({
      smartphoneId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteSmartphone,
);

module.exports = router;
