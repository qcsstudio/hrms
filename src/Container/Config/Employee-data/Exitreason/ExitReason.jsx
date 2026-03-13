import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

const CREATE_EXIT_REASON_ROUTE = "/config/hris/Employee-data/exit-reason/create";

const toggleBaseClassName =
  "relative inline-flex h-6 w-11 items-center rounded-full border border-transparent shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-0";

const summaryCardClassName =
  "rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

const sectionMeta = {
  resignation: {
    title: "Resignation Reasons",
    subtitle: "Reasons used when employees voluntarily leave the organization.",
    columnLabel: "Resignation Reason",
    accentClass: "bg-[#ECFDF3] text-[#027A48]",
  },
  termination: {
    title: "Termination Reasons",
    subtitle: "Reasons used when the organization initiates employee separation.",
    columnLabel: "Termination Reason",
    accentClass: "bg-[#FFF7E8] text-[#B54708]",
  },
};

const ToggleSwitch = ({ checked, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${toggleBaseClassName} ${
        checked ? "bg-[#0575E6]" : "bg-[#D0D5DD]"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-[18px] w-[18px] rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
};

const ReasonSection = ({ config, items, onToggle }) => {
  return (
    <section className="rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-3 border-b border-[#EAECF0] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[18px] font-semibold text-[#101828]">
            {config.title}
          </h2>
          <p className="mt-1 text-sm text-[#667085]">{config.subtitle}</p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${config.accentClass}`}
        >
          {items.length} reason{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F9FAFB] text-[#667085]">
            <tr>
              <th className="px-6 py-3.5 text-left font-medium">
                {config.columnLabel}
              </th>
              <th className="px-6 py-3.5 text-left font-medium">Time Used</th>
              <th className="px-6 py-3.5 text-right font-medium">In Use</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-[#98A2B3]"
                >
                  No reasons available in this section yet.
                </td>
              </tr>
            )}

            {items.map((item) => (
              <tr
                key={item._id}
                className="border-t border-[#F2F4F7] transition-colors hover:bg-[#FCFCFD]"
              >
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm font-medium text-[#101828]">
                    {item.description || "--"}
                  </div>
                </td>

                <td className="px-6 py-4 align-middle text-[#475467]">
                  {typeof item.timeUsed === "number" ? `+${item.timeUsed}` : "--"}
                </td>

                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center justify-end gap-3">
                    <span
                      className={`text-xs font-medium ${
                        item.isActive ? "text-[#027A48]" : "text-[#98A2B3]"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                    <ToggleSwitch
                      checked={!!item.isActive}
                      onClick={() => onToggle(item._id, item.isActive)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const ExitReasonList = () => {
  const token = localStorage.getItem("authToken");
  const [reasonList, setReasonList] = useState([]);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const navigate = useNavigate();

  const resignationReasonsList = reasonList.filter(
    (item) => item.exitType === "resignation"
  );
  const terminationReasonsList = reasonList.filter(
    (item) => item.exitType === "termination"
  );
  const activeReasonsCount = reasonList.filter((item) => item.isActive).length;

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate(CREATE_EXIT_REASON_ROUTE);
  };

  const toggleStatus = async (id, currentStatus) => {
    const axiosInstance = createAxios(token);
    try {
      await axiosInstance.patch(
        `/config/exit-reason-status/${id}?isActive=${!currentStatus}`,
        {},
        { meta: { auth: "ADMIN_AUTH" } }
      );
      setReasonList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isActive: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating exit reason status:", err);
    }
  };

  useEffect(() => {
    const fetchexitreasons = async () => {
      const axiosInstance = createAxios(token);
      try {
        const res = await axiosInstance.get(`/config/exit-reasons-getAll`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        setReasonList(res?.data?.data || []);
        console.log(res?.data, "exit reasons data");
      } catch (err) {
        console.error("Error fetching exit reasons:", err);
      }
    };

    fetchexitreasons();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">Exit Reason</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Manage standardized resignation and termination reasons used across
              employee separation workflows.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCountryDialog(true)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none"
          >
            Create +
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Total Reasons
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {reasonList.length}
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Active Reasons
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {activeReasonsCount}
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Categories
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">2</p>
            <p className="mt-1 text-sm text-[#667085]">
              Resignation and termination
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ReasonSection
            config={sectionMeta.resignation}
            items={resignationReasonsList}
            onToggle={toggleStatus}
          />

          <ReasonSection
            config={sectionMeta.termination}
            items={terminationReasonsList}
            onToggle={toggleStatus}
          />
        </div>
      </div>

      {showCountryDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowCountryDialog(false)}
            onContinue={handleCreate}
          />,
          document.body
        )}
    </div>
  );
};

export default ExitReasonList;
