const Product = require('../models/product');
const User = require('../models/user');
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
        const total = await Product.find({}).estimatedDocumentCount().exec();
        res.json(total)
    } catch (error) {
        console.log('Error Getting Product Count: ', error);
        return res.status(400).send('Error Getting Product Count');
    }
}

exports.productStar = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).exec();
        const user = await User.findOne({ email: req.user.email }).exec();
        const { star } = req.body;

        let existingRatingObject = product.ratings.find((item) => item.postedBy.toString() === user._id.toString());

        if(existingRatingObject === undefined) {
            let ratingAdded = await Product.findByIdAndUpdate(product._id, 
                { $push: { ratings: { star, postedBy: user._id }}}, 
                { new: true }
            ).exec();
            res.json(ratingAdded)
        } else {
            let ratingUpload = await Product.updateOne({ slug: product.slug, ratings: { $elemMatch: existingRatingObject } },
                { $set: { "ratings.$.star": star } },
                { new: true }
            ).exec();
            res.json(ratingUpload)
        }     
        
    } catch (error) {
        console.log('Error Updating Rating: ', error);
        return res.status(400).send('Error Updating Rating');
    }
}

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category
    })
    .limit(3)
    .populate('category')
    .populate('subs')
    .exec();
    res.json(related);
}

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
    .populate('category')
    .populate('subs')
    .exec();
    res.json(products);
}

const handlePrice = async (req, res, price) => {
    try {
        const products = await Product.find({
            price: {
                $gte: price[0],
                $lte: price[1]
            }
        })
        .populate('category')
        .populate('subs')
        .exec();
        res.json(products);
    } catch(error) {
        console.log('Error Fetching Products');
        return res.status(400).send('Error Fetching Rating');
    }
}

const handleCategory = async (req, res, category) => {
    try {
        const products = await Product.find({ category })
        .populate('category')
        .populate('subs')
        .exec();
        res.json(products);
    } catch(error) {
        console.log('Error Fetching Products');
        return res.status(400).send('Error Fetching Rating');
    }
}

const handleStars = async (req, res, stars) => {
    try {
        Product.aggregate([
            {
                $project: {
                    document: "$$ROOT",
                    floorAverage: {
                        $floor: { $avg: "$ratings.star" }
                    }
                }
            },
            { $match: { floorAverage: stars } }
        ]).exec((error, aggregate) => {
            if(error) {
                console.log('Error Fetching Products by Aggregate: ', error);
            }
            Product.find({ _id: aggregate })
            .populate('category')
            .populate('subs')
            .exec((error, products) => {
                if(error) {
                    console.log('Error Fetching Products : ', error);
                }
                res.json(products);
            });
        })
    } catch(error) {
        console.log('Error Fetching Products');
        return res.status(400).send('Error Fetching Rating');
    }
}

exports.searchFilters = async (req, res) => {
    const { query, price, category, stars } = req.body;
    
    if(query) {
        await handleQuery(req, res, query);
    }

    if(price) {
        await handlePrice(req, res, price);
    }

    if(category) {
        await handleCategory(req, res, category);
    }

    if(stars) {
        await handleStars(req, res, stars)
    }
}

