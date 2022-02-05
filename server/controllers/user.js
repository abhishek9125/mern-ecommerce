const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const slugify = require('slugify');

exports.userCart = async (req, res) => {
    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({{email: req.user.email }).exec();
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

    if(cartExistByThisUser) {
        cartExistByThisUser.remove();
    }

    for( let i = 0; i < cart.length; i++) {
        let productObject = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let { price } = await Product.findById(cart[i]._id).select('price').exec();
        object.price = price;
        products.push(productObject);
    }

    let cartTotal = 0;
    for( let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + (products[i].price * products[i].count);
    }

    let newCart = await new Cart({ products, cartTotal, orderedBy: user._id }).save();

    res.json({ ok: true })

}
