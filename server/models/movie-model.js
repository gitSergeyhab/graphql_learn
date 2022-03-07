const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    rate: Number,
    watched: Boolean,
});

module.exports = model('Movie', schema);