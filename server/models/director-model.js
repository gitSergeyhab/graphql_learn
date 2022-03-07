const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: String,
    age: Number,
});

module.exports = model('Director', schema);