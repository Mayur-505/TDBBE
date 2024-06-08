import express from 'express'
import { createStore, getStores } from '../controllers/ebayStore/Store'
import { generateToken } from '../controllers/ebayStore/generateToken'

const routes = express.Router()

routes.get('/getAccessToken', generateToken)
routes.get('/getStores/:storeName', getStores)
routes.post('/createPost', createStore)

export default routes