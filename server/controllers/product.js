const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (error) {
        console.log('Error Creating New Product : ', error);
        res.status(400).send('Error Creating Product');
    }
}