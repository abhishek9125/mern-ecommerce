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
        let productFromDb = await Product.findById(cart[i]._id).select('price').exec();
        productObject.price = productFromDb.price;
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

exports.emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
    res.json(cart);
}

exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate({ email: req.user.email }, { address: req.body.address }).exec();
    res.json({ ok: true, userAddress });
}


