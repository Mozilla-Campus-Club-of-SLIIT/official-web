export interface Webinar {
  title: string
  Thumbnail: string
  description: string
  speaker: string
  videoCount: number
  link: string
  type: string
}

export const webinars: Webinar[] = [
  {
    title: "HashCode",
    Thumbnail: "https://img.youtube.com/vi/XfDgDRafa9A/maxresdefault.jpg",
    description:
      "Master the fundamentals of Google Hash Code and gain a strategic edge for your next programming competition.",
    speaker: "Uvindu Perera",
    videoCount: 2,
    link: "https://www.youtube.com/watch?v=XfDgDRafa9A&list=PLkWgPcG-GFhC5nuuifSjGzTlRlxYwArDv",
    type: "playlist",
  },
  {
    title: "Learn and Earn",
    Thumbnail: "https://img.youtube.com/vi/1xffza9FAO8/maxresdefault.jpg",
    description:
      "These quotes mean that hard work, generosity, and learning are key to success in life.",
    speaker: "Nadun Sandeepa",
    videoCount: 2,
    link: "https://www.youtube.com/watch?v=1xffza9FAO8&list=PLkWgPcG-GFhA2dobuzfv7I9C0goWJZ-We",
    type: "playlist",
  },
  {
    title: "Cyber Con",
    Thumbnail: "https://img.youtube.com/vi/TiEEzKgc5c0/maxresdefault.jpg",
    description:
      "How to prevent hacking and data breaches by using strong security practices, awareness, and continuous learning in technology.",
    speaker: "Sithira Hewaarachchi",
    videoCount: 3,
    link: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhD7F9fWJtQ5BgBhmOrixv5G",
    type: "playlist",
  },
  {
    title: "Introduction to Google Crowdsource",
    Thumbnail: "https://img.youtube.com/vi/bDyJM38wVb0/maxresdefault.jpg",
    description:
      "Crowdsource is a Google platform that lets users help improve Google services by training its algorithms.",
    speaker: "Geethmaka Dissanayake",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=bDyJM38wVb0&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX",
    type: "video",
  },
  {
    title: "Introduction to Neuralink ",
    Thumbnail: "https://img.youtube.com/vi/GITeoLvZ70I/maxresdefault.jpg",
    description:
      "Neuralink, founded by Elon Musk in San Francisco, develops implantable brain–machine interfaces for neurotechnology.",
    speaker: "Danuja Jayasuriya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=GITeoLvZ70I&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=2",
    type: "video",
  },
  {
    title: "Building and Deploying RESTful API with Go",
    Thumbnail: "https://img.youtube.com/vi/Gz4b2f7qwyg/maxresdefault.jpg",
    description: "",
    speaker: "",
    videoCount: 0,
    link: "",
    type: "video",
  },

  {
    title: "Getting started with WSL ",
    Thumbnail: "https://img.youtube.com/vi/FUczB6yMeP0/maxresdefault.jpg",
    description:
      "This video shows how to install WSL2, set it up with popular tools, and access Windows files through Linux.",
    speaker: "Sanuja Methmal",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=FUczB6yMeP0&list=PLkWgPcG-GFhC_3CLtupI4O4bvpNFWdBU2&index=2",
    type: "video",
  },
]
