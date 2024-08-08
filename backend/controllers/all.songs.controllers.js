import song from '../models/all.songs.models.js';

export const test = (req, res) => {
    res.json({
        message: 'Hello from all songs controller'
    });
}

export const allSongs = async (req, res) => {
    try {
        const songs = await song.find();

        res.status(200).json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching all songs' });
    }
}

