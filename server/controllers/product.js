const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (error) {
        console.log('Error Creating New Product : ', error);
        res.status(400).json({
            error: error.message
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndRemove({ slug: req.params.slug }).exec();
        res.json(deletedProduct);
    } catch (error) {
        console.log('Error Creating New Product : ', error);
        return res.status(400).send('Error Deleting the Product');
    }
}

exports.listAll = async (req, res) => {
    try {
        let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .sort([['createdAt', 'desc']])
        .exec();
        res.json(products);
    } catch(error) {
        console.log('Error Fetching Product List: ', error);
        res.status(400).json({
            error: error.message
        })
    }
}