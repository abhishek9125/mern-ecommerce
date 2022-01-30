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

exports.read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        .populate('category')
        .populate('subs')
        .exec();
        res.json(product);
    } catch (error) {
        console.log('Error Fetching Product : ', error);
        res.status(400).send('Error Fetching Product');
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

exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 3;
        const perPage = 3;
        const products = await Product.find({ })
        .populate("category")
        .populate("subs")
        .sort([[sort, order]])
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .exec();
        res.json(products);
    } catch(error) {
        console.log('Error Fetching Product List: ', error);
        res.status(400).json({
            error: error.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
        return res.json(updatedProduct);
    } catch (error) {
        console.log('Error Updating Product : ', error);
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

exports.productsCount = async (req, res) => {
    try {
        const total = Product.find({}).estimatedDocumentCount().exec();
        res.json(total)
    } catch (error) {
        console.log('Error Getting Product Count: ', error);
        return res.status(400).send('Error Getting Product Count');
    }
}