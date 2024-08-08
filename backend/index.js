import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userNFT from './route/user.nfts.route.js'
import songs from './route/all.songs.route.js'
import market from './route/market.route.js';

dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('DB is connected');
}).catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.use(express.json());
app.use(cors());

app.use('/user', userNFT);
app.use('/songs', songs);
app.use('/market', market);