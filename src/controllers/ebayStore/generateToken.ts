import { Request, Response } from "express";
import { getAccessToken } from "../../services/EbayService";
import { RoutesHandler } from "../../utils/ErrorHandler";
import { ResponseCodes } from "../../utils/response-codes";
const EbayAuthToken = require('ebay-oauth-nodejs-client');

const ebayAuthToken = new EbayAuthToken({
    clientId: 'DevTest-devTest-SBX-d73448ebb-9d76cdba',
    clientSecret: 'SBX-73448ebba131-b4ea-4708-a6f9-4c33',
    redirectUri: 'http://localhost:3000',
});

export const generateToken = async (req: Request, res: Response) => {
    try {
        // const token = await generateAccessToken();

        // if (!token) {
        //     return RoutesHandler.sendError(res, req, 'Something Went Wrong', ResponseCodes.serverError)
        // }


        let token = await getAccessToken('https://api.ebay.com/oauth/api_scope	');

        return RoutesHandler.sendSuccess(res, req, token, ResponseCodes.success)
    } catch (error) {
        console.log(error);
        return RoutesHandler.sendError(res, req, error, ResponseCodes.serverError)
    }
}