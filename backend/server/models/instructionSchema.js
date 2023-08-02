const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  instructionName: { type: String, required: true },
  instructionDescription: { type: String, required: true },
});

const Instruction = mongoose.model('Instruction', instructionSchema);

module.exports = Instruction;
