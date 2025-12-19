const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  donutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donut', required: true }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
