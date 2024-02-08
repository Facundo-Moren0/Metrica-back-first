import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
    },
    role: {
        type: String,
        default: "user", // Por defecto, el rol es "user"
        enum: ["user", "admin"] // Para restringir los roles posibles
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);