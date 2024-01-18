import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
interface Props {
  key: any;
  category: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventCard: React.FC<Props> = ({
  key,
  category,
  image,
  title,
  description,
  date,
  location,
}) => {
  return (
    <div className='h-500 m-4 flex w-80 flex-col rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-lg  bg-white'>
      <Image src={'/' + image} alt={title} width={350} height={200} />
      <h3 className='font-montserrat mt-4 justify-center px-0.5 text-center text-xl'>
        {' '}
        {/*Reduced header size from text text-2xl -> text-xl */}
        {title}
      </h3>
      <div className='mt-4 flex flex-row items-center'>
        <div className='ml-8 mr-4 flex flex-row items-center justify-center'>
          <img src={'calendar-icon.png'} />
          <p className='font-raleway ml-2 text-base'>{date}</p>
        </div>
        <div className='ml-8 mr-4 flex flex-row items-center justify-center'>
          <img src={'location-icon.png'} />
          <p className='font-raleway ml-2 text-base'>{location}</p>
        </div>
      </div>
      <p className='font-raleway ml-8 mr-4 mt-4 justify-center text-base'>
        {description}
      </p>
      <Button className='font-raleway mx-auto mb-4 mt-4 h-12 w-52 rounded-lg bg-orange text-base font-bold text-white'>
        View More
      </Button>
    </div>
  );
};

export default EventCard;
