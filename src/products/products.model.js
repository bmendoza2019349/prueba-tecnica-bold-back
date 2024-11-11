import mongoose, { mongo } from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    availability: {
        type: String,
        required: true,
        enum: ["DISPONIBLE", "EN CAMINO", "AGOTADO"]
    }
})

export default mongoose.model('Product', ProductSchema);