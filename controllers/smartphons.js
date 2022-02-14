const Smartphone = require('../models/smartphone');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const getSmartphons = (req, res, next) => {
  Smartphone.find()
    .then((smartphons) => {
      if (smartphons) {
        res
          .status(200)
          .send(smartphons);
      }
    })
    .catch(next);
};

const createSmartphone = (req, res, next) => {
  const {
    name,
    description,
    operatingSystem,
    condition,
    price,
  } = req.body;

  return Smartphone.create({
    name,
    description,
    operatingSystem,
    condition,
    price,
  })
    .then((smartphone) => {
      res
        .status(201)
        .send(smartphone);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для добавления товара'));
      } else {
        next(error);
      }
    });
};

const deleteSmartphone = (req, res, next) => {
  Smartphone.findById(req.params.smartphoneId)
    .then((smartphone) => {
      if (!smartphone) {
        throw new NotFoundError('Запрашиваемый смартфон не найден');
      }
      return smartphone;
    })
    .then(() => {
      Smartphone.findByIdAndRemove(req.params.smartphoneId)
        .then((deletedSmartphone) => {
          if (deletedSmartphone) {
            res
              .status(200)
              .send(deletedSmartphone);
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getSmartphons,
  createSmartphone,
  deleteSmartphone,
};
