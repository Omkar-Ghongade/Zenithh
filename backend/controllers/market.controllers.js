import market from '../models/marketplace.models.js';
import song from '../models/all.songs.models.js';

export const addtoMarket = async (req, res) => {
    try {
        const { name, audio, address, cost } = req.body;
        const newMarket = new market({
            name,
            audio,
            address,
            cost,
        });
        console.log(newMarket);
        await newMarket.save();
        res.status(201).json({ newMarket });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const transferOwnership = async (req, res) => {
    try{
        const {name, address, nAddress} = req.body;
        const songData = await song.findOne({name, address});
        songData.address = nAddress;
        await songData.save();
        res.status(201).json({songData});
    }catch(error){

    }
}

export const displayMarket = async (req, res) => {
    try{
        const display = await market.find();
        res.status(200).json(display);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const myMarket = async (req, res) => {
    try{
        const {address} = req.body;
        const display = await market.find({address});
        res.status(200).json(display);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}