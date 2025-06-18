// ProjectsTable.jsx
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const statusColors = {
  Completed: "bg-green-100 text-green-600",
  "In progress": "bg-yellow-100 text-yellow-600",
  "Not started": "bg-blue-100 text-blue-600",
  Cancelled: "bg-gray-200 text-gray-500",
  Blocked: "bg-red-100 text-red-500",
};

const ProjectsTable = ({ data }) => {
  const [search, setSearch] = useState("");

const filteredData = data
  .filter((item) =>
    item["Task Name"]?.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const dateA = new Date(a["Last Update (Auto)"]);
    const dateB = new Date(b["Last Update (Auto)"]);
    return dateB - dateA; // newest date first
  });

  console.log("Filtered Data:", filteredData);

  return (
    <div className="bg-white py-6 rounded-2xl shadow-sm border border-[#F8F9FA]">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-lg font-medium text-primary">
          Projects Details - ({filteredData.length})
        </h2>
  <div className="relative min-w-[350px]">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="text-gray-400 w-4 h-4" />
    </div>
    <input
      type="text"
      placeholder="Search by task name..."
      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
      </div>

      <div className="overflow-x-auto max-h-[600px] overflow-y-scroll custom-orange-scroll rounded">
        <table className="min-w-full text-sm text-left border-t border-gray-100">
          <thead className="text-xs text-[#1E1E4B] bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Task Name</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Design Status</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To Team</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Final Output</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Last Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-[#EAECF0] hover:bg-gray-50"
              >
                <td className="px-6 py-4">{item["Task Name"] || "-"}</td>
                <td className="px-6 py-4 capitalize">
                  {item["employee"] || "-"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[item["Status"]] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item["Status"] || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">{item["From"] || "-"}</td>
                <td className="px-6 py-4">{item["To Team"] || "-"}</td>
                <td className="px-6 py-4">
                  {item["Reference "] ? (
                    <a
                      href={item["Reference "]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2960CE] hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      No Link
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {item["Final Link"] ? (
                    <a
                      href={item["Final Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#E38136] hover:bg-orange-600 text-white px-4 py-1.5 rounded text-xs"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      No Link
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-500 max-w-[200px]">
                  {item["Notes"] || "-"}
                </td>
                <td className="px-6 py-4">
                  {item["Last Update (Auto)"] || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
