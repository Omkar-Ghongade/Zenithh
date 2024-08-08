import express from 'express';
import { NFTsOwnerShip, myNFTs, incStreams } from '../controllers/user.nfts.controllers.js';

const router = express.Router();

router.post('/nfts', NFTsOwnerShip);
router.post('/mynfts', myNFTs);
router.post('/incstreams', incStreams);

export default router;