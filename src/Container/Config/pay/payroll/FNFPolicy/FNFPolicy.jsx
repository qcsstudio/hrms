import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../../utils/axios.config";

const faq = [
  "What is Gratuity ?",
  "What is Gratuity Act, 1972 ?",
  "When you will Receive Gratuity ?",
  "How is Gratuity Paid ?",
  "Tax on Gratuity Payment ?",
];

const initialForm = {
  policyName: "",
  basicPayDuringNotice: true,
  fnfProcessDays: "",
  payGratuity: true,
  gratuityThresholdYears: "",
  gratuityThresholdMonths: "",
  gratuityNonCTC: true,
};

const getStoredOfficeIds = () => {
  const rawValue =
    localStorage.getItem("companyOfficeId") ||
    localStorage.getItem("officeId") ||
    "";

  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);

    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string" && item.trim());
    }

    if (typeof parsed === "string" && parsed.trim()) {
      return [parsed.trim()];
    }
  } catch (error) {
    if (typeof rawValue === "string" && rawValue.trim()) {
      return [rawValue.trim()];
    }
  }

  return [];
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
};

const getOfficeNames = (item = {}) => {
  const officeSource = item?.companyOfficeId || item?.companyOffice || item?.offices || [];
  const officeList = Array.isArray(officeSource) ? officeSource : [officeSource];

  return officeList
    .map(
      (office) =>
        office?.officeName ||
        office?.locationName ||
        office?.name ||
        office?.country?.name ||
        (typeof office === "string" ? office : "")
    )
    .filter(Boolean);
};

const mapPolicy = (item = {}) => {
  const officeNames = getOfficeNames(item);

  return {
    id: item?._id || item?.id || item?.policyName,
    name: item?.policyName || item?.fnfPolicyName || "-",
    createdDate: formatDate(item?.createdAt || item?.updatedAt),
    createdBy:
      item?.createdBy?.name ||
      item?.createdBy?.fullName ||
      item?.createdBy?.firstName ||
      item?.createdBy ||
      "Admin",
    assignedText:
      item?.assignedEmployeeCount != null
        ? `${item.assignedEmployeeCount} Employees`
        : officeNames.length > 0
        ? officeNames.join(", ")
        : "No Employee Assigned",
  };
};

const RadioChoice = ({ label, selected, onClick, note }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full border rounded-lg p-4 mt-2 flex items-center gap-3 text-left transition-colors ${
      selected ? "border-blue-600 bg-blue-50/40" : "border-gray-200 bg-white"
    }`}
  >
    <span
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        selected ? "border-blue-600" : "border-gray-400"
      }`}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
    </span>
    <span className={selected ? "text-gray-900" : "text-gray-500"}>{label}</span>
    {note && <span className="text-sm text-gray-500">{note}</span>}
  </button>
);

export default function FNFPolicy() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [view, setView] = useState("list");
  const [showFormula, setShowFormula] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState("");
  const [form, setForm] = useState(initialForm);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/config/get-all/fnf-policies", {
        meta: { auth: "ADMIN_AUTH" },
      });

      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.fnfPolicies)
        ? response.data.fnfPolicies
        : Array.isArray(response?.data?.policies)
        ? response.data.policies
        : [];

      setPolicies(list.map(mapPolicy));
    } catch (error) {
      console.error("Error fetching FnF policies:", error);
      setPolicies([]);
      toast.error(error?.response?.data?.message || "Failed to fetch FnF policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedCountry("");
    setSelectedOffice("");
    setApplyAll(false);
    setExpanded(null);
    setIsEditMode(false);
    setEditingPolicyId("");
    localStorage.removeItem("companyOfficeId");
  };

  const handleCreateContinue = (selection = {}) => {
    setIsEditMode(false);
    setEditingPolicyId("");
    setForm(initialForm);
    setSelectedCountry(selection.country || "");
    setSelectedOffice(selection.office || "");
    setApplyAll(Boolean(selection.applyAll));
    setShowCreateDialog(false);
    setView("create");
  };

  const handleEdit = async (policyId) => {
    if (!policyId) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/config/get-one/fnf-policy/${policyId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      const item = response?.data?.data || response?.data?.fnfPolicy || response?.data || {};
      const officeIds = Array.isArray(item?.companyOfficeId)
        ? item.companyOfficeId.filter((officeId) => typeof officeId === "string" && officeId.trim())
        : [];

      localStorage.setItem("companyOfficeId", JSON.stringify(officeIds));

      setForm({
        policyName: item?.policyName || "",
        basicPayDuringNotice: Boolean(item?.basicPayDuringNotice),
        fnfProcessDays: item?.fnfProcessDays ?? "",
        payGratuity:
          item?.payGratuity === undefined ? true : Boolean(item?.payGratuity),
        gratuityThresholdYears: item?.gratuityThresholdYears ?? "",
        gratuityThresholdMonths: item?.gratuityThresholdMonths ?? "",
        gratuityNonCTC:
          item?.gratuityNonCTC === undefined ? true : Boolean(item?.gratuityNonCTC),
      });
      setIsEditMode(true);
      setEditingPolicyId(item?._id || item?.id || policyId);
      setSelectedCountry("");
      setSelectedOffice("");
      setApplyAll(officeIds.length > 1);
      setView("create");
    } catch (error) {
      console.error("Error fetching FnF policy details:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch FnF policy details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const companyOfficeId = getStoredOfficeIds();

    if (!form.policyName.trim()) {
      toast.error("Please enter policy name");
      return;
    }

    if (!companyOfficeId.length) {
      toast.error("Please select country and office");
      return;
    }

    const payload = {
      policyName: form.policyName.trim(),
      basicPayDuringNotice: Boolean(form.basicPayDuringNotice),
      fnfProcessDays: Number(form.fnfProcessDays) || 0,
      payGratuity: Boolean(form.payGratuity),
      gratuityThresholdYears: Number(form.gratuityThresholdYears) || 0,
      gratuityThresholdMonths: Number(form.gratuityThresholdMonths) || 0,
      gratuityNonCTC: Boolean(form.gratuityNonCTC),
      companyOfficeId,
    };

    try {
      setSaving(true);
      if (isEditMode && editingPolicyId) {
        await axiosInstance.put(`/config/update/fnf-policy/${editingPolicyId}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/create/fnf-policy", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      toast.success(
        isEditMode ? "FnF policy updated successfully" : "FnF policy created successfully"
      );
      resetForm();
      setView("list");
      fetchPolicies();
    } catch (error) {
      console.error("Error submitting FnF policy:", error);
      toast.error(
        error?.response?.data?.message ||
          (isEditMode ? "Failed to update FnF policy" : "Failed to create FnF policy")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (policyId) => {
    if (!policyId || deletingId) return;

    try {
      setDeletingId(policyId);
      await axiosInstance.delete(`/config/delete/fnf-policy/${policyId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      setPolicies((prev) => prev.filter((item) => item.id !== policyId));
      toast.success("FnF policy deleted successfully");
    } catch (error) {
      console.error("Error deleting FnF policy:", error);
      toast.error(error?.response?.data?.message || "Failed to delete FnF policy");
    } finally {
      setDeletingId("");
    }
  };

  if (view === "list") {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">FnF Policy</h1>
            <p className="text-gray-500 text-sm">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            Create +
          </button>
        </div>

        <div className="grid grid-cols-4 text-sm text-gray-500 border-b pb-3">
          <span>FNF Policy Name</span>
          <span>Created By</span>
          <span>Assigned Employee</span>
          <span className="text-right">Action</span>
        </div>

        <div className="space-y-4 mt-4">
          {loading && (
            <div className="py-10 text-center text-sm text-gray-500">Loading...</div>
          )}

          {!loading && policies.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">No data found</div>
          )}

          {!loading &&
            policies.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center border rounded-lg p-4 bg-white"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.createdDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-700">{item.createdBy}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-700">{item.assignedText}</p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(item.id)}
                    className="inline-flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                  >
                    <FiEdit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="inline-flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-red-600 disabled:opacity-60"
                  >
                    <FiTrash2 className="h-4 w-4" />
                    <span>{deletingId === item.id ? "Deleting..." : "Delete"}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {showCreateDialog &&
          createPortal(
            <CreateCountryPopup
              onClose={() => setShowCreateDialog(false)}
              onContinue={handleCreateContinue}
            />,
            document.body
          )}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 relative">
      <div>
        <h1 className="text-2xl font-semibold">FnF Policy</h1>
        <p className="text-gray-500 text-sm">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
        {isEditMode ? "Editing selected FnF policy." : "Country:"}{" "}
        <span className="font-medium text-gray-900">
          {isEditMode ? form.policyName || "-" : selectedCountry || "-"}
        </span>{" "}
        {applyAll ? "(All Offices)" : selectedOffice ? `- ${selectedOffice}` : ""}
      </div>

      <div>
        <label className="text-sm font-medium">FnF policy name</label>
        <input
          value={form.policyName}
          onChange={(event) => updateForm("policyName", event.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-1"
          placeholder="Enter policy name"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Basic Pay</label>

        <RadioChoice
          label="Yes"
          selected={form.basicPayDuringNotice}
          onClick={() => updateForm("basicPayDuringNotice", true)}
        />

        <RadioChoice
          label="No"
          selected={!form.basicPayDuringNotice}
          onClick={() => updateForm("basicPayDuringNotice", false)}
          note="Employee will continue to receive salary during notice period"
        />
      </div>

      <div>
        <label className="text-sm">
          How many days after exit date do you want to process FnF payments?
        </label>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="0"
            value={form.fnfProcessDays}
            onChange={(event) => updateForm("fnfProcessDays", event.target.value)}
            className="border rounded-lg px-4 py-2 w-48"
            placeholder="Enter days"
          />
          <span className="text-gray-500 text-sm">Days</span>
        </div>
      </div>

      <div>
        <label className="text-sm">
          Would you like to pay accrual Gratuity to employees?
        </label>

        <RadioChoice
          label="Yes"
          selected={form.payGratuity}
          onClick={() => updateForm("payGratuity", true)}
        />

        <RadioChoice
          label="No"
          selected={!form.payGratuity}
          onClick={() => updateForm("payGratuity", false)}
        />

        <div className="mt-4">
          <label className="text-sm">
            What is the threshold years & months for payment of accrued Gratuity?
          </label>

          <div className="flex gap-3 mt-2">
            <input
              type="number"
              min="0"
              value={form.gratuityThresholdYears}
              onChange={(event) => updateForm("gratuityThresholdYears", event.target.value)}
              className="border rounded-lg px-4 py-2 w-40"
              placeholder="Years"
            />
            <input
              type="number"
              min="0"
              value={form.gratuityThresholdMonths}
              onChange={(event) => updateForm("gratuityThresholdMonths", event.target.value)}
              className="border rounded-lg px-4 py-2 w-40"
              placeholder="Months"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm">
            Would you like to pay Gratuity to employee as a Non-CTC payment and with
            no-impact on their salary breakdown?
          </label>

          <RadioChoice
            label="Yes"
            selected={form.gratuityNonCTC}
            onClick={() => updateForm("gratuityNonCTC", true)}
          />

          <RadioChoice
            label="No"
            selected={!form.gratuityNonCTC}
            onClick={() => updateForm("gratuityNonCTC", false)}
          />

          <div className="space-y-3 mt-4">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <span>Want to learn more about how gratuity is calculated?</span>

              <button
                type="button"
                onClick={() => setShowFormula(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                View Formula
              </button>
            </div>

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <span>Have further questions about Gratuity?</span>

              <button
                type="button"
                onClick={() => setShowLearn(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => {
            resetForm();
            setView("list");
          }}
          className="border px-5 py-2 rounded"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-60"
        >
          {saving ? (isEditMode ? "Updating..." : "Saving...") : isEditMode ? "Update" : "Save"}
        </button>
      </div>

      {showFormula &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowFormula(false)}
            />

            <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Gratuity Formula</h2>
                <button type="button" onClick={() => setShowFormula(false)}>
                  X
                </button>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg space-y-4">
                <p className="text-sm">
                  Gratuity is calculated differently based on the number of employees.
                </p>

                <div>
                  <p className="text-sm font-medium">Employee count &gt; 10</p>
                  <div className="border rounded-lg p-3 mt-1 text-sm bg-white">
                    (15 x Salary x Working Years) / 26
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Employee Count &lt;= 10</p>
                  <div className="border rounded-lg p-3 mt-1 text-sm bg-white">
                    (15 x Salary x Working Years) / 30
                  </div>
                </div>

                <p className="text-sm">
                  *Remainder period of over 6 months will be counted as 1 working year.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

      {showLearn &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowLearn(false)}
            />

            <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Learn More About Gratuity</h2>
                <button type="button" onClick={() => setShowLearn(false)}>
                  X
                </button>
              </div>

              {faq.map((item, index) => (
                <div key={item} className="border rounded-lg mb-3">
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === index ? null : index)}
                    className="w-full flex justify-between items-center p-3"
                  >
                    {item}
                    <span>{expanded === index ? "^" : "v"}</span>
                  </button>

                  {expanded === index && (
                    <div className="p-3 text-sm text-gray-600 border-t">
                      Example explanation text about gratuity.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
