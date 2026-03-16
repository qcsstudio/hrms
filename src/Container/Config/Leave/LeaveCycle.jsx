import { useEffect, useState } from "react";
import createAxios from "../../../utils/axios.config";

export default function LeaveCycle() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [pendingOption, setPendingOption] = useState(true);

  useEffect(() => {
    const fetchLeaveCycle = async () => {
      try {
        const res = await axiosInstance.get("/config/getOne/leave-cycle", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const value = res?.data?.data?.pendingLeaveOption;
        if (typeof value === "boolean") {
          setPendingOption(value);
        }
      } catch (error) {
        console.log("leave cycle get error", error);
      }
    };

    fetchLeaveCycle();
  }, []);

  const handleSave = async () => {
    try {
      await axiosInstance.post(
        "/config/createORupdate/leave-cycle",
        { pendingLeaveOption: pendingOption },
        { meta: { auth: "ADMIN_AUTH" } }
      );
    } catch (error) {
      console.log("leave cycle save error", error);
    }
  };

  return (
    <div className=" mx-auto py-10 px-6 space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Leave Cycle Transition Settings
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          These rules ensure that when your current leave cycle ends on
          31 December 2023 and a new one begins on 1 January 2024,
          the transition from one cycle to another is smooth and error-free.
        </p>
      </div>

      {/* Pending Leave Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Leave Applications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            How should we handle pending leave applications from the previous leave cycle?
          </p>
        </div>

        <p className="text-sm text-gray-500">
          When initiating the "Leave Carry Forward Process", handle all pending
          leave applications as described below:
        </p>

        {/* Option Card */}
        <div
          onClick={() => setPendingOption((prev) => !prev)}
          className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition
            ${
              pendingOption
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <div
            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-1
              ${
                pendingOption
                  ? "border-blue-600"
                  : "border-gray-400"
              }
            `}
          >
            {pendingOption && (
              <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </div>

          <span className="text-sm text-gray-800 leading-relaxed">
            Let employees/managers deal with pending applications manually and
            initiate the carry forward process only after they are settled.
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

    </div>
  );
}
