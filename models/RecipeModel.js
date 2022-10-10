const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const recipeSchema = new mongoose.Schema({
    recipeID: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Recipe', recipeSchema);