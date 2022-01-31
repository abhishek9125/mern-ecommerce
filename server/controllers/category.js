const Category = require('../models/category');
const Product = require('../models/product');
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (error) {
        console.log('Error Creating New Category : ', error);
        res.status(400).send('Error Creating New Category');
    }
}

exports.list = async (req, res) => {
    try {
        const categoryList = await Category.find({}).sort({createdAt: -1}).exec();
        res.json(categoryList);
    } catch (error) {
        console.log('Error Fetching Category List : ', error);
        res.status(400).send('Error Fetching Category List');
    }
}

exports.read = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).exec();
        const products = await Product.find({ category })
        .populate('category')
        .populate('subs')
        .exec();
        res.json({ category, products });
    } catch (error) {
        console.log('Error Fetching Category : ', error);
        res.status(400).send('Error Fetching Category');
    }
}

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        console.log('Error Updating Category : ', error);
        res.status(400).send('Error Updating Category');
    }
}

exports.remove = async (req, res) => {
    try {
        const deleteCategory = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleteCategory);
    } catch (error) {
        console.log('Error Deleting Category : ', error);
        res.status(400).send('Error Deleting Category');
    }
}

exports.getSubs = async (req, res) => {
    try {
        const subList = await Sub.find({ parent: req.params._id }).exec();
        res.json(subList);
    } catch(error) {
        console.log('Error Fetching Sub Category List : ', error);
        res.status(400).send('Error Fetching Sub Category List');
    }
}