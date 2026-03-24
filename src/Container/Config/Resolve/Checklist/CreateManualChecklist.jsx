import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import createAxios from "../../../../utils/axios.config";

const purposes = ["Onboarding", "Offboarding", "Promotion"];
const activityTypes = [
  "Task",
  "Message",
  "Media File",
  "Link",
  "Upload Request",
  "Dependency Task",
];

const getActivityList = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data?.activities)) return response.data.activities;
  return [];
};

const mapActivity = (item = {}) => ({
  id: item?._id || item?.id || `${item?.title}-${item?.type}`,
  type: item?.type || "-",
  title: item?.title || "-",
  description: item?.description || "",
  file: item?.file || "",
  dueDays: item?.dueDays ?? 0,
  link: item?.link || "",
});

export default function CreateManualChecklist() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const editChecklistId = searchParams.get("id") || "";

  const [step, setStep] = useState(1);
  const [isSubmittingDefine, setIsSubmittingDefine] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [deletingActivityId, setDeletingActivityId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [checklistId, setChecklistId] = useState("");

  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [dueDays, setDueDays] = useState(0);
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const resetActivityForm = () => {
    setEditingActivityId("");
    setActivityType("");
    setActivityTitle("");
    setActivityDesc("");
    setDueDays(0);
    setFile("");
    setLink("");
    setShowForm(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees/all", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const list = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setEmployees(
          list
            .map((item) => {
              const id = item?._id || item?.id || "";
              const fullName =
                item?.fullName ||
                item?.employee?.fullName ||
                `${item?.firstName || ""} ${item?.lastName || ""}`.trim();

              if (!id || !fullName) return null;
              return { value: id, label: fullName };
            })
            .filter(Boolean)
        );
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to load employees");
      }
    };

    fetchEmployees();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchChecklistDetails = async () => {
      if (!editChecklistId) return;

      try {
        const response = await axiosInstance.get(`/config/getOneChecklist/${editChecklistId}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const checklist =
          response?.data?.data || response?.data?.checklist || response?.data || {};

        setChecklistId(checklist?._id || checklist?.id || editChecklistId);
        setTitle(checklist?.title || "");
        setDescription(checklist?.description || "");
        setPurpose(checklist?.purpose || "");
      } catch (error) {
        console.error("Error fetching checklist details:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch checklist details");
      }
    };

    fetchChecklistDetails();
  }, [axiosInstance, editChecklistId]);

  const fetchActivities = async (currentChecklistId) => {
    if (!currentChecklistId) return;

    try {
      setIsLoadingActivities(true);
      const response = await axiosInstance.get(`/config/getActivities/${currentChecklistId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      setActivities(getActivityList(response).map(mapActivity));
    } catch (error) {
      console.error("Error fetching manual checklist activities:", error);
      setActivities([]);
      toast.error(error?.response?.data?.message || "Failed to fetch activities");
    } finally {
      setIsLoadingActivities(false);
    }
  };

  const handleDefineNext = async () => {
    if (!title.trim()) {
      toast.error("Checklist title is required");
      return;
    }

    if (!purpose) {
      toast.error("Please select checklist purpose");
      return;
    }

    if (checklistId) {
      setStep(2);
      fetchActivities(checklistId);
      return;
    }

    const payload = {
      checkType: 2,
      title: title.trim(),
      description: description.trim(),
      purpose,
    };

    try {
      setIsSubmittingDefine(true);
      const response = await axiosInstance.post("/config/createChecklist", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      const newChecklistId =
        response?.data?.data?._id || response?.data?._id || response?.data?.checklistId || "";

      if (!newChecklistId) {
        throw new Error("Checklist ID not found in create response");
      }

      setChecklistId(newChecklistId);
      toast.success("Checklist define step saved successfully");
      setStep(2);
      fetchActivities(newChecklistId);
    } catch (error) {
      console.error("Error creating manual checklist:", error);
      toast.error(error?.response?.data?.message || "Failed to create checklist");
    } finally {
      setIsSubmittingDefine(false);
    }
  };

  const handleAddOrUpdateActivity = async () => {
    if (!checklistId) {
      toast.error("Checklist not created yet");
      return;
    }

    if (!activityType || !activityTitle.trim()) {
      toast.error("Activity type and title are required");
      return;
    }

    const payload = {
      type: activityType,
      title: activityTitle.trim(),
      description: activityDesc.trim(),
      file: file.trim(),
      dueDays: Number(dueDays) || 0,
      link: link.trim(),
    };

    try {
      setIsAddingActivity(true);
      if (editingActivityId) {
        await axiosInstance.put(
          `/config/updateActivity/${checklistId}/${editingActivityId}`,
          payload,
          { meta: { auth: "ADMIN_AUTH" } }
        );
      } else {
        await axiosInstance.post(`/config/addActivity/${checklistId}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      toast.success(
        editingActivityId ? "Activity updated successfully" : "Activity added successfully"
      );
      resetActivityForm();
      fetchActivities(checklistId);
    } catch (error) {
      console.error("Error submitting activity:", error);
      toast.error(
        error?.response?.data?.message ||
          (editingActivityId ? "Failed to update activity" : "Failed to add activity")
      );
    } finally {
      setIsAddingActivity(false);
    }
  };

  const handleEditActivity = async (activityId) => {
    if (!activityId) return;

    try {
      const response = await axiosInstance.get(`/config/get-one-Activity/${activityId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      const activity =
        response?.data?.data || response?.data?.activity || response?.data || {};

      setEditingActivityId(activity?._id || activity?.id || activityId);
      setActivityType(activity?.type || "");
      setActivityTitle(activity?.title || "");
      setActivityDesc(activity?.description || "");
      setDueDays(activity?.dueDays ?? 0);
      setFile(activity?.file || "");
      setLink(activity?.link || "");
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching activity:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch activity");
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!checklistId || !activityId || deletingActivityId) return;

    try {
      setDeletingActivityId(activityId);
      await axiosInstance.delete(`/config/deleteActivity/${checklistId}/${activityId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });

      setActivities((prev) => prev.filter((item) => item.id !== activityId));
      toast.success("Activity deleted successfully");
      if (editingActivityId === activityId) {
        resetActivityForm();
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error(error?.response?.data?.message || "Failed to delete activity");
    } finally {
      setDeletingActivityId("");
    }
  };

  const handleAssignChecklist = async () => {
    if (!checklistId) {
      toast.error("Checklist not created yet");
      return;
    }

    if (selectedEmployees.length === 0) {
      toast.error("Please select at least one employee");
      return;
    }

    const payload = {
      employeeIds: selectedEmployees,
      assignedEmployeeList: selectedEmployees,
    };

    try {
      setIsAssigning(true);
      await axiosInstance.post(`/config/assignEmployee/${checklistId}`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success("Checklist assigned successfully");
      navigate("/config/resolve/checklist/list");
    } catch (error) {
      console.error("Error assigning checklist:", error);
      toast.error(error?.response?.data?.message || "Failed to assign checklist");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pb-28">
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-6">
          <StepItem number={1} label="Define" active={step >= 1} />
          <StepLine active={step >= 2} />
          <StepItem number={2} label="Design" active={step >= 2} />
          <StepLine active={step >= 3} />
          <StepItem number={3} label="Review" active={step >= 3} />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <Field label="Checklist Title">
            <input
              className="w-full border rounded px-3 h-10"
              placeholder="Enter checklist title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>

          <Field label="Checklist Description">
            <textarea
              className="w-full border rounded p-3"
              placeholder="Enter checklist description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>

          <Field label="What is this checklist for?">
            <select
              className="w-full border rounded px-3 h-10"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
            >
              <option value="">Select purpose</option>
              {purposes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div>
          <button
            type="button"
            onClick={() => {
              resetActivityForm();
              setShowForm(true);
            }}
            className="flex items-center gap-3 text-blue-600 font-medium mb-6"
          >
            <span className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full">
              +
            </span>
            Add new activity
          </button>

          {showForm && (
            <div className="border rounded-lg p-6 bg-blue-50 space-y-4">
              <select
                value={activityType}
                onChange={(event) => setActivityType(event.target.value)}
                className="w-64 border rounded h-11 px-3"
              >
                <option value="">Select Activity Type</option>
                {activityTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {activityType && (
                <>
                  <Field label="Title">
                    <input
                      placeholder="Enter title"
                      value={activityTitle}
                      onChange={(event) => setActivityTitle(event.target.value)}
                      className="w-full border rounded h-11 px-3 mt-1"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={activityDesc}
                      onChange={(event) => setActivityDesc(event.target.value)}
                      className="w-full border rounded p-3 h-28 mt-1"
                      placeholder="Enter description"
                    />
                  </Field>

                  {activityType === "Media File" && (
                    <Field label="File URL">
                      <input
                        placeholder="Enter file URL"
                        value={file}
                        onChange={(event) => setFile(event.target.value)}
                        className="w-full border rounded h-11 px-3"
                      />
                    </Field>
                  )}

                  {activityType === "Link" && (
                    <Field label="Link">
                      <input
                        placeholder="Enter URL"
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                        className="w-full border rounded h-11 px-3"
                      />
                    </Field>
                  )}

                  <Field label="Due days after assignment">
                    <input
                      type="number"
                      value={dueDays}
                      onChange={(event) => setDueDays(event.target.value)}
                      className="w-24 border rounded h-11 px-3 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      *Day 0 is the Date of joining
                    </p>
                  </Field>

                  <button
                    type="button"
                    onClick={handleAddOrUpdateActivity}
                    disabled={isAddingActivity}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
                  >
                    {isAddingActivity
                      ? editingActivityId
                        ? "Updating..."
                        : "Adding..."
                      : editingActivityId
                      ? "Update Activity"
                      : "Add"}
                  </button>
                </>
              )}
            </div>
          )}

          <p className="mt-8 text-sm text-gray-500 text-center">
            Activities start on (Date of joining)
          </p>

          {isLoadingActivities && (
            <div className="mt-6 text-center text-sm text-gray-500">Loading activities...</div>
          )}

          {!isLoadingActivities && activities.length === 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">No activities found</div>
          )}

          {!isLoadingActivities &&
            activities.map((activity) => (
              <div key={activity.id} className="border rounded p-4 mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditActivity(activity.id)}
                      className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <FiEdit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(activity.id)}
                      disabled={deletingActivityId === activity.id}
                      className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      {deletingActivityId === activity.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
                {activity.description && (
                  <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
                )}
              </div>
            ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <EmployeeMultiSelect
            label="Assign this checklist to:"
            options={employees}
            values={selectedEmployees}
            onChange={setSelectedEmployees}
          />
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between max-w-5xl mx-auto">
        <button
          type="button"
          onClick={() => (step === 1 ? navigate(-1) : setStep((prev) => prev - 1))}
          className="text-gray-600"
        >
          Cancel
        </button>

        {step === 1 && (
          <button
            type="button"
            onClick={handleDefineNext}
            disabled={isSubmittingDefine}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
          >
            {isSubmittingDefine ? "Saving..." : "Next"}
          </button>
        )}

        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Next
          </button>
        )}

        {step === 3 && (
          <button
            type="button"
            onClick={handleAssignChecklist}
            disabled={isAssigning}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
          >
            {isAssigning ? "Saving..." : "Save"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

function StepItem({ number, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        {number}
      </div>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}

function StepLine({ active }) {
  return <div className={`w-24 h-1 rounded ${active ? "bg-blue-600" : "bg-gray-300"}`} />;
}

function EmployeeMultiSelect({ label, options, values, onChange }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabels = options
    .filter((option) => values.includes(option.value))
    .map((option) => option.label);
  const allSelected = options.length > 0 && values.length === options.length;

  const toggleValue = (value) => {
    onChange(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
  };

  return (
    <div ref={boxRef} className="relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full min-h-[46px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-800 shadow-sm transition-colors hover:border-gray-400"
      >
        <div className="flex items-center justify-between gap-3">
          <span className={selectedLabels.length > 0 ? "text-gray-800" : "text-gray-400"}>
            {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Select employees"}
          </span>
          <span className={`text-xs text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
            v
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          <label className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => onChange(allSelected ? [] : options.map((option) => option.value))}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Select all</span>
          </label>
          <div className="max-h-64 overflow-auto py-1">
            {options.map((option) => {
              const isSelected = values.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="text-xs font-semibold">Selected</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
