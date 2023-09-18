const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Orders = require("./../../model/orders/orderModel");
const Products = require("./../../model/products/productModel");
const catchAsync = require("./../../handlers/handleAsyncErr");
const factory = require("./../../handlers/handleFactory");
const AppError = require("./../../utils/appError");
const { ENV, ENVS } = require("./../../utils/constants");


exports.getOrders = factory.getAll(Orders);
exports.getOrder = factory.getOne(Orders);

exports.checkoutSession = catchAsync(async (req, res, next) => {
    const user = req.user.id;
    const products = req.body.products;
    const line_items = [];
    let amount = 0;

    for(const product of products){
        let productObj = await Products.findById(product);

        if (!productObj) next(new AppError(`No product found od id ${product}`, 404));

        const {id, name, price, description, imageCover } = productObj;

        const existingItem = line_items.findIndex(item => {
            return item.name === name;
        });

        if (existingItem >= 0){
            line_items[existingItem].quantity += 1;
        }else{
            const images = (ENV === ENVS[0])
                ? [`${req.protocol}://${req.get('host')}/${imageCover}`]
                : undefined;

            line_items.push({
                price_data:{
                    currency: 'inr',
                    unit_amount: price * 100,
                    product_data:{
                        name,
                        description,
                        images,
                    }
                },
                quantity: 1,
            });
        }

        amount += price;
    }

    const order = await Orders.create({
        user,
        products,
        amount
    });

    if (!order) return next(new AppError('Failed to create an order', 400));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode:'payment',
        success_url: `${req.protocol}://${req.get('host')}`,
        cancel_url: `${req.protocol}://${req.get('host')}`,
        customer_email:req.user.email,
        client_reference_id: order.id,
        line_items
    });

    if (!session) {
        await Orders.findByIdAndDelete(order.id);
        return next(new AppError('Failed to create checkout session', 400));
    }

    res.status(200).json({
       status:'success',
       message:'Successfully created order',
       session
    });

});
