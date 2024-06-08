import { Request, Response } from "express";
import { createProduct, createProductOnEbay, getProductDetailsFromEbay, getProducts, sellProductOnEbay } from "../../services/EbayService";

export const createProductHandler = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const productDetails = req.body;
        const newProduct = await createProductOnEbay(productDetails, accessToken);
        const product = await createProduct({ ...newProduct, storeId: req.body.storeId });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send('Error creating product');
    }
};

export const getProductDetailsHandler = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const { productId } = req.params;
        const productDetails = await getProductDetailsFromEbay(productId, accessToken);
        res.json(productDetails);
    } catch (error) {
        res.status(500).send('Error fetching product details');
    }
};

export const getProductsHandler = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
};

export const sellProductHandler = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const saleDetails = req.body;
        const saleResponse = await sellProductOnEbay(saleDetails, accessToken);
        res.json(saleResponse);
    } catch (error) {
        res.status(500).send('Error selling product');
    }
};