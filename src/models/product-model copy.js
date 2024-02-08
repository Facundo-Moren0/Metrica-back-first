import mongoose from "mongoose";

export const valoraciones = mongoose.Schema(
    {
        nombre: { type: String, required: true },
        puntaje: { type: Number, required: true },
        user: {
            type: String,
            required: true,

        }
    },
    {
        timestamps: true

    }
);

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    valoraciones: [valoraciones],
    puntaje: {
        type: Number,
        default: 0,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },


},
    {
        timestamps: true

    });


const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;