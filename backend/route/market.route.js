import express from 'express';
import { addtoMarket, transferOwnership, displayMarket, myMarket } from '../controllers/market.controllers.js';

const router = express.Router();

router.post('/addtomarket', addtoMarket);
router.post('/transferownership', transferOwnership);
router.get('/displaymarket', displayMarket);
router.post('/mymarket', myMarket);


export default router;