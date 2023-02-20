const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const questionAnswerSchema = new Schema({
    questionedBy: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: Object
    }
})

const QuestionAnswer = mongoose.model('questionAnswer', questionAnswerSchema);

module.exports = QuestionAnswer;