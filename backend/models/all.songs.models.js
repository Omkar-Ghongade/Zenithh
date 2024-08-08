import mongoose from 'mongoose';

const Songs = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    streams: {
        type: Number,
        default: 0
    }
});

const song = mongoose.model('song', Songs);

export default song;