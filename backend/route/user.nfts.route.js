import express from 'express';
import { uploadNFTs } from '../controllers/user.nfts.controllers.js';

const router = express.Router();

router.get('/nfts', uploadNFTs);

export default router;