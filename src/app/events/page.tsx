import React from 'react';
import { Button } from '@/components/ui/button';
import eventData from '@/data/events.json';
import EventCard from '@/components/event-card';

interface Event {
  id: number;
  category: string;
  image: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

function Page() {
  //filtering
  const upcomingEvents: Event[] = eventData?.eventData?.filter(
    (event: Event) => event.category === 'upcomingevent'
  );

  const pastEvents: Event[] = eventData?.eventData?.filter(
    (event: Event) => event.category === 'pastevent'
  );

  const webinar: Event[] = eventData?.eventData?.filter(
    (event: Event) => event.category === 'pastevent'
  );
  return (
    <div>
      {/*This style is added for the body element remove it once added to global css*/}
      <style>
        {` 
        body {
          margin: 0;
          padding: 0;
          background-color: #F5F5F5;
          height: 100%;
          width: 100%;
        }
      `}
      </style>
      <h1 className='font-montserrat mb-4 mt-8 justify-center text-center text-7xl font-bold text-orange'>
        Upcoming Events
      </h1>

      {upcomingEvents !== undefined ? (
        <div className='flex flex-row flex-wrap items-center justify-center'>
          {upcomingEvents?.map((event: Event) => (
            <EventCard
              key={event.id}
              category={event.category}
              image={event.image}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      ) : (
        <h4 className='font-raleway justify-center text-center text-2xl'>
          No Events At This Moment. Follow Us To Get Updates.
        </h4>
      )}
      <h2 className='text-black font-montserrat mb-4 mt-8 justify-center text-center text-5xl font-bold'>
        Past Events
      </h2>
      {pastEvents !== undefined ? (
        <div className='flex flex-row flex-wrap items-center justify-center'>
          {pastEvents?.map((event: Event) => (
            <EventCard
              key={event.id}
              category={event.category}
              image={event.image}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      ) : (
        <h4 className='font-raleway justify-center text-center text-2xl'>
          No Events At This Moment. Follow Us To Get Updates.
        </h4>
      )}
      <h2 className='text-black font-montserrat mb-4 mt-8 justify-center text-center text-5xl font-bold'>
        Webinars
      </h2>
      {webinar !== undefined ? (
        <div className='flex flex-row flex-wrap items-center justify-center'>
          {webinar?.map((event: Event) => (
            <EventCard
              key={event.id}
              category={event.category}
              image={event.image}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      ) : (
        <h4 className='font-raleway justify-center text-center text-2xl'>
          No Events At This Moment. Follow Us To Get Updates.
        </h4>
      )}
    </div>
  );
}

export default Page;
