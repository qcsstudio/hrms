import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const CreatePolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [assignPolicy, setAssignPolicy] = useState("");
  const [visibleFrom, setVisibleFrom] = useState("");
  const [visibleTo, setVisibleTo] = useState("");
  const [businessUnits, setBusinessUnits] = useState([]);
  const [clusters, setClusters] = useState([]);
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const policyId = queryParams.get("id") || "";
  const mode = queryParams.get("mode") || "create";
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [businessUnitRes, departmentRes] = await Promise.all([
          axiosInstance.get("/config/all-buinessUnit", {
            meta: { auth: "ADMIN_AUTH" },
          }),
          axiosInstance.get("/config/all-department", {
            meta: { auth: "ADMIN_AUTH" },
          }),
        ]);

        setBusinessUnits(Array.isArray(businessUnitRes?.data?.data) ? businessUnitRes.data.data : []);
        setClusters(Array.isArray(departmentRes?.data?.data) ? departmentRes.data.data : []);
      } catch (error) {
        console.log("policy center options error", error);
        setBusinessUnits([]);
        setClusters([]);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchPolicy = async () => {
      if (!policyId) return;

      try {
        const res = await axiosInstance.get(`/config/get-policy-center/${policyId}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        const item = res?.data?.data || res?.data || {};

        setPolicyName(item?.policyName || "");
        setDescription(item?.description || "");
        setAssignPolicy(item?.AssignPolicy || "");
        setVisibleFrom(
          item?.visibleFrom ? new Date(item.visibleFrom).toISOString().slice(0, 10) : ""
        );
        setVisibleTo(
          item?.visibleTo ? new Date(item.visibleTo).toISOString().slice(0, 10) : ""
        );
        setFileName(item?.fileName || item?.file || "");
      } catch (error) {
        console.log("policy center detail error", error);
      }
    };

    fetchPolicy();
  }, [policyId]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const savePolicy = async (url) => {
    const formData = new FormData();
    const businessUnitIds = businessUnits
      .map((item) => item?._id || item?.id)
      .filter(Boolean);
    const departmentIds = clusters
      .map((item) => item?._id || item?.id)
      .filter(Boolean);

    formData.append("policyName", policyName.trim());
    formData.append("description", description.trim());
    formData.append("AssignPolicy", assignPolicy);
    formData.append("visibleFrom", visibleFrom ? new Date(visibleFrom).toISOString() : "");
    formData.append(
      "visibleTo",
      visibleTo
        ? new Date(`${visibleTo}T23:59:59.000`).toISOString()
        : ""
    );

    if (assignPolicy === "BusinessUnit") {
      businessUnitIds.forEach((id) => {
        formData.append("businessUnits[]", id);
      });
    }

    if (assignPolicy === "Department") {
      departmentIds.forEach((id) => {
        formData.append("departments[]", id);
      });
    }

    if (file) {
      formData.append("file", file);
    }

    try {
      await axiosInstance.post(url, formData, {
        meta: { auth: "ADMIN_AUTH" },
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/config/resolve/policy-center/list");
    } catch (error) {
      console.log("policy center save error", error);
    }
  };

  const handleSave = async () => {
    await savePolicy("/config/create-policy-center");
  };

  const handleUpdate = async () => {
    if (!policyId) return;
    await savePolicy(`/config/update-policy-center/${policyId}`);
  };

  return (
    <div className="max-w-[900px] animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">Policy center</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Manage employee directory, documents, and role-based actions.
      </p>

      {isEditMode && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleUpdate}
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Update
          </button>
        </div>
      )}

      {isViewMode && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/config/resolve/policy-center/list")}
            className="rounded-md border border-input px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Back
          </button>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Policy Name</p>
          <input
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            disabled={isViewMode}
            placeholder="Choose Account"
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isViewMode}
            placeholder="Choose Account"
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* File upload */}
        <div className="flex items-center border border-input rounded-md overflow-hidden">
          <div className="flex-1 px-4 py-3">
            <span className="text-sm text-foreground">Upload policy document(s)</span>
          </div>
          <span className="text-sm text-muted-foreground px-3">
            {fileName || "No file chosen"}
          </span>
          <label className={`px-4 py-3 text-sm font-semibold text-foreground transition-colors border-l border-input ${isViewMode ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-muted"}`}>
            Browse
            <input type="file" onChange={handleFileChange} className="sr-only" disabled={isViewMode} />
          </label>
        </div>

        {/* Business unit + Cluster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Select business units / departments to assign this policy to
            </p>
            <select
              value={assignPolicy}
              onChange={(e) => setAssignPolicy(e.target.value)}
              disabled={isViewMode}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose Account</option>
              <option value="BusinessUnit">Business Unit</option>
              <option value="Department">Department</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">Select Cluster</p>
            <select
              value={
                assignPolicy === "BusinessUnit"
                  ? "All Business Units"
                  : assignPolicy === "Department"
                  ? "All Departments"
                  : ""
              }
              onChange={() => {}}
              disabled
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose Account</option>
              {assignPolicy === "BusinessUnit" && (
                <option value="All Business Units">All Business Units</option>
              )}
              {assignPolicy === "Department" && (
                <option value="All Departments">All Departments</option>
              )}
            </select>
          </div>
        </div>

        {/* Visible dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Visible from</p>
            <input
              type="date"
              value={visibleFrom}
              onChange={(e) => setVisibleFrom(e.target.value)}
              disabled={isViewMode}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">Visible to</p>
            <input
              type="date"
              value={visibleTo}
              onChange={(e) => setVisibleTo(e.target.value)}
              disabled={isViewMode}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {!isEditMode && !isViewMode && (
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={() => navigate("/config/resolve/policy-center/list")}
              className="rounded-md border border-input px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePolicy;
