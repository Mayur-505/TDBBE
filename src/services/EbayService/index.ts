import axios from "axios";
import qs from 'qs';
import { eBayConfig } from "../../config/ebayConfig";
const fs = require('fs');
const path = require('path');

export const generateAccessToken = async () => {
    try {
        const clientId = eBayConfig.appId;
        const clientSecret = eBayConfig.certId;
        const endpoint = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token';

        const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}`,
        };

        const body = qs.stringify({
            grant_type: 'client_credentials',
            scope: ['https://api.ebay.com/oauth/api_scope', 'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly']
        });

        console.log("+++++++++++++++++++++++++++++", body);
        const response = await axios.post(endpoint, body, { headers });

        return response.data;
    } catch (error) {
        return error
    }
}

export const getAccessToken = async (scope: any) => {
    try {
        const clientId = eBayConfig.appId;
        const clientSecret = eBayConfig.certId;
        const base64Credentials = btoa(`${clientId}:${clientSecret}`)

        console.log("+++++++++++", base64Credentials);


        const endpoint = 'https://api.ebay.com/identity/v1/oauth2/token';

        const headers = {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const body = qs.stringify({
            grant_type: 'client_credentials',
            scope: scope,
        })

        const tokenResponse = await axios.post(endpoint, body, { headers });

        const tokenData = {
            access_token: tokenResponse.data.access_token,
            expires_in: tokenResponse.data.expires_in,
            obtained_at: Date.now()
        };

        return tokenData;
    } catch (error) {
        return error
    }
}

export function isTokenValid(tokenData: any) {
    const { access_token, expires_in, obtained_at } = tokenData;
    const expirationTime = obtained_at + (expires_in * 1000);
    return Date.now() < expirationTime;
}

export function getStoredToken(tokenData: any) {
    if (tokenData !== null) {
        if (isTokenValid(tokenData)) {
            return tokenData.access_token;
        }
    }
    return null;
}

export const getStoreByName = async () => {
    try {
        const scope = ['https://api.ebay.com/oauth/api_scope/sell.stores']
        const accessToken: any = await getAccessToken(scope);

        const endpoint = `https://api.ebay.com/sell/stores/v1/store`;

        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken?.access_token}`,
                'Accept': 'application/json',
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json',
                'Content-Language': 'en-US'
            }
        });

        if (!response.data) {
            return 'Store not found';
        }

        return response.data;
    } catch (error: any) {
        return error;
    }
};

export const createStoreOnEbay = async (storeDetails: any, accessToken: string) => {
    const endpoint = 'https://api.sandbox.ebay.com/sell/account/v1/create_store';  // Hypothetical correct endpoint

    const payload = {
        storeName: storeDetails.storeName,
        description: storeDetails.description,
        subscriptionLevel: storeDetails.subscriptionLevel,
        logo: storeDetails.logo,
        location: storeDetails.location,
    };

    try {
        const response = await axios.post(endpoint, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("response.data", response.data);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Log the error response for debugging
            console.error(`Error response from eBay: ${error.response.status} - ${error}`);
        }
        throw new Error(`Failed to create store on eBay: ${error.response ? error : error}`);
    }
};

export const getStoreDetailsFromEbay = async (accessToken: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        // const response = await axios.get(`https://api.sandbox.ebay.com/stores/v1/store`, { headers });
        const response = await axios.get(`https://api.sandbox.ebay.com/sell/stores/v1/store`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching store details from eBay:', error);
        throw error;
    }
};

export const createProductOnEbay = async (productDetails: any, accessToken: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.post(`https://api.sandbox.ebay.com/inventory/v1/inventory_item`, productDetails, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating product on eBay:', error);
        throw error;
    }
};

export const getProductDetailsFromEbay = async (productId: string, accessToken: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`https://api.sandbox.ebay.com/inventory/v1/inventory_item/${productId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching product details from eBay:', error);
        throw error;
    }
};

export const sellProductOnEbay = async (saleDetails: any, accessToken: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.post(`https://api.sandbox.ebay.com/sell/v1/order`, saleDetails, { headers });
        return response.data;
    } catch (error) {
        console.error('Error selling product on eBay:', error);
        throw error;
    }
};

export const createProduct = async (productDetails: any) => {
    try {
        //   const productRepository = getRepository(Product);
        //   const product = productRepository.create(productDetails);
        //   await productRepository.save(product);
        return [];
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        //   const productRepository = getRepository(Product);
        // await productRepository.find();
        return []
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};