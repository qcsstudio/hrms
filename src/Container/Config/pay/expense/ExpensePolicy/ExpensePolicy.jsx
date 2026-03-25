import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../../utils/axios.config";

const mapExpensePolicy = (item = {}) => ({
  id: item?._id || item?.id || "",
  name: item?.policyName || item?.name || "-",
  monthlyLimit:
    item?.monthlyLimit != null && item?.monthlyLimit !== ""
      ? `₹  ${item.monthlyLimit}`
      : "-",
  createdBy: item?.createdBy?.employeeName || item?.createdBy?.name || "-",
  assignedCount:
    item?.assignedEmployeeList?.length ?? 0,
  location:
    item?.companyOfficeId?.[0]?.locationName ||
    item?.companyOfficeId?.[0]?.address?.country ||
    item?.country ||
    "",
  status:
    item?.status === false ||
    item?.status === "inactive" ||
    item?.isActive === false ||
    item?.isDeleted === true
      ? "Inactive"
      : "Active",
});

const ExpensePolicy = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [tab, setTab] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const tabs = ["All", "Active", "Inactive"];

  useEffect(() => {
    const fetchExpensePolicies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/config/GetAll/expensePolicy", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const rawPolicies = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setPolicies(rawPolicies.map((item) => mapExpensePolicy(item)));
      } catch (error) {
        console.error("Error fetching expense policies:", error);
        setPolicies([]);
        toast.error(error?.response?.data?.message || "Failed to load expense policies");
      } finally {
        setLoading(false);
      }
    };

    fetchExpensePolicies();
  }, [axiosInstance]);

  const locations = useMemo(() => {
    return Array.from(new Set(policies.map((item) => item.location).filter(Boolean)));
  }, [policies]);

  const visiblePolicies = useMemo(() => {
    return policies.filter((item) => {
      const statusMatch = tab === "All" ? true : item.status === tab;
      const locationMatch = selectedLocation ? item.location === selectedLocation : true;
      return statusMatch && locationMatch;
    });
  }, [policies, selectedLocation, tab]);

  const handleClear = () => {
    setSelectedLocation("");
    setTab("All");
  };

  const handleCreate = () => {
    navigate("/config/pay/expensive/create-expense-policy");
  };

  const handleDelete = async (policyId) => {
    if (!policyId) return;

    try {
      setDeletingId(policyId);
      await axiosInstance.patch(`/config/delete-expensePolicy/${policyId}`, null, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setPolicies((prev) => prev.filter((item) => item.id !== policyId));
      toast.success("Expense policy deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete expense policy");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Expense Policy</h1>
          <p className="text-sm text-gray-500" />
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="rounded-md bg-blue-600 px-5 py-2 text-white"
        >
          Create +
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        {/* <div className="flex overflow-hidden rounded-md border">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 text-sm font-medium ${
                tab === item
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div> */}

        <div className="flex float-end  gap-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <button onClick={handleClear} className="rounded-lg border px-4 py-2">
            Clear   
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_140px_120px_1fr_80px] gap-4 border-b py-3 text-sm font-medium text-muted-foreground">
        <span>Policy Name</span>
        <span>Monthly Limit</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Action</span>
      </div>

      {loading && (
        <div className="py-6 text-center text-sm text-gray-400">Loading...</div>
      )}

      {!loading && visiblePolicies.length === 0 && (
        <div className="py-6 text-center text-sm text-gray-400">No records found</div>
      )}

      {!loading &&
        visiblePolicies.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_140px_120px_1fr_80px] items-center gap-4 border-b py-4"
          >
            <span className="text-sm font-medium">{row.name}</span>
            <span className="text-sm">{row.monthlyLimit}</span>

            <div className="text-sm text-gray-600">{row.createdBy}</div>

            <div className="text-sm text-gray-600">
              {row.assignedCount > 0 ? `${row.assignedCount} Employees` : "No Employee Assigned"}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (row.id) {
                    navigate(`/config/pay/expensive/edit-expense-policy/${row.id}`);
                  }
                }}
                className="rounded-md p-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                disabled={deletingId === row.id}
                className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === row.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}

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

export default ExpensePolicy;
