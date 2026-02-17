import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const resignationReasons = [
  { id: 1, reason: "Company culture or boss issues", timeUsed: 12, inUse: false },
];

const terminationReasons = [
  { id: 2, reason: "Company culture or boss issues", timeUsed: 12, inUse: false },
];

// ==================================================================================================

const ExitReasonList = () => {
  const { token } = useSelector((state) => state.user);
  const [resignation, setResignation] = useState(resignationReasons);
  const [termination, setTermination] = useState(terminationReasons);

  const [reasonList, setReasonList] = useState([]);

  const toggleResignation = (id) => {
    setResignation(prev =>
      prev.map(item =>
        item.id === id ? { ...item, inUse: !item.inUse } : item
      )
    );
  };

  const toggleTermination = (id) => {
    setTermination(prev =>
      prev.map(item =>
        item.id === id ? { ...item, inUse: !item.inUse } : item
      )
    );
  };
  // get api =============================
  useEffect(() => {
    const fetchexitreasons = async () => {
      const axiosInstance = createAxios(token);
      try {

        const res = await axiosInstance.get(
          `/config/exit-reasons-getAll`,
          { meta: { auth: "ADMIN_AUTH" } }
        );
        setReasonList(res?.data?.data)
        console.log(res?.data, "exit reasons data")

      } catch (err) {
        console.error("Error fetching exit reasons:", err);
      }
    };

    fetchexitreasons();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Exit Reason</h1>
            <p className="text-sm text-gray-400">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>

          <Link
            to="/config/hris/Employee-data/exit-reason/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            Create <span className="text-lg">+</span>
          </Link>
        </div>

        {/* Resignation Section */}
        <div className="mb-10">
          <div className="grid grid-cols-3 text-sm font-medium text-gray-400 px-6 mb-2">
            <div>Resignation Reason</div>
            <div>Time Used</div>
            <div className="text-right">In Use</div>
          </div>

          <div className="space-y-4">
            {reasonList.map(item => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl px-6 py-5 grid grid-cols-3 items-center shadow-sm"
              >
                <div className="text-gray-900 font-medium">
                  {item.reason}
                </div>

                <div className="text-gray-700">+{item.timeUsed}</div>

                <div className="flex justify-end">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleResignation(item.id)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${item.inUse ? "bg-blue-600" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${item.inUse ? "translate-x-6" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Termination Section */}
        <div>
          <div className="grid grid-cols-3 text-sm font-medium text-gray-400 px-6 mb-2">
            <div>Termination Reason</div>
            <div>Time Used</div>
            <div className="text-right">In Use</div>
          </div>

          <div className="space-y-4">
            {termination.map(item => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl px-6 py-5 grid grid-cols-3 items-center shadow-sm"
              >
                <div className="text-gray-900 font-medium">
                  {item.reason}
                </div>

                <div className="text-gray-700">+{item.timeUsed}</div>

                <div className="flex justify-end">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleTermination(item.id)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${item.inUse ? "bg-blue-600" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${item.inUse ? "translate-x-6" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExitReasonList;
