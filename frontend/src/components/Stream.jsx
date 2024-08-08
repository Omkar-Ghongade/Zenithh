import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';
import streamMusicImage from '../assets/streammusic.jpg';
import uploadMusicImage from '../assets/bg3.avif';

export default function Stream() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center md:flex-row justify-around mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}>
          <img src={streamMusicImage} alt="Stream Music" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              Stream Music
            </Typography>
            <Typography>
              Access a wide variety of music to stream. Enjoy endless hours of music from different genres and artists.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/stream/music')}
            >
              Go to Stream Music
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)'}}>
          <img src={uploadMusicImage} alt="Upload Music" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              Upload Music
            </Typography>
            <Typography>
              Upload your own music to share with the world. Easily upload your tracks and reach a larger audience.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950 "
              onClick={() => handleNavigation('/stream/upload')}
            >
              Go to Upload Music
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}