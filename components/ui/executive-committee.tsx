import React from "react";
import { ExecutiveCommitteeMember } from "@/data/executive-committee";
import Image from "next/image";

interface ExecutiveCommitteeProps {
  members: ExecutiveCommitteeMember[];
}

const ExecutiveCommitteeUI: React.FC<ExecutiveCommitteeProps> = ({
  members,
}) => {
  if (members.length === 0) return null;

  const [president, ...otherMembers] = members;

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

      {/* Second & Third Rows: Other Members (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {otherMembers.map((member, index) => (
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
  );
};

export default ExecutiveCommitteeUI;
