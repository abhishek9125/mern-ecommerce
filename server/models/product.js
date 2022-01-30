const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 32,
        trim: true,
        required: true,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true,
        text: true
    },
    price: {
        type: Number,
        maxlength: 32,
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    subs: [{
        type: ObjectId,
        ref: "Sub"
    }],
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    // images: {
    //     type: Array
    // },
    shipping: {
        type: String,
        enum: ['Yes', 'No']
    },
    color: {
        type: String,
        enum: ['Black', 'Brown', 'Silver', 'White', 'Blue']
    },
    brand: {
        type: String,
        enum: ['Apple', 'Sony', 'Lenovo', 'Microsoft', 'Sony', 'Samsung', 'Asus']
    },
    // ratings: [{
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: 'User' }
    // }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 