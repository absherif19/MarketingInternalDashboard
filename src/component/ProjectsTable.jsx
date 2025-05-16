// ProjectsTable.jsx
import React from "react";

const statusColors = {
  Completed: "bg-green-100 text-green-600",
  "In progress": "bg-yellow-100 text-yellow-600",
  "Not started": "bg-blue-100 text-blue-600",
  Cancelled: "bg-gray-200 text-gray-500",
  Blocked: "bg-red-100 text-red-500",
};

const ProjectsTable = ({ data }) => {


  return (
    <div className="bg-white py-6 rounded-2xl shadow-sm border border-[#F8F9FA]">
      <div className="flex justify-between items-center mb-4 px-4 ">
        <h2 className="text-lg font-medium text-primary">
          Projects Details
        </h2>
      </div>

      <div className="overflow-x-auto max-h-[480px] overflow-y-auto custom-orange-scroll rounded">
        <table className="min-w-full text-sm text-left border-t border-gray-100">
          <thead className="text-xs text-[#1E1E4B] bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Project Name</th>
              <th className="px-4 py-3">Design By</th>
              <th className="px-4 py-3">Design Status</th>
              <th className="px-4 py-3">Dev Team</th>
              <th className="px-4 py-3">Project Status</th>
              <th className="px-4 py-3">Prototype</th>
              <th className="px-4 py-3">Live</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-[#EAECF0] hover:bg-gray-50">
                <td className="px-6 py-4">{item["Task name"] || "-"}</td>
                <td className="px-6 py-4">{item["Design By"] || "-"}</td>
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
                <td className="px-6 py-4">{item["Dev Team"] || "-"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[item["Project Status"]] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item["Project Status"] || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={item["Prototype Link"] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2960CE] hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs"
                  >
                    View
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={item["Live Link"] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E38136] hover:bg-orange-600 text-white px-4 py-1.5 rounded text-xs"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2 text-gray-500 max-w-[200px]">
                  {item["Notes"] || "-"}
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
