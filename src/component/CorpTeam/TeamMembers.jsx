import React from "react";
import joey from "../../assets/Members/Joey.png";
import meriem from "../../assets/Members/meriem.png";
import youssef from "../../assets/Members/youssef.png";
import sherifmagdy from "../../assets/Members/sherifmagdy.png";
import mark from "../../assets/Members/mark.png";

const team = [
  {
    id: "01",
    name: "Joey Mekhael Al Azzi",
    sheetName: "Joey",
    title: "Marketing Coordinator",
    image: joey,
    level: "coordinator", // 🔹
  },
  {
    id: "02",
    name: "Meriem Meftah",
    sheetName: "Meriam",
    title: "Marketing Specialist - PSI",
    image: meriem,
    level: "coordinator", // 🔹
  },
  {
    id: "03",
    name: "Youssef Mazen",
    sheetName: "youssef",
    title: "Motion Graphic Designer",
    image: youssef,
    level: "employee", // 🔹
  },
  {
    id: "04",
    name: "Sherif Magdy",
    sheetName: "sherif magdy",
    title: "Branding Designer",
    image: sherifmagdy,
    level: "employee", // 🔹
  },
  {
    id: "05",
    name: "Mark Jasper",
    sheetName: "mark",
    title: "Marketing Support",
    image: mark,
    level: "employee", // 🔹
  },
];
const TeamMembers = ({ setFilters, filters }) => {
const handleRowClick = (member) => {
  setFilters((prev) => {
    const key = member.level === "coordinator" ? "from" : "designer";
    const valueToMatch = member.sheetName;

    return {
      ...prev,
      [key]: prev[key]?.toLowerCase() === valueToMatch.toLowerCase()
        ? "All"
        : valueToMatch,
    };
  });
};


const activeMembers = team;

  return (
    <div className="bg-white border border-[#F8F9FA] rounded-3xl p-2 md:p-6 custom-shadow-soft">
      <h2 className="text-xl font-medium text-primary mb-4">Team Members</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3"></th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Title</th>
            </tr>
          </thead>
          <tbody>
            {activeMembers.map((member, index) => {
const isSelected =
  (member.level === "employee" &&
    filters.designer?.toLowerCase() === member.sheetName.toLowerCase()) ||
  (member.level === "coordinator" &&
    filters.from?.toLowerCase() === member.sheetName.toLowerCase());

let rowClass = "hover:bg-gray-50";

if (isSelected && member.level === "employee") {
  rowClass = "bg-blue-100 border-l-4 border-blue-500";
} else if (isSelected && member.level === "coordinator") {
  rowClass = "bg-yellow-50 border-l-4 border-yellow-500";
}


              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(member)}
                  className={`border-t border-[#EDF2F6] cursor-pointer ${rowClass}`}
                >
                  <td className="py-3 px-3 text-[#1E1E4B] font-medium">
                    {member.id}
                  </td>
                  <td className="py-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-3 text-[#1E1E4B] font-medium">
                    {member.name}
                  </td>
                  <td className="py-3 px-3 text-[#4A5568]">
                    <div>{member.title}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembers;
