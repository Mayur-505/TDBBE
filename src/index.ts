import axios from "axios";
import cors from "cors";
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import QueryString from "qs";
import { createConnection } from "typeorm";
import { eBayConfig } from "./config/ebayConfig";
import { sqlConfig } from "./config/sql.config";
import routes from "./routes";

const qs = require('qs');

const app = express();
const port = process.env.PORT || 5004;

dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("staging server is up and running");
});

app.get('/authorize', (req, res) => {
    const params = QueryString.stringify({
        client_id: eBayConfig.appId,
        response_type: 'code',
        redirect_uri: 'http://localhost:5004/callback',
        scope: 'https://api.ebay.com/oauth/api_scope'
    });
    res.redirect(`https://auth.sandbox.ebay.com/oauth2/authorize?${params}`);
});

// Callback endpoint
app.get('/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code not found.');
    }

    try {
        const tokenResponse = await axios.post('https://api.sandbox.ebay.com/identity/v1/oauth2/token', QueryString.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:5004/callback'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${eBayConfig.appId}:${eBayConfig?.certId}`).toString('base64')}`
            }
        });

        // Handle token response
        console.log('Token response:', tokenResponse.data);
        res.send('Authorization code exchanged for access token.');
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

const errorHandler: any = (
    req: Request,
    res: Response,
    next: NextFunction,
    err: {
        statusCode: Number;
        message: String;
    }
) => {
    const statusCode: number = +err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message || "Internal Server Error",
            status: false,
        },
    });
};
app.use(errorHandler);

app.use('/api/v1', routes)

createConnection(sqlConfig).then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log("Server is running on port", port);
    });
}).catch((error) => {
    console.log(error);
});
