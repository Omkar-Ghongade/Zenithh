import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';
import buyMusicImage from '../assets/buyMusic.jpg'; // Replace with the path to your buy music image
import sellMusicImage from '../assets/sellMusic.jpg'; // Replace with the path to your sell music image

export default function MarketPlace() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center md:flex-row justify-around mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card
          className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
        >
          <img src={buyMusicImage} alt="Buy Music" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              Buy Music
            </Typography>
            <Typography>
              Discover and purchase a wide variety of music available in the marketplace.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/marketplace/buy')}
            >
              Go to Buy Music
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
        >
          <img src={sellMusicImage} alt="Sell Music" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              Sell Music
            </Typography>
            <Typography>
              Upload your own music and sell it to a wide audience.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/marketplace/sell')}
            >
              Go to Sell Music
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
