import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../../utils/axios.config";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getCreatedByName = (item = {}) =>
  item?.createdBy?.fullName ||
  item?.createdBy?.name ||
  item?.adminId?.fullName ||
  item?.adminId?.name ||
  item?.createdByName ||
  "-";

const getLocationName = (item = {}) =>
  item?.locationName ||
  item?.officeName ||
  item?.officeId?.locationName ||
  item?.companyOfficeId?.locationName ||
  item?.companyOfficeId?.[0]?.locationName ||
  item?.locationId?.locationName ||
  item?.locationId?.[0]?.locationName ||
  "";

const getStatusLabel = (item = {}) => {
  if (typeof item?.status === "string" && item.status.trim()) {
    return item.status;
  }

  if (item?.status === true || item?.isActive === true) {
    return "Active";
  }

  if (item?.status === false || item?.isActive === false) {
    return "Draft";
  }

  return "Active";
};

const mapSalaryStructure = (item = {}) => ({
  id: item?._id || item?.id || item?.name,
  name: item?.name || item?.salaryStructureName || "-",
  components:
    (Array.isArray(item?.income) ? item.income.length : 0) +
    (item?.deduction ? 1 : 0),
  createdBy: getCreatedByName(item),
  assignedEmployees:
    item?.assignedEmployeesCount ||
    item?.assignedEmployeeCount ||
    (Array.isArray(item?.assignedEmployees) ? item.assignedEmployees.length : 0) ||
    0,
  createdAt: formatDate(item?.createdAt),
  status: getStatusLabel(item),
  location: getLocationName(item),
});

const Listsalarystructure = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("Active");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [salaryStructures, setSalaryStructures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSalaryStructures = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/config/get-ALL_salaryStructure", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const list = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data?.salaryStructures)
          ? response.data.salaryStructures
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setSalaryStructures(list.map(mapSalaryStructure));
      } catch (error) {
        console.error("Error fetching salary structures:", error);
        setSalaryStructures([]);
        toast.error(error?.response?.data?.message || "Failed to fetch salary structures");
      } finally {
        setLoading(false);
      }
    };
    fetchSalaryStructures();
  }, [axiosInstance]);

  const filteredPolicies = useMemo(() => {
    return salaryStructures.filter((policy) => {
      const statusMatch = policy.status === statusFilter;
      const locationMatch = !selectedLocation || policy.location === selectedLocation;
      return statusMatch && locationMatch;
    });
  }, [salaryStructures, statusFilter, selectedLocation]);

  const locationOptions = useMemo(() => {
    return Array.from(
      new Set(
        salaryStructures
          .map((item) => item.location)
          .filter(Boolean)
      )
    );
  }, [salaryStructures]);

  const handleClear = () => {
    setSelectedLocation("");
    setStatusFilter("Active");
  };

  const handleCreate = () => {
    navigate(
      `/config/pay/payroll/salary-Structure/create?country=${encodeURIComponent(
        selectedCountry
      )}&office=${applyAll ? "ALL" : encodeURIComponent(selectedOffice)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Salary Structure</h1>

          <button
            onClick={() => setShowDialog(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
            {["Active", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-1.5 text-sm rounded-md transition ${
                  statusFilter === tab ? "bg-white shadow font-medium" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white"
            >
              <option value="">All Locations</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <button
              onClick={handleClear}
              className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100"
            >
              Clear X
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="text-left text-sm text-gray-500 border-b">
              <tr>
                <th className="p-4">Salary Structure Name</th>
                <th className="p-4">Components</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Assigned</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-gray-400">
                    Loading salary structures...
                  </td>
                </tr>
              )}

              {!loading && filteredPolicies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-gray-400">
                    No data found
                  </td>
                </tr>
              )}

              {!loading &&
                filteredPolicies.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="p-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-gray-500">{s.createdAt}</div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold">{s.components}</td>

                    <td className="p-4">{s.createdBy}</td>

                    <td className="p-4">{s.assignedEmployees}</td>

                    <td className="p-4 text-right">
                      <button className="text-blue-600">Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowDialog(false)}
            onContinue={handleCreate}
          />,
          document.body
        )}
    </div>
  );
};

export default Listsalarystructure;
