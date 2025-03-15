import mongoose from 'mongoose'

const IdeaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text field']
    },
    tag: {
        type: String,
    },
    username: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

const Idea = mongoose.model('Idea', IdeaSchema)

export { Idea }