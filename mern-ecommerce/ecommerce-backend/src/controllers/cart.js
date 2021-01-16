const Cart = require("../models/cart");
exports.addItemToCart = async (req, res) => {
  try {
    const oneCart = await Cart.findOne({ user: req.user._id });
    if (oneCart) {
      //if cart already exist then update the cart by quantity
      const product = req.body.cartItems.product;
      const isitemAdded = oneCart.cartItems.find((c) => c.product == product);
      let condition, update;
      if (isitemAdded) {
        condition = { user: req.user._id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isitemAdded.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      try {
        await Cart.findOneAndUpdate(condition, update);
        res.status(201).json({ message: "Cart  updated...!!!" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
    } else {
      try {
        //if cart dont exist then create a new cart
        const cart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItems],
        });
        await cart.save();
        res.status(201).json({ message: "Cart Added...!!!" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
