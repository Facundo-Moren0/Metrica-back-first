import ProductModel from "../models/product-model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        res.status(200).json({ enviados: "enviados", allProducts });
    }
    catch (error) {
        res.status(500).json({ msg: "server", error });
    }
};

export const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id_prod;

        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) {
            console.log(isValidId)
            return res.status(400).json({ msg: "Producto no encontrado" });
        };
        console.log(isValidId)

        const product = await ProductModel.findOne({ _id: id });

        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
};


export const setProduct = async (req, res) => {
    try {
        const { nombre, imagen, marca, categoria, descripcion, precio, stock } = req.body;
        if (!nombre || !imagen || !marca || !categoria || !descripcion || !precio || !stock) {
            res.status(500).json({ msg: "Faltan datos" });
            return;
        };

        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(200).json({ msg: "guardado" });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { nombre, imagen, marca, categoria, descripcion, precio, stock } = req.body;

        if (!nombre || !imagen || !marca || !categoria || !descripcion || !precio || !stock) {
            res.status(500).json({ msg: "Faltan datos" });
            return;
        };

        const udProd = await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.status(200).json({ msg: "Actualizado", udProd });

    } catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const udProd = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "eliminado" });

    } catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
};

export const valorate = async (req, res) => {
    try {
        const { id_user, id_prod } = req.params;
        let puntajeTotal = 0;

        const productToUpdate = await ProductModel.findById(id_prod);

        productToUpdate.valoraciones.push(req.body);

        productToUpdate.valoraciones.forEach(value => {
            puntajeTotal += value.puntaje;
        });
        productToUpdate.puntaje = (puntajeTotal / productToUpdate.valoraciones.length);

        await productToUpdate.save();

        res.status(200).json(productToUpdate);

    } catch (error) {
        res.status(500).json({ msg: "server error", error });
    }

};