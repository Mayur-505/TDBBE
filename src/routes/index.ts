import express from 'express'
import Ebay from './ebayRoutes'

const routes = express.Router()

routes.use('/ebay', Ebay)

export default routes