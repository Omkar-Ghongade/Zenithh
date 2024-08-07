import express from 'express';
import { allSongs } from '../controllers/all.songs.controllers.js';

const router = express.Router();

router.get('/allsongs', allSongs);

export default router;