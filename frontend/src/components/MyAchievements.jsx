import React from 'react';
import { Typography } from '@material-tailwind/react';

export default function MyAchievements() {
  return (
    <div className="flex justify-center items-center w-full mt-6">
      <Typography variant="h4" className="mb-4 text-white text-center">
        My Achievements
      </Typography>
      {/* Add more achievement details here */}
    </div>
  );
}
