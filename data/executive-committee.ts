export interface ExecutiveCommitteeMember {
  name: string
  role: string
  image: string
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
    },
    {
      name: "Hinesha Perera",
      role: "Vice President",
      image: "/assets/Hinesha.jpg",
    },
    {
      name: "Mohamed Asath",
      role: "Secretary",
      image: "/assets/Asath.jpg",
    },
    {
      name: "Leena Jilain",
      role: "Treasurer",
      image: "/assets/Leena.png",
    },
    {
      name: "Seniru Pasan",
      role: "Dev Lead",
      image: "/assets/Seniru.jpg",
    },
    {
      name: "Mohammadhu Bishru",
      role: "Design Lead",
      image: "/assets/Bishru.jpg",
    },
    {
      name: "Lakshi Senadheera",
      role: "Event Coordinator",
      image: "/assets/Lakshi.jpg",
    },
    {
      name: "Dasun Wickramasooriya",
      role: "Project Coordinator",
      image: "/assets/Dasun.jpg",
    },
  ],
  "2024/2025": [
    {
      name: "Sayuru Bopitiya",
      role: "President",
      image: "/assets/Sayuru.jpeg",
    },
    {
      name: "Nethmi Nikeshala",
      role: "Vice President",
      image: "/assets/Nethmi.jpeg",
    },
    {
      name: "Gethmi Rathnayaka",
      role: "Secretary",
      image: "/assets/Gethmi.jpeg",
    },
    {
      name: "Jayadinu Dias",
      role: "Treasurer",
      image: "/assets/Jayadinu.jpeg",
    },
    {
      name: "Danuja Jayasuriya",
      role: "Dev Lead",
      image: "/assets/Danuja.jpeg",
    },
    {
      name: "Ravindu Dilusha",
      role: "Editor",
      image: "/assets/Ravidu.jpeg",
    },
    {
      name: "Nowen Kottage",
      role: "Event Coordinator",
      image: "/assets/Nowen.jpeg",
    },
  ],
}
