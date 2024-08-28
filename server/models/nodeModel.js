const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  edges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edge' }] 
});

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
