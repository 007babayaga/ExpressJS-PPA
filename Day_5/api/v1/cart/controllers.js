const { cartModel } = require("../../../Models/cartSchema");

const addToCartController = async(req, res) => {
    try {
        console.log("---------------Inside addToCartController-------")
        const { productId } = req.params;
        const { _id } = req.currentuser;

        const cartItem = await cartModel.findOne({
            "user": _id,
            "product": productId,
        })

        if (cartItem) {
            await cartModel.findOneAndUpdate(cartItem._id, {
                $inc: { cartQuantity: 1 }
            })
        }
        else {
            // Add item 
            await cartModel.create({
                user: _id,
                product: productId,
            });
        }
        const Allitems = await cartModel.find({
            "user": _id,
        })
            .populate("product")
            .lean();

        res.status(201).json({
            isSuccess: true,
            message: "Item added to cart SuccessFully",
            items: {
                data: Allitems
            }
        })
    }

    catch (err) {
        console.log("Error in addToCartController", err.message)
        res.status(500).json({
            isSuccess: false,
            message: "Server error in Adding Product"
        })
    }
}
const removeFromCartController = async (req, res) => {
    try {
        console.log("---------------Inside removeFromCartController-------")
        const { productId } = req.params;
        const { _id } = req.currentuser;

        const cartItem = await cartModel.findOne({
            "user": _id,
            "product": productId,
        })
        
        if (cartItem) {
            if (cartItem.cartQuantity > 1) {
                // decrease quantity
                await cartModel.findOneAndUpdate(
                    { _id: cartItem._id },
                    { $inc: { cartQuantity: -1 } }
                );
            } else {
                // quantity is 1 → remove item
                await cartModel.findOneAndDelete({ "_id": cartItem._id });
            }
        }
        else{
            res.status(400).json({
                isSuccess:false,
                message:"Item is not in the Cart"
            })
        }

        const Allitems = await cartModel.find({
            "user": _id,
        })
            .populate("product")
            .lean();

        res.status(200).json({
            isSuccess: true,
            message: "Item Removed form cart Successfully",
            items: {
                data: Allitems
            }
        })
    }
    catch (err) {
        console.log("Error in removeFromCartController", err.message)
        res.status(500).json({
            isSuccess: false,
            message: "Server error in Removing Product"
        })
    }
}
const deleteFromCartController = async (req, res) => {
    try {
        console.log("---------------Inside deleteFromCartController-------")
        const { CartItemId } = req.params;
        const { _id } = req.currentuser;

        await cartModel.findByIdAndDelete({
            "_id":CartItemId
        })
        
        const Allitems = await cartModel.find({
            "user": _id,
        })
            .populate("product")
            .lean();

        res.status(200).json({
            isSuccess: true,
            message: "Item Deleted from cart Successfully",
            items: {
                data: Allitems
            }
        })
    }
    catch (err) {
        console.log("Error in deleteFromCartController", err.message)
        res.status(500).json({
            isSuccess: false,
            message: "Server error in Deleting Product"
        })
    }
}
const getCartProductController = async (req, res) => {
    try {
        console.log("---------------Inside getCartProductController-------")
        const { _id } = req.currentuser;

        const Allitems = await cartModel.find({
            "user": _id,
        })
            .populate("product")
            .lean();

        res.status(200).json({
            isSuccess: true,
            message: "Item added to cart SuccessFully",
            items: {
                data: Allitems
            }
        })

    }
    catch (err) {
        console.log("Error in getCartProductController", err.message)
        res.status(500).json({
            isSuccess: false,
            message: "Server error in getting Product"
        })
    }
}
module.exports = { addToCartController, getCartProductController, removeFromCartController ,deleteFromCartController}