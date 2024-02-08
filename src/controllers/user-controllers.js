import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../helpers/token-generator.js';
import { sendMailFromSmtp } from '../helpers/send-mail-from-smtp.js';
import mongoose from 'mongoose';
import FavoriteModel from '../models/favorite-model.js';

export const register = async (req, res) => {
    const { email, password, username, role } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role: role || 'user',
        });

        const userSaved = await newUser.save();
        const token = await createToken({ id: userSaved._id, role: userSaved.role });

        res.cookie('token', token, { httpOnly: false });

        sendMailFromSmtp(userSaved.email);

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: "Credenciales Invalidas" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "El Usuario o la Contraseña son incorrectos" });

        const token = await createToken({ id: userFound._id, role: userFound.role , email:userFound.email , nombre:userFound.username, avatar:userFound.avatar});

        res.status(200).cookie('token', token, { httpOnly: false });

        
        res.status(200).json( {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const id = req.params.id;
    const userFound = await User.findById(id)

    if (!userFound) return res.status(400).json({ message: "Usuario Inexistente" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const updateUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                username,
                email,
                password: password ? await bcrypt.hash(password, 10) : undefined,
                role,
            },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.status(200).json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await FavoriteModel.findOne({ user: userId }).populate({
            path: "items.product",
            model: "Product",
        });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor", error });
    }
};

export const addToFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
        const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

        if (!isValidUserId || !isValidProductId) {
            return res.status(400).json({ msg: "Parámetros inválidos" });
        }

        let favorite = await FavoriteModel.findOne({ user: userId });

        if (!favorite) {
            favorite = new FavoriteModel({ user: userId, items: [] });
        }

        const existingItem = favorite.items.find((item) => item.product.equals(productId));

        if (!existingItem) {
            favorite.items.push({ product: productId });
        }

        await favorite.save();

        res.status(200).json({ msg: "Producto agregado a favoritos", favorite });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ msg: "IDs inválidos" });
        }

        res.status(500).json({ msg: "Error del servidor", error });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "ID de usuario no válido" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error });
    }
};
