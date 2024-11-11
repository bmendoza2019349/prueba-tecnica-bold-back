import {response, request } from "express";
import Product from "./products.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, category, brand, price, inventory, image, availability } = req.body;

        if (!name || !description || !category || !brand || !price || !inventory || !image || !availability) {
            return res.status(400).send("All fields are required.");
        }

        const nameUpper = name.toUpperCase();

        const existingProduct = await Product.findOne({ name: nameUpper });
        if (existingProduct) {
            return res.status(409).send("A product with this name already exists.");
        }

        const product = new Product({ name: nameUpper, description, category, brand, price, inventory, image, availability });

        await product.save();

        return res.status(201).send("Product added successfully.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
};

export const showProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res
        .status(200)
        .json(products);

    } catch (error) {
        return res
        .status(500)
        .send("Error retrieving products")
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send("The product does not exist");
        }

        return res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting product");
    }
};