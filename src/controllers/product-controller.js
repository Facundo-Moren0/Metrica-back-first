
import ProductModel,{valoraciones} from "../models/product-model.js";
import mongoose from "mongoose";
import { Preference } from "mercadopago";
import configureMercadoPago from "../helpers/MercadoPagoAccess.js";

export const getProducts = async (req,res)=>{
    try{
        const allProducts = await ProductModel.find();
        res.status(200).json({enviados:"enviados",allProducts});
    }
    catch(error){
        res.status(500).json({msg:"server" , error});
    }
};

export const getOneProduct = async (req,res)=>{
    try{
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
        const { nombre, imagen, marca, categoria, descripcion, precio, stock, imagenUrl } = req.body;

        if (!nombre || !marca || !categoria || !descripcion || !precio || !stock) {
            res.status(400).json({ msg: "Faltan datos" });
            return;
        }

        let imagenFileName;

        if (imagenUrl) {
            // Descargar la imagen desde la URL y guardarla localmente
            const response = await axios.get(imagenUrl, { responseType: 'arraybuffer' });
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            imagenFileName = `imagen-${uniqueSuffix}.jpg`; // Puedes ajustar la extensión según el formato de las imágenes

            // Guardar la imagen localmente
            fs.writeFileSync(path.join("uploads/", imagenFileName), response.data);
        }

        const newProduct = new ProductModel({
            nombre,
            imagen: imagenFileName || imagen, // Usa la imagen descargada o la proporcionada en el cuerpo de la solicitud
            marca,
            categoria,
            descripcion,
            precio,
            stock
        });

        await newProduct.save();
        res.status(200).json({ msg: "guardado" });
    } catch (error) {
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
        productToUpdate.puntaje = (puntajeTotal/productToUpdate.valoraciones.length).toFixed(1);

        await productToUpdate.save();

        res.status(200).json(productToUpdate);

    } catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
};

export const createPreference = async (req, res) => {
    try {
      const body = {
        items: [
          {
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://www.promiedos.com.ar",
          failure: "https://www.promiedos.com.ar",
          pending: "https://www.promiedos.com.ar",
        },
        auto_return: "approved",
      };

      const accessToken = "TEST-6870020866870358-011723-4f0bd55e0aa47487b827082ecd73d486-747036097"
  
      const preference = new Preference(configureMercadoPago(accessToken));
      const result = await preference.create({ body });
      res.json({
        id: result.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al crear la preferencia :(",
      });
    }
  };