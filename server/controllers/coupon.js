const Coupon = require('../models/coupon');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body;
        const coupon = await new Coupon({ name, expiry, discount }).save();
        res.json(coupon);
    } catch (error) {
        console.log('Error Creating New Coupon : ', error);
        res.status(400).send('Error Creating New Coupon');
    }
}

exports.list = async (req, res) => {
    try {
        const couponList = await Coupon.find({}).sort({createdAt: -1}).exec();
        res.json(couponList);
    } catch (error) {
        console.log('Error Fetching Sub Category List : ', error);
        res.status(400).send('Error Fetching Sub Category List');
    }
}

exports.remove = async (req, res) => {
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(req.params.couponId).exec();
        res.json(deleteCoupon);
    } catch (error) {
        console.log('Error Deleting Coupon : ', error);
        res.status(400).send('Error Deleting Coupon');
    }
}