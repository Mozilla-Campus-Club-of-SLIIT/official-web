const getThumbnailUrl = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
const SHARED_PLAYLIST_ID = "PLkWgPcG-GFhBHAPwY9KLxo-6gUYRR2ItX"

export interface Webinar {
  title: string
  thumbnail: string
  description: string
  speaker: string
  videoCount: number
  link: string
  type: string
}

interface CreateWebinarOptions {
  videoCount?: number
  customLink?: string
  index?: number
  useSharedPlaylist?: boolean
}

const createWebinar = (
  title: string,
  videoId: string,
  description: string,
  speaker: string,
  type: "video" | "playlist",
  options: CreateWebinarOptions = {},
): Webinar => {
  const { videoCount = 0, customLink, index, useSharedPlaylist = false } = options

  let link = customLink
  if (!link) {
    if (useSharedPlaylist || type === "playlist") {
      link = `https://www.youtube.com/watch?v=${videoId}&list=${SHARED_PLAYLIST_ID}`
      if (index) {
        link += `&index=${index}`
      }
    } else {
      link = `https://www.youtube.com/watch?v=${videoId}`
    }
  }

  return {
    title,
    thumbnail: getThumbnailUrl(videoId),
    description,
    speaker,
    videoCount,
    type,
    link,
  }
}

export const webinars: Webinar[] = [
  createWebinar(
    "HashCode",
    "XfDgDRafa9A",
    "Master the fundamentals of Google Hash Code and gain a strategic edge for your next programming competition.",
    "Uvindu Perera",
    "playlist",
    {
      videoCount: 2,
      customLink:
        "https://www.youtube.com/watch?v=XfDgDRafa9A&list=PLkWgPcG-GFhC5nuuifSjGzTlRlxYwArDv",
    },
  ),
  createWebinar(
    "Learn and Earn",
    "1xffza9FAO8",
    "These quotes mean that hard work, generosity, and learning are key to success in life.",
    "Nadun Sandeepa",
    "playlist",
    {
      videoCount: 2,
      customLink:
        "https://www.youtube.com/watch?v=1xffza9FAO8&list=PLkWgPcG-GFhA2dobuzfv7I9C0goWJZ-We",
    },
  ),
  createWebinar(
    "Cyber Con",
    "TiEEzKgc5c0",
    "How to prevent hacking and data breaches by using strong security practices, awareness, and continuous learning in technology.",
    "Sithira Hewaarachchi",
    "playlist",
    {
      videoCount: 3,
      customLink: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhD7F9fWJtQ5BgBhmOrixv5G",
    },
  ),
  createWebinar(
    "Getting started with bootstrap",
    "DF2AVprXvkg",
    "Learn the basics of Bootstrap and how to build simple, user-friendly web pages with great UX.",
    "Shehan Silva",
    "playlist",
    {
      videoCount: 3,
      customLink: "https://www.youtube.com/playlist?list=PLkWgPcG-GFhBfp15nmhJRJYaPxuxg12Xz",
    },
  ),
  createWebinar(
    "Introduction to Google Crowdsource",
    "bDyJM38wVb0",
    "Crowdsource is a Google platform that lets users help improve Google services by training its algorithms.",
    "Geethmaka Dissanayake",
    "video",
    { useSharedPlaylist: true },
  ),
  createWebinar(
    "Introduction to Neuralink",
    "GITeoLvZ70I",
    "Neuralink, founded by Elon Musk in San Francisco, develops implantable brain–machine interfaces for neurotechnology.",
    "Danuja Jayasuriya",
    "video",
    { index: 2, useSharedPlaylist: true },
  ),
  createWebinar(
    "Building and Deploying RESTful API with Go",
    "Gz4b2f7qwyg",
    "This video introduces Go, a statically typed programming language from Google, highlighting its syntax, concurrency features, and memory safety.",
    "Tharindu Balasooriya",
    "video",
    { customLink: "https://www.youtube.com/watch?v=Gz4b2f7qwyg&t=505s" },
  ),
  createWebinar(
    "Getting started with WSL",
    "FUczB6yMeP0",
    "This video shows how to install WSL2, set it up with popular tools, and access Windows files through Linux.",
    "Sanuja Methmal",
    "video",
    {
      customLink:
        "https://www.youtube.com/watch?v=FUczB6yMeP0&list=PLkWgPcG-GFhC_3CLtupI4O4bvpNFWdBU2&index=2",
    },
  ),
  createWebinar(
    "AI Bot Technology",
    "4MVQUVSGRRY",
    "An AI chatbot (Artificial Intelligence chatbot) is a chatbot that's powered by artificial intelligence (AI).",
    "Shashika Kahatapitiya",
    "video",
    { index: 4, useSharedPlaylist: true },
  ),
  createWebinar(
    "Emergence of Deepfake Technology",
    "pJ9XbMcHiuA",
    "This video explains what deepfakes are, how deep learning is used to create them, and their real-world applications beyond fake videos.",
    "Pasindu Bandara",
    "video",
    { index: 5, useSharedPlaylist: true },
  ),
  createWebinar(
    "Java Scripts",
    "MbXFm2wfjLY",
    "This video introduces JavaScript, covering its basics, syntax, and key features for building dynamic web applications.",
    "Chamathka Ariyarathna",
    "video",
    { index: 6, useSharedPlaylist: true },
  ),
  createWebinar(
    "New Technological Trends",
    "LmdpDTDJbec",
    "This video explores how rapidly evolving technology and COVID-19 have changed the role of IT professionals in today’s contactless world.",
    "K.D. Divya",
    "video",
    { index: 7, useSharedPlaylist: true },
  ),
  createWebinar(
    "Raspberry Pi for Computer Vision",
    "tb4znRmig0U",
    "This video introduces Raspberry Pi, a small single-board computer designed to teach computer science and enable practical projects.",
    "Saluka Udbhasa",
    "video",
  ),
  createWebinar(
    "Quick Guide to Quine",
    "mNP35Ey35ZQ",
    "This video shows how to set up a Quine account and explore repositories quickly on this user-friendly platform.",
    "David Butler",
    "video",
  ),
]
