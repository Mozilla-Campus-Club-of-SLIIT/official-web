import React from "react"
import { ExecutiveCommitteeMember } from "@/data/executive-committee"
import Image from "next/image"

interface ExecutiveCommitteeProps {
  members: ExecutiveCommitteeMember[]
}

const ExecutiveCommitteeUI: React.FC<ExecutiveCommitteeProps> = ({ members }) => {
  if (members.length === 0) return null

  const [president, ...otherMembers] = members
  const secondRow = otherMembers.slice(0, 3)
  const thirdRow = otherMembers.slice(3)

  return (
    <div className="flex flex-col gap-8">
      {/* First Row: President (Full Width) */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center w-64">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <Image
              src={president.image}
              alt={president.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{president.name}</h3>
          <p className="text-gray-600">{president.role}</p>
        </div>
      </div>

      {/* Second row (vice president, secretary and treasurer) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {secondRow.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Third row (remaining members) */}
      <div className="grid gap-8 justify-center grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {thirdRow.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExecutiveCommitteeUI
