const mongoose = require('mongoose');

const sculptureSchema = new mongoose.Schema({
    material: { type: String, enum: ['marble', 'bronze', 'clay', 'wood', 'steel'] },
    style: String,
    year: { type: Number, min: 1, max: 2026 }
});

module.exports = mongoose.model('Sculpture', sculptureSchema);