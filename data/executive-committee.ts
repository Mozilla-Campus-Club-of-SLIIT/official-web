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
  "2026/2027": [
    {
      name: "Seniru Pasan",
      role: "President",
      image: "/assets/Seniru.jpg",
      linkedin: "https://www.linkedin.com/in/senirupasan/",
    },
    {
      name: "Bhanuka Bandara",
      role: "Vice President",
      image: "/assets/Bhanuka.png",
      linkedin: "https://www.linkedin.com/in/mrbhanuka",
    },
    {
      name: " Ranindu Wathsal",
      role: "Secretary",
      image: "/assets/RaninduWathsal.jpg",
      linkedin: "https://www.linkedin.com/in/ranindu-h-44036a354",
    },
    {
      name: "Janitha Gamage",
      role: "Treasurer",
      image: "/assets/JanithaSuranjana.jpg",
      linkedin: "https://www.linkedin.com/in/janithagamage/",
    },
    {
      name: "Heshan Thenura",
      role: "Dev Lead",
      image: "/assets/HeshanThenura.jpg",
      linkedin: "https://www.linkedin.com/in/heshanthenura/",
    },
    {
      name: "Gayathri Krishnaram",
      role: "Design Lead",
      image: "/assets/Gayathri.jpeg",
      linkedin: "https://www.linkedin.com/in/gayakrishanaram",
    },
    {
      name: "Sahnas Thufail",
      role: "Event Coordinator",
      image: "/assets/Sahnas.jpeg",
      linkedin: "https://www.linkedin.com/in/sahnas-thufail",
    },
    {
      name: "Virul Meemana",
      role: "Project Coordinator",
      image: "/assets/VirulMeemana.jpg",
      linkedin: "https://www.linkedin.com/in/virul-meemana-4597292a0",
    },
    {
      name: "Tharinda Marasingha",
      role: "Assistant Secretary",
      image: "/assets/Tharinda.jpeg",
      linkedin: "https://www.linkedin.com/in/tharindanirmal/",
    },
    {
      name: "Shazmina Oudeen",
      role: "Assistant Treasurer",
      image: "/assets/ShazminaOudeen.jpg",
      linkedin: "https://www.linkedin.com/in/shazmina-oudeen",
    },
  ],
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
