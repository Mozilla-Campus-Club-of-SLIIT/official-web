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
    title: "Getting started with bootstrap",
    Thumbnail: "https://img.youtube.com/vi/DF2AVprXvkg/maxresdefault.jpg",
    description:
      "Learn the basics of Bootstrap and how to build simple, user-friendly web pages with great UX.",
    speaker: "Shehan Silva",
    videoCount: 3,
    link: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhBfp15nmhJRJYaPxuxg12Xz",
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
    description:
      "This video introduces Go, a statically typed programming language from Google, highlighting its syntax, concurrency features, and memory safety.",
    speaker: "Tharindu Balasooriya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=Gz4b2f7qwyg&t=505s",
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
  {
    title: "AI Bot Technology",
    Thumbnail: "https://img.youtube.com/vi/4MVQUVSGRRY/maxresdefault.jpg",
    description:
      "An AI chatbot (Artificial Intelligence chatbot) is a chatbot that's powered by artificial intelligence (AI).",
    speaker: "Shashika Kahatapitiya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=4MVQUVSGRRY&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=4",
    type: "video",
  },
  {
    title: "Emergence of Deepfake Technology",
    Thumbnail: "https://img.youtube.com/vi/pJ9XbMcHiuA/maxresdefault.jpg",
    description:
      "This video explains what deepfakes are, how deep learning is used to create them, and their real-world applications beyond fake videos.",
    speaker: "Pasindu Bandara",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=pJ9XbMcHiuA&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=5",
    type: "video",
  },
  {
    title: "Java Scripts",
    Thumbnail: "https://img.youtube.com/vi/MbXFm2wfjLY/maxresdefault.jpg",
    description:
      "This video introduces JavaScript, covering its basics, syntax, and key features for building dynamic web applications.",
    speaker: "Chamathka Ariyarathna",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=MbXFm2wfjLY&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=6",
    type: "video",
  },
  {
    title: "New Technological Trends",
    Thumbnail: "https://img.youtube.com/vi/LmdpDTDJbec/maxresdefault.jpg",
    description:
      "This video explores how rapidly evolving technology and COVID-19 have changed the role of IT professionals in today’s contactless world.",
    speaker: "K.D. Divya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=LmdpDTDJbec&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=7",
    type: "video",
  },
  {
    title: "Raspberry Pi for Computer Vision",
    Thumbnail: "https://img.youtube.com/vi/tb4znRmig0U/maxresdefault.jpg",
    description:
      "This video introduces Raspberry Pi, a small single-board computer designed to teach computer science and enable practical projects.",
    speaker: "Saluka Udbhasa",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=tb4znRmig0U",
    type: "video",
  },
  {
    title: "Quick Guide to Quine",
    Thumbnail: "https://img.youtube.com/vi/mNP35Ey35ZQ/maxresdefault.jpg",
    description:
      "This video shows how to set up a Quine account and explore repositories quickly on this user-friendly platform.",
    speaker: "David Butler ",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=mNP35Ey35ZQ",
    type: "video",
  },
]
