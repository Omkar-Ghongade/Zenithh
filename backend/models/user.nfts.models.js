import mongoose from 'mongoose';

const nftSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true,
    }
});

const NFT = mongoose.model('NFT', nftSchema);

export default NFT;