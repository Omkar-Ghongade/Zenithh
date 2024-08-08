import mongoose from 'mongoose';

const marketsong = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

const market = mongoose.model('market', marketsong);

export default market;