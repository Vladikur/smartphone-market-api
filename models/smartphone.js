const mongoose = require('mongoose');

const smartphoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  operatingSystem: {
    required: true,
    type: String,
    enum: ['Android', 'iOS', 'другая'],
  },
  condition: {
    required: true,
    type: String,
    enum: ['новый', 'потертости', 'сколы', 'нерабочий'],
  },
  price: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('smartphone', smartphoneSchema);
