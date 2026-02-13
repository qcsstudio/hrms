import { useState } from "react";

const ExitPolicyCreate = () => {
  const [tab, setTab] = useState("active");
  const [selfResign, setSelfResign] = useState("yes");
  const [changeNotice, setChangeNotice] = useState("yes");
  const [managerInitiate, setManagerInitiate] = useState("yes");
  const [managerChangeNotice, setManagerChangeNotice] = useState("yes");
  const [notifyOn, setNotifyOn] = useState("employee");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Exit Policy
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Tabs & Clear */}
      <div className="flex items-center mb-6">
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              tab === "active"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setTab("draft")}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              tab === "draft"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Draft
          </button>
        </div>

        <button className="ml-auto border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm shadow-sm">
          Clear ✕
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lets give this Exit Policy a name
          </label>
          <input
            type="text"
            placeholder="Choose Account"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Choose Account"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notice Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notice Period Number of days
          </label>
          <input
            type="number"
            placeholder="Choose Account"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Employee Self Resign */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Can the employee self-resign ?
          </p>

          <div className="space-y-3">
            {/* Yes Box */}
            <div className="border border-gray-200 rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={selfResign === "yes"}
                  onChange={() => setSelfResign("yes")}
                  className="accent-blue-600"
                />
                Yes
              </label>

              {selfResign === "yes" && (
                <div className="mt-4 ml-6">
                  <p className="text-sm font-medium mb-3">
                    Can the employee request for a change in the notice period ?
                  </p>

                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={changeNotice === "yes"}
                          onChange={() => setChangeNotice("yes")}
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="border rounded-lg p-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={changeNotice === "no"}
                          onChange={() => setChangeNotice("no")}
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* No Box */}
            <div className="border border-gray-200 rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={selfResign === "no"}
                  onChange={() => setSelfResign("no")}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Manager Section */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Can the manager of this employee initiate separation?
          </p>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={managerInitiate === "yes"}
                  onChange={() => setManagerInitiate("yes")}
                  className="accent-blue-600"
                />
                Yes
              </label>

              {managerInitiate === "yes" && (
                <div className="mt-4 ml-6">
                  <p className="text-sm font-medium mb-3">
                    Can the manager request for change in the notice period ?
                  </p>

                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={managerChangeNotice === "yes"}
                          onChange={() =>
                            setManagerChangeNotice("yes")
                          }
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="border rounded-lg p-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={managerChangeNotice === "no"}
                          onChange={() =>
                            setManagerChangeNotice("no")
                          }
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={managerInitiate === "no"}
                  onChange={() => setManagerInitiate("no")}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Notify Section */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Notify on resigned/approval.
          </p>

          <div className="space-y-3">
            <div className="border rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={notifyOn === "approvers"}
                  onChange={() => setNotifyOn("approvers")}
                  className="accent-blue-600"
                />
                Notify Approvers
              </label>
            </div>

            <div className="border rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={notifyOn === "employee"}
                  onChange={() => setNotifyOn("employee")}
                  className="accent-blue-600"
                />
                Notify Employee
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-5 py-2.5 border border-gray-300 rounded-lg bg-white">
          Cancel
        </button>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default ExitPolicyCreate;
