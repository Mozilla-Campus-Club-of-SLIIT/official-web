export interface ExecutiveCommitteeMember {
  name: string
  role: string
  image: string
  linkedin: string
}

export interface ExecutiveCommittee {
  [year: string]: ExecutiveCommitteeMember[]
}

export const executiveCommittees: ExecutiveCommittee = {
  "2025/2026": [
    {
      name: "Sadeesha Perera",
      role: "President",
      image: "/assets/Sadeesha.jpg",
      linkedin: "https://www.linkedin.com/in/sadeesha-perera/",
    },
    {
      name: "Hinesha Perera",
      role: "Vice President",
      image: "/assets/Hinesha.jpg",
      linkedin: "https://www.linkedin.com/in/hinesha-perera-839a2526a/",
    },
    {
      name: "Mohamed Asath",
      role: "Secretary",
      image: "/assets/Asath.jpg",
      linkedin: "https://www.linkedin.com/in/mohamad-asath/",
    },
    {
      name: "Leena Jilain",
      role: "Treasurer",
      image: "/assets/Leena.png",
      linkedin: "https://www.linkedin.com/in/leena-jilain/",
    },
    {
      name: "Seniru Pasan",
      role: "Dev Lead",
      image: "/assets/Seniru.jpg",
      linkedin: "https://www.linkedin.com/in/senirupasan/",
    },
    {
      name: "Mohammadhu Bishru",
      role: "Design Lead",
      image: "/assets/Bishru.jpg",
      linkedin: "https://www.linkedin.com/in/bishrumohammed/",
    },
    {
      name: "Lakshi Senadheera",
      role: "Event Coordinator",
      image: "/assets/Lakshi.jpg",
      linkedin: "https://www.linkedin.com/in/lakshi-senadheera-248674278/",
    },
    {
      name: "Dasun Wickramasooriya",
      role: "Project Coordinator",
      image: "/assets/Dasun.jpg",
      linkedin: "https://www.linkedin.com/in/dasun-wickr/",
    },
  ], //below this need to add the links...
  "2024/2025": [
    {
      name: "Sayuru Bopitiya",
      role: "President",
      image: "/assets/Sayuru.jpeg",
      linkedin: "",
    },
    {
      name: "Nethmi Nikeshala",
      role: "Vice President",
      image: "/assets/Nethmi.jpeg",
      linkedin: "",
    },
    {
      name: "Gethmi Rathnayaka",
      role: "Secretary",
      image: "/assets/Gethmi.jpeg",
      linkedin: "",
    },
    {
      name: "Jayadinu Dias",
      role: "Treasurer",
      image: "/assets/Jayadinu.jpeg",
      linkedin: "",
    },
    {
      name: "Danuja Jayasuriya",
      role: "Dev Lead",
      image: "/assets/Danuja.jpeg",
      linkedin: "",
    },
    {
      name: "Ravindu Dilusha",
      role: "Editor",
      image: "/assets/Ravidu.jpeg",
      linkedin: "",
    },
    {
      name: "Nowen Kottage",
      role: "Event Coordinator",
      image: "/assets/Nowen.jpeg",
      linkedin: "",
    },
  ],
}
