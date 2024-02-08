// cart-controller.js
import CartModel from "../models/cart-model.js";
import ProductModel from "../models/product-model.js";
import mongoose from "mongoose";

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await CartModel.findOne({ user: userId }).populate({
            path: "items.product",
            model: "Product",
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor", error });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.params;

        const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

        if (!isValidUserId || !isValidProductId || isNaN(quantity) || quantity < 1) {
            return res.status(400).json({ msg: "Parámetros inválidos" });
        }

        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        console.log(product)
        const {nombre,imagen,precio} = product;

        console.log(imagen + "------")
        let cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            cart = new CartModel({ user: userId, items: [{product: productId, quantity: parseInt(quantity),nombre,imagen,precio}] });
        }
        
        const existingItem = cart.items.find((item) => item.product.equals(productId));

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.items.push({ product: productId, quantity: parseInt(quantity),nombre,imagen,precio});
        }
        cart.items.push({ product: productId, quantity: parseInt(quantity),nombre,imagen,precio});
        console.log(cart)
        //await cart.save();

        res.status(200).json({ msg: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor pa", error });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

        if (!isValidUserId || !isValidProductId) {
            return res.status(400).json({ msg: "Parámetros inválidos" });
        }

        const cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: "Carrito no encontrado" });
        }

        cart.items = cart.items.filter((item) => !item.product.equals(productId));
        await cart.save();

        res.status(200).json({ msg: "Producto eliminado del carrito", cart });
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor", error });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const isValidUserId = mongoose.Types.ObjectId.isValid(userId);

        if (!isValidUserId) {
            return res.status(400).json({ msg: "Parámetros inválidos" });
        }

        const cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: "Carrito no encontrado" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ msg: "Carrito limpiado", cart });
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor", error });
    }
};
