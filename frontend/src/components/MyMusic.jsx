import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

export default function MyMusic() {
  const [market, setMarket] = useState([]);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const user = await window.fewcha.account();
        const userAddress = user.data.address;
        const res = await fetch('http://localhost:3000/market/mymarket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: userAddress,
          }),
        });
        const data = await res.json();
        console.log(data);
        setMarket(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarket();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
      <Typography variant="h4" className="mb-4 text-white col-span-full text-center">
        My Music
      </Typography>
      {market.map((item) => (
        <Card key={item._id} className="h-96 w-68 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}>
          <CardBody>
            <Typography variant="h5" className="mb-2 text-white">
              {item.name}
            </Typography>
            <Typography className="text-sm text-gray-400 mt-2">
              Cost: {item.cost} ETH
            </Typography>
            <audio controls className="mt-4 w-full">
              <source src={item.audiolink} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
