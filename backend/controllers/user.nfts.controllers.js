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

        const stream=0;

        const newSong = new song({
            name,
            image,
            audio,
            stream,
        });

        await newSong.save();

        // Respond with the saved NFT document
        res.status(201).json(newNFT);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while saving the NFT' });
    }
}

export const myNFTs = async (req, res) => {
    try {
        // Fetch NFTs from the database
        const nfts = await NFT.find({address: req.body.address});

        // Respond with the NFTs
        res.json(nfts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching NFTs' });
    }
}

export const incStreams = async (req, res) => {
    try{
        const {name} = req.body;
        const song = await song.findOne({name: name});
        const nft = await NFT.findOne({name: name});
        song.streams += 1;
        nft.streams += 1;
        await nft.save();
        await song.save();
        res.json(song);
    }catch(err){
        console.log(err);
    }
}