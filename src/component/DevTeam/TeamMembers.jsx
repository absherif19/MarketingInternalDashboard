import React from "react";
import mostafa from "../../assets/Members/mostafa.png";
import jumana from "../../assets/Members/jumana.png";
import dummy from "../../assets/Members/dummy.png";
import sherif from "../../assets/Members/sherif.png";

const team = [
  {
    id: "01",
    name: "Mostafa Hamdy",
    sheetName: "Mostafa",
    role: "Team Lead",
    title: "UI UX Designer",
    image: mostafa,
  },
  {
    id: "02",
    name: "Jumana Ahmed",
    sheetName: "Jumana",
    title: "UI UX Designer",
    image: jumana,
  },
  {
    id: "03",
    name: "Alaa",
    sheetName: "Alaa",
    title: "UI UX Designer",
    image: dummy,
  },
  {
    id: "04",
    name: "Abdelrahman Sherif",
    sheetName: "Sherif",
    title: "Web Developer",
    image: sherif,
  },
  {
    id: "05",
    name: "Duane",
    sheetName: "Duane",
    title: "Web Developer",
    image: dummy,
  },
  {
    id: "06",
    name: "Amr Mohamed",
    sheetName: "Amr",
    title: "UI UX Designer",
    image: "https://apigateway.psi-crm.com/FileManager/File/DownloadPublicFile/8a1f20bb-48d0-4991-8e44-80d0897d4c33",
  },
];

const TeamMembers = ({ setFilters, filters, filteredData }) => {
const handleRowClick = (member) => {
  setFilters((prev) => {
    let key = null;

    if (member.title === "Web Developer") key = "developer";
    else if (member.title === "UI UX Designer") key = "designer";

    if (!key) return prev;

    const prevValue = prev[key]?.toLowerCase();
    const currentValue = member.sheetName?.toLowerCase();

    return {
      ...prev,
      [key]: prevValue === currentValue ? "All" : member.sheetName,
    };
  });
};

  const activeMembers = team.filter((member) => {
    if (member.title === "Web Developer") {
      return filteredData.some((item) => item["Dev Team"] === member.sheetName);
    }
    if (member.title === "UI UX Designer") {
      return filteredData.some(
        (item) => item["Design By"] === member.sheetName
      );
    }
    return false;
  });

  return (
    <div className="bg-white border border-[#F8F9FA] rounded-3xl p-2 md:p-6 custom-shadow-soft">
      <h2 className="text-xl font-medium text-primary mb-4">Team Members</h2>
      <div className="overflow-y-auto max-h-[400px] custom-orange-scroll">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3"></th>

              <th className="py-2 px-3 ">Name</th>
              <th className="py-2 px-3">Title</th>
            </tr>
          </thead>
          <tbody>
            {activeMembers.map((member, index) => {
              const isSelected =
                (member.title === "Web Developer" &&
                  filters.developer === member.sheetName) ||
                (member.title === "UI UX Designer" &&
                  filters.designer === member.sheetName);

              const rowClass = isSelected
                ? "bg-blue-100 border-l-4 border-blue-500"
                : "hover:bg-gray-50";

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
                    {member.role && (
                      <div className="text-secondary mb-1 font-normal text-sm leading-tight">
                        {member.role}
                      </div>
                    )}
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
