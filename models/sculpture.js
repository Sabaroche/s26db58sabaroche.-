const mongoose = require('mongoose');

const sculptureSchema = new mongoose.Schema({
    material: String,
    style: String,
    year: Number
});

module.exports = mongoose.model('Sculpture', sculptureSchema);