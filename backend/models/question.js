const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionModel = new Schema({
    question: {
        type: String,
        required: true
    },
    trait_id: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('questions', questionModel);
module.exports =Question;