const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is Required',
        minLength: [3, 'Too Short'],
        maxlength: [32, 'Too Long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema); 