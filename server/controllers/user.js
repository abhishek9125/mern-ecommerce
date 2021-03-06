const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
const uniqueid = require('uniqueid');

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

exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon }).exec();

    if(!validCoupon) {
        return res.json({ 
            error: 'Invalid Coupon'
        });
    }

    const user = await User.findOne({ email: req.user.email }).exec();
    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price')
    .exec();

    const totalAfterDiscount = (cartTotal - ((cartTotal * validCoupon.discount) / 100)).toFixed(2);

    const updatedCart = await Cart.findOneAndUpdate({ orderedBy: user._id, }, { totalAfterDiscount }, { new: true }).exec();

    res.json({ totalAfterDiscount });
}

exports.createOrder = async (req, res) => {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id }).populate('products.product').exec();

    const newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id
    }).save();

    let bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    })

    const updatedData = await Product.bulkWrite(bulkOption, {});

    res.json({ ok: true });
}

exports.createCashOrder = async (req, res) => {

    const { couponApplied } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();

    const userCart = await Cart.findOne({ orderedBy: user._id }).populate('products.product').exec();

    let finalAmount = 0;

    if(couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount * 100;
    } else {
        finalAmount = userCart.cartTotal * 100;
    }

    const newOrder = await new Order({
        products: userCart.products ,
        paymentIntent: {
            id: uniqueid(),
            amount: finalAmount,
            currency: 'INR',
            status: 'Cash On Delivery',
            created: Date.now(),
            payment_method_types: ['cash']
        },
        orderedBy: user._id,
        orderStatus: 'Cash On Delivery'
    }).save();

    let bulkOption = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    })

    const updatedData = await Product.bulkWrite(bulkOption, {});

    res.json({ ok: true });
}

exports.orders = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    const userOrders = await Order.find({ orderedBy: user._id }).populate('products.product').exec();
    res.json(userOrders);
}

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    await User.findOneAndUpdate({ email: req.user.email }, { $addToSet: { wishlist: productId } }).exec();
    res.json({ ok: true });
}

exports.wishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist').exec();
    res.json(list);
}

exports.removeToWishlist = async (req, res) => {
    const { productId } = req.params;
    await User.findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: productId } }).exec();
    res.json({ ok: true });
}