import NFT from '../models/user.nfts.models.js';
import song from '../models/all.songs.models.js';

export const test = (req, res) => {
    res.json({
        message: 'Hello from user nfts controller'
    });
}

export const NFTsOwnerShip = async (req, res) => {
    try {
        const { address, image, audio, name } = req.body;

        console.log('Address:', address);
        console.log('Image:', image);
        console.log('Audio:', audio);
        console.log('Name:', name);

        // Validate required fields
        if (!address || !image || !audio || !name) {
            return res.status(400).json({ message: 'Address, image, and audio are required fields' });
        }

        // Create a new NFT document
        const newNFT = new NFT({
            address,
            image,
            audio,
            name
        });


        // Save the NFT to the database
        await newNFT.save();

        const newSong = new song({
            name,
            image,
            audio
        });

        await newSong.save();

        // Respond with the saved NFT document
        res.status(201).json(newNFT);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while saving the NFT' });
    }
}
