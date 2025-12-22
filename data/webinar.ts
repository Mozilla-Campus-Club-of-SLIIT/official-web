const getThumbnailUrl = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

export interface Webinar {
  title: string
  thumbnail: string
  description: string
  speaker: string
  videoCount: number
  link: string
  type: string
}

export const webinars: Webinar[] = [
  {
    title: "HashCode",
    thumbnail: getThumbnailUrl("XfDgDRafa9A"),
    description:
      "Master the fundamentals of Google Hash Code and gain a strategic edge for your next programming competition.",
    speaker: "Uvindu Perera",
    videoCount: 2,
    link: "https://www.youtube.com/watch?v=XfDgDRafa9A&list=PLkWgPcG-GFhC5nuuifSjGzTlRlxYwArDv",
    type: "playlist",
  },
  {
    title: "Learn and Earn",
    thumbnail: getThumbnailUrl("1xffza9FAO8"),
    description:
      "These quotes mean that hard work, generosity, and learning are key to success in life.",
    speaker: "Nadun Sandeepa",
    videoCount: 2,
    link: "https://www.youtube.com/watch?v=1xffza9FAO8&list=PLkWgPcG-GFhA2dobuzfv7I9C0goWJZ-We",
    type: "playlist",
  },
  {
    title: "Cyber Con",
    thumbnail: getThumbnailUrl("TiEEzKgc5c0"),
    description:
      "How to prevent hacking and data breaches by using strong security practices, awareness, and continuous learning in technology.",
    speaker: "Sithira Hewaarachchi",
    videoCount: 3,
    link: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhD7F9fWJtQ5BgBhmOrixv5G",
    type: "playlist",
  },
  {
    title: "Getting started with bootstrap",
    thumbnail: getThumbnailUrl("DF2AVprXvkg"),
    description:
      "Learn the basics of Bootstrap and how to build simple, user-friendly web pages with great UX.",
    speaker: "Shehan Silva",
    videoCount: 3,
    link: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhBfp15nmhJRJYaPxuxg12Xz",
    type: "playlist",
  },
  {
    title: "Introduction to Google Crowdsource",
    thumbnail: getThumbnailUrl("bDyJM38wVb0"),
    description:
      "Crowdsource is a Google platform that lets users help improve Google services by training its algorithms.",
    speaker: "Geethmaka Dissanayake",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=bDyJM38wVb0&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX",
    type: "video",
  },
  {
    title: "Introduction to Neuralink",
    thumbnail: getThumbnailUrl("GITeoLvZ70I"),
    description:
      "Neuralink, founded by Elon Musk in San Francisco, develops implantable brain–machine interfaces for neurotechnology.",
    speaker: "Danuja Jayasuriya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=GITeoLvZ70I&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=2",
    type: "video",
  },
  {
    title: "Building and Deploying RESTful API with Go",
    thumbnail: getThumbnailUrl("Gz4b2f7qwyg"),
    description:
      "This video introduces Go, a statically typed programming language from Google, highlighting its syntax, concurrency features, and memory safety.",
    speaker: "Tharindu Balasooriya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=Gz4b2f7qwyg&t=505s",
    type: "video",
  },
  {
    title: "Getting started with WSL",
    thumbnail: getThumbnailUrl("FUczB6yMeP0"),
    description:
      "This video shows how to install WSL2, set it up with popular tools, and access Windows files through Linux.",
    speaker: "Sanuja Methmal",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=FUczB6yMeP0&list=PLkWgPcG-GFhC_3CLtupI4O4bvpNFWdBU2&index=2",
    type: "video",
  },
  {
    title: "AI Bot Technology",
    thumbnail: getThumbnailUrl("4MVQUVSGRRY"),
    description:
      "An AI chatbot (Artificial Intelligence chatbot) is a chatbot that's powered by artificial intelligence (AI).",
    speaker: "Shashika Kahatapitiya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=4MVQUVSGRRY&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=4",
    type: "video",
  },
  {
    title: "Emergence of Deepfake Technology",
    thumbnail: getThumbnailUrl("pJ9XbMcHiuA"),
    description:
      "This video explains what deepfakes are, how deep learning is used to create them, and their real-world applications beyond fake videos.",
    speaker: "Pasindu Bandara",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=pJ9XbMcHiuA&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=5",
    type: "video",
  },
  {
    title: "Java Scripts",
    thumbnail: getThumbnailUrl("MbXFm2wfjLY"),
    description:
      "This video introduces JavaScript, covering its basics, syntax, and key features for building dynamic web applications.",
    speaker: "Chamathka Ariyarathna",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=MbXFm2wfjLY&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=6",
    type: "video",
  },
  {
    title: "New Technological Trends",
    thumbnail: getThumbnailUrl("LmdpDTDJbec"),
    description:
      "This video explores how rapidly evolving technology and COVID-19 have changed the role of IT professionals in today’s contactless world.",
    speaker: "K.D. Divya",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=LmdpDTDJbec&list=PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX&index=7",
    type: "video",
  },
  {
    title: "Raspberry Pi for Computer Vision",
    thumbnail: getThumbnailUrl("tb4znRmig0U"),
    description:
      "This video introduces Raspberry Pi, a small single-board computer designed to teach computer science and enable practical projects.",
    speaker: "Saluka Udbhasa",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=tb4znRmig0U",
    type: "video",
  },
  {
    title: "Quick Guide to Quine",
    thumbnail: getThumbnailUrl("mNP35Ey35ZQ"),
    description:
      "This video shows how to set up a Quine account and explore repositories quickly on this user-friendly platform.",
    speaker: "David Butler",
    videoCount: 0,
    link: "https://www.youtube.com/watch?v=mNP35Ey35ZQ",
    type: "video",
  },
]
