import React from "react";

const TeamCollaborationTabel = ({ filteredData, filters, setFilters }) => {
  const knownTeams = ["PSI", "BD", "HR", "Mr Said", "CRM", "L&D", "Internal"];
  const teamCounts = {};
  const othersSet = new Set();

  // Count logic
  filteredData.forEach((item) => {
    const team = item["To Team"] || "None";
    const teamKey = knownTeams.includes(team) ? team : "Others";
    if (teamKey === "Others") othersSet.add(team);
    teamCounts[teamKey] = (teamCounts[teamKey] || 0) + 1;
  });

  // Colors
  const teamColors = {
    PSI: "#E35F27",
    BD: "#14B8A6",
    HR: "#2563EB",
    "Mr Said": "#A78BFA",
    CRM: "#E07FAF",
    "L&D": "#FACC15",
    Internal: "#FBBF24",
    Others: "#9CA3AF",
  };

  // Final table data
  const chartData = Object.entries(teamCounts).map(([name, value]) => ({
    name,
    value,
    color: teamColors[name] || "#9CA3AF",
  }));

  return (
    <div className="bg-white p-4 rounded-xl  border-b border-[#EAECF0] overflow-x-auto w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-gray-500 text-sm border-b border-[#EAECF0]">
            <th className="text-left px-4 py-2 font-medium">Source</th>
            <th className="text-right px-4 py-2 font-medium">
              Count of projects
            </th>
          </tr>
        </thead>
        <tbody>
{chartData.map((team, index) => {
  const isSelected = filters.ToTeam === team.name;
  const rowClass = isSelected
    ? "bg-blue-50 font-semibold border-l-4 border-blue-500"
    : "";

  return (
    <tr
      key={index}
      onClick={() =>
        setFilters((prev) => ({
          ...prev,
          ToTeam: prev.ToTeam === team.name ? "All" : team.name,
        }))
      }
      className={`cursor-pointer border-b border-[#EAECF0] last:border-0 ${rowClass}`}
    >
      <td className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800">
        <span
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: team.color }}
        ></span>
        {team.name}
      </td>
      <td className="text-right px-4 py-2 text-sm font-semibold text-gray-900">
        {team.value}
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );
};

export default TeamCollaborationTabel;
