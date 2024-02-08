import mongoose from "mongoose";

const favoriteItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [favoriteItemSchema],
});

const FavoriteModel = mongoose.model("Favorite", favoriteSchema);

export default FavoriteModel;
