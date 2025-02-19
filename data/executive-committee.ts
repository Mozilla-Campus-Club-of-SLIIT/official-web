export interface ExecutiveCommitteeMember {
  name: string;
  role: string;
  image: string;
}

export interface ExecutiveCommittee {
  [year: string]: ExecutiveCommitteeMember[];
}

export const executiveCommittees: ExecutiveCommittee = {
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
  // Add more years here as much as we can it will de displayed in the about page
  "2023/2024": [
    {
      name: "Old President",
      role: "President",
      image: "/assets/old-president.jpeg",
    },
    { name: "Old VP", role: "Vice President", image: "/assets/old-vp.jpeg" },
    {
      name: "Old Secretary",
      role: "Secretary",
      image: "/assets/old-secretary.jpeg",
    },
  ],
};
