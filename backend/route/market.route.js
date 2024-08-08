import express from 'express';
import { addtoMarket, transferOwnership, deletefromMarket, displayMarket } from '../controllers/market.controllers.js';

const router = express.Router();

router.post('/addtomarket', addtoMarket);
router.post('/transferownership', transferOwnership);
router.post('/deletefrommarket', deletefromMarket);
router.get('/displaymarket', displayMarket);

export default router;