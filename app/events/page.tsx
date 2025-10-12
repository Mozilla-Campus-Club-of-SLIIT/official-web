import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Youtube, Mic, LucideIcon } from "lucide-react"

type Event = {
  title: string
  image: string
  date: string
  time: string
  location: string
  url: string
  urlLabel: string
  urlIcon: LucideIcon
  description: string
}

// upcoming events
const events: Partial<Event>[] = [
  {
    title: "Code N' Coffee Podcast",
    date: "Ongoing LIVE on YouTube",
    url: "https://youtube.com/playlist?list=PLkWgPcG-GFhB3sSAf7dzUs_F3dQ19ihXR&si=aGi9UGwc3KmNcIHT",
    urlLabel: "Catch the podcast!",
    urlIcon: Mic,
    description:
      "Code N' Coffee, is a series of byte-sized tech content aimed at Computer Science students presented to you by The Mozilla Campus Club of SLIIT. Don't miss out on the Tech insights and the latest of the tech and privacy world.",
    location: "Youtube - @sliitmozilla",
    time: "Every Week",
  },
  {
    title: "Open Source Contribution Day",
    date: "TBD",
    description:
      "Join us for a day of contributing to open source projects to celebrate the wonder and beauty of Open-Source Software on Open Source Contribution Day!",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "Hola Mozilla!",
    date: "April 2025",
    description:
      "Hola Mozilla is the Orientation program for the Mozilla Campus Club of SLIIT. This event is specially focused on the new members of the club to get to know about the club and its activities.",
    location: "TBD",
    time: "TBD",
  },
  /*{
    title: "Tech Talk: Future of Web",
    date: "July 15, 2025",
    description: "Industry experts discuss the future of web technologies",
    location: "SLIIT - Conference Hall",
    time: "2:00 PM - 4:00 PM",
  },*/
]

// past events data
const pastEvents: Partial<Event>[] = [
  {
    title: "Inroduction to OWASP Top 10",
    image: "/assets/OWASPTop10.png",
    url: "https://www.youtube.com/live/2xSr_IZGrFk?si=bUST_M5IuJa9xt9w",
    description:
      "The 1st live tech session conducted by Heshan Kariyawasam.Learn about the most critical web application vulnerabilities and how to protect your applications! A deep dive into the OWASP Top 10, strengthening your security knowledge and helping you build safer applications. Organized by the Mozilla Campus Club of SLIIT.",
  },
  {
    title: "Bashaway 2024",
    image: "/assets/bashaway.jpg",
    url: "https://www.facebook.com/share/p/1BGnzvHnXn/?mibextid=oFDknk",
    urlLabel: "Check out the gallery!",
    description:
      "The 3rd iteration of Bashaway, an Inter-University Scripting competition organized by the SLIIT FOSS Community in collaboration with Mozilla Campus Club of SLIIT, SLIIT Women in FOSS, and Software Engineering Student Community was held in October 2024.",
  },
  {
    title: "Intro to Assembly Programming",
    image: "/assets/3.png",
    url: "https://www.youtube.com/watch?v=p3pAHNgymXA",
    description:
      "The 3rd live tech session conducted by Seniru Pasan. Dive into the world of low-level programming! Exploring the fundamentals that power your devices, demystifying how software speaks to hardware.",
  },
  {
    title: "Utilizing AntDesign for quick UI Development",
    image: "/assets/2.png",
    url: "https://www.youtube.com/watch?v=qfFaOkHoRVM",
    description:
      "The 2nd live tech session conducted by Russell Peiris. A session focusing on frontend and building clean and neat UIs",
  },
  {
    title: "Intro to Swift & SwiftUI",
    image: "/assets/1.png",
    url: "https://www.youtube.com/watch?v=QZinHA1r4w0",
    description:
      "The 1st live tech session conducted by Nowen Kottage. Dive into iOS Development with the Introduction to Swift & SwiftUI: A sneak peek into UIKit!",
  },
]

export default function Events() {
  const getEventLinkText = (url?: string, label?: string, UrlIcon?: LucideIcon) => {
    if (!url) return null
    const icon = UrlIcon ? (
      <UrlIcon className="mr-1 w-4 h-4" />
    ) : url.includes("youtube.com") ? (
      <Youtube className="mr-1 w-4 h-4" />
    ) : (
      <ExternalLink className="mr-1 w-4 h-4" />
    )

    const labelText = label || (url.includes("youtube.com") ? "Watch the session!" : "Check out!")

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center mt-3">
        {icon}
        {labelText}
      </a>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Upcoming Events Section */}
        <h1 className="text-4xl font-bold text-center mb-12">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-orange-600 mb-4">{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 {event.location}</p>
                  <p>🕒 {event.time}</p>
                  {getEventLinkText(event.url, event.urlLabel, event.urlIcon)}
                </div>
                {/* <Button className="w-full mt-4">Register Now!</Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Past Events Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((pastEvent, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Event Image */}
                <img
                  src={pastEvent.image}
                  alt={pastEvent.title}
                  className="w-full h-48 object-cover"
                />
                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-orange-600">{pastEvent.title}</h3>
                  <p className="text-gray-600">{pastEvent.description}</p>
                  {getEventLinkText(pastEvent.url, pastEvent.urlLabel, pastEvent.urlIcon)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.youtube.com/@sliitmozilla"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block font-medium text-primary group no-underline 
                 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:bg-current 
                 after:w-0 after:transition-[width] after:duration-300 hover:after:w-full"
          >
            Check out our past live sessions on YouTube!
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
