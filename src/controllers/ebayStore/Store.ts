import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../../entities/tbl_store";
import { createStoreOnEbay, getStoreByName, getStoreDetailsFromEbay } from "../../services/EbayService";
import { RoutesHandler } from "../../utils/ErrorHandler";
import { ResponseCodes } from "../../utils/response-codes";

export const createStore = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const storeDetails = req.body;

        if (!accessToken) {
            return RoutesHandler.sendError(res, req, 'Unauthorized: Access token is missing', ResponseCodes.saveError);
        }

        const newStore = await createStoreOnEbay(storeDetails, accessToken);

        const storeRepository = getRepository(Store);
        const store = storeRepository.create({ storeName: newStore.storeName, ownerId: newStore.ownerId });
        await storeRepository.save(store);

        return RoutesHandler.sendSuccess(res, req, newStore, ResponseCodes.success);
    } catch (error: any) {
        console.log(error);

        return RoutesHandler.sendError(res, req, error, ResponseCodes.serverError);
    }
};

export const getStoreDetails = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';
        const storeDetails = await getStoreDetailsFromEbay(accessToken);
        res.json(storeDetails);
    } catch (error) {
        res.status(500).send('Error fetching store details');
    }
};

export const getStores = async (req: Request, res: Response) => {
    try {
        const { storeName } = req.params;
        const stores = await getStoreByName();
        res.json(stores);
    } catch (error) {
        res.status(500).send(error);
    }
}