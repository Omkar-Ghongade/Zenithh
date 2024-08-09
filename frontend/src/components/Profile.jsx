import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';
import myStreamsImage from '../assets/myStreams.jpg'; // Replace with your image path
import myMusicImage from '../assets/myMusic.jpg'; // Replace with your image path
import myAchievementsImage from '../assets/myAchievements.jpg'; // Replace with your image path

export default function Profile() {
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
          <img src={myStreamsImage} alt="My Streams" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              My Streams
            </Typography>
            <Typography>
              View and manage your streams.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/profile/streams')}
            >
              Go to My Streams
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
        >
          <img src={myMusicImage} alt="My Music" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              My Music
            </Typography>
            <Typography>
              View and manage your music collection.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/profile/music')}
            >
              Go to My Music
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="w-80 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 rounded-lg"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
        >
          <img src={myAchievementsImage} alt="My Achievements" className="h-48 w-full object-cover rounded-lg" />
          <CardBody>
            <Typography variant="h3" className="mb-2 text-white">
              My Achievements
            </Typography>
            <Typography>
              View your achievements.
            </Typography>
          </CardBody>
          <CardFooter>
            <Button
              color="blue"
              variant="filled"
              className="w-full bg-purple-700 hover:bg-purple-950"
              onClick={() => handleNavigation('/profile/achievements')}
            >
              Go to My Achievements
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
