import express from 'express';
import { NFTsOwnerShip } from '../controllers/user.nfts.controllers.js';

const router = express.Router();

router.post('/nfts', NFTsOwnerShip);

export default router;