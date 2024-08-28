const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  target: { type: String, required: true },
  id: { type: String, required: true },
});

const Edge = mongoose.model('Edge', edgeSchema);
module.exports = Edge;
