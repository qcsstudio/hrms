import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createAxios from "../../../../utils/axios.config";

const mapChecklist = (item = {}) => ({
  id: item?._id || item?.id || item?.title,
  title: item?.title || "-",
  description: item?.description || "-",
  triggerEvent:
    item?.checkType === 1
      ? "Auto Triggered"
      : item?.checkType === 2
      ? "Manual Triggered"
      : item?.triggerEvent || "-",
  assignedCount:
    item?.assignedEmployees?.length ??
    item?.assignedEmployeeCount ??
    item?.assignedEmployeeList?.length ??
    item?.employees?.length ??
    0,
  active: item?.status ?? item?.isActive ?? item?.active ?? false,
  checkType: item?.checkType,
  checklistType: item?.checklistType || "",
});

const Checklist = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [tab, setTab] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [togglingId, setTogglingId] = useState("");

  const fetchChecklists = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/config/getAllChecklists", {
        meta: { auth: "ADMIN_AUTH" },
      });

      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.checklists)
        ? response.data.checklists
        : [];

      setData(list.map(mapChecklist));
    } catch (error) {
      console.error("Error fetching checklists:", error);
      setData([]);
      toast.error(error?.response?.data?.message || "Failed to fetch checklists");
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchChecklists();
  }, [fetchChecklists]);

  const filtered = data.filter((item) => {
    if (tab === "active") return item.active;
    if (tab === "inactive") return !item.active;
    return true;
  });

  const handleEdit = (item) => {
    const isAuto =
      item?.checkType === 1 ||
      String(item?.checklistType || "").toLowerCase() === "auto";

    navigate(
      `/config/resolve/checklist/create/${isAuto ? "automatic" : "manual"}?mode=edit&id=${item.id}`
    );
  };

  const handleDelete = async (checklistId) => {
    if (!checklistId || deletingId) return;

    try {
      setDeletingId(checklistId);
      await axiosInstance.delete(`/config/deleteChecklist/${checklistId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      setData((prev) => prev.filter((item) => item.id !== checklistId));
      toast.success("Checklist deleted successfully");
    } catch (error) {
      console.error("Error deleting checklist:", error);
      toast.error(error?.response?.data?.message || "Failed to delete checklist");
    } finally {
      setDeletingId("");
    }
  };

  const handleToggleStatus = async (item) => {
    if (!item?.id || togglingId) return;

    const nextStatus = !item.active;

    try {
      setTogglingId(item.id);
      await axiosInstance.put(
        `/config/update-checklist-status/${item.id}?status=${nextStatus}`,
        {},
        {
          meta: { auth: "ADMIN_AUTH" },
        }
      );

      setData((prev) =>
        prev.map((checklist) =>
          checklist.id === item.id ? { ...checklist, active: nextStatus } : checklist
        )
      );
      toast.success("Checklist status updated successfully");
    } catch (error) {
      console.error("Error updating checklist status:", error);
      toast.error(error?.response?.data?.message || "Failed to update checklist status");
    } finally {
      setTogglingId("");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Checklist</h1>
          <p className="text-sm text-muted-foreground">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCreateMenu((prev) => !prev)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create +
          </button>

          {showCreateMenu && (
            <>
              <div
                className="fixed inset-0 z-10 bg-black/30"
                onClick={() => setShowCreateMenu(false)}
              />

              <div className="absolute right-0 top-12 z-20 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg animate-scale-in">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateMenu(false);
                    navigate("/config/resolve/checklist/create/automatic?type=auto");
                  }}
                  className="w-full text-left px-5 py-4 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    Auto Triggered (event based)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Checklist will be activated automatically on the selected events.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowCreateMenu(false);
                    navigate("/config/resolve/checklist/create/manual?type=manual");
                  }}
                  className="w-full text-left px-5 py-4 hover:bg-gray-100 transition-colors rounded-b-lg border-t border-gray-200"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    Manual Triggered (date based)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Quickly assign one-time checklists with an option to choose from
                    pre-created ones.
                  </p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex border border-border rounded-lg overflow-hidden">
          {["all", "active", "inactive"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`px-5 py-2 text-sm font-medium capitalize transition-colors ${
                tab === item
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item === "all" ? "All" : item === "active" ? "Active" : "Inactive"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_100px] gap-4 px-5 py-3 text-sm text-muted-foreground font-medium border-b border-border">
        <span>Checklist Title</span>
        <span>Description</span>
        <span>Trigger Event</span>
        <span>Assigned Employee</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3 mt-3">
        {loading && (
          <div className="py-10 text-center text-sm text-muted-foreground">Loading...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No data found
          </div>
        )}

        {!loading &&
          filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_100px] gap-4 items-center px-5 py-4 border border-border rounded-lg bg-background hover:shadow-sm transition-shadow animate-fade-in"
            >
              <span className="text-sm font-medium text-foreground">{item.title}</span>
              <span className="text-sm text-foreground">{item.description}</span>
              <span className="text-sm text-foreground">{item.triggerEvent}</span>

              <div>
                {item.assignedCount > 0 ? (
                  <span className="text-sm text-foreground">
                    {item.assignedCount} Employees
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No Employee Assigned
                  </span>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(item)}
                  disabled={togglingId === item.id}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full px-1 transition-colors ${
                    item.active ? "bg-blue-600" : "bg-gray-300"
                  } disabled:opacity-60`}
                  aria-label={`Set checklist ${item.active ? "inactive" : "active"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      item.active ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Checklist;
