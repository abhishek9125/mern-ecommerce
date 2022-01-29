const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
        res.json(sub);
    } catch (error) {
        console.log('Error Creating New Sub Category : ', error);
        res.status(400).send('Error Creating New Sub Category');
    }
}

exports.list = async (req, res) => {
    try {
        const subList = await Sub.find({}).sort({createdAt: -1}).exec();
        res.json(subList);
    } catch (error) {
        console.log('Error Fetching Sub Category List : ', error);
        res.status(400).send('Error Fetching Sub Category List');
    }
}

exports.read = async (req, res) => {
    try {
        const sub = await Sub.findOne({ slug: req.params.slug }).exec();
        res.json(sub);
    } catch (error) {
        console.log('Error Fetching Sub Category : ', error);
        res.status(400).send('Error Fetching Sub Category');
    }
}

exports.update = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const updatedSubCategory = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, parent, slug: slugify(name) }, { new: true });
        res.json(updatedSubCategory);
    } catch (error) {
        console.log('Error Updating Sub Category : ', error);
        res.status(400).send('Error Updating Sub Category');
    }
}

exports.remove = async (req, res) => {
    try {
        const deleteSubCategory = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleteSubCategory);
    } catch (error) {
        console.log('Error Deleting Sub Category : ', error);
        res.status(400).send('Error Deleting Sub Category');
    }
}