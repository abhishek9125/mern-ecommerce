const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');

exports.saveUserCart = async (req, res) => {
    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

    if(cartExistByThisUser) {
        cartExistByThisUser.remove();
    }

    for( let i = 0; i < cart.length; i++) {
        let productObject = {};
        productObject.product = cart[i]._id;
        productObject.count = cart[i].count;
        productObject.color = cart[i].color;
        let { price } = await Product.findById(cart[i]._id).select('price').exec();
        productObject.price = price;
        products.push(productObject);
    }

    let cartTotal = 0;
    for( let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + (products[i].price * products[i].count);
    }

    let newCart = await new Cart({ products, cartTotal, orderedBy: user._id }).save();

    res.json({ ok: true, newCart })

}

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', "_id title price totalAfterDiscount")
    .exec();

    const { products, cartTotal, totalAfterDiscount } = cart;

    res.json({ products, cartTotal, totalAfterDiscount });
}