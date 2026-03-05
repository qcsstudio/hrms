import { useState } from "react";
import { useNavigate } from "react-router-dom";

const businessUnits = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Operations"];
const clusters = ["Cluster A", "Cluster B", "Cluster C"];

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [cluster, setCluster] = useState("");
  const [visibleFrom, setVisibleFrom] = useState("");
  const [visibleTo, setVisibleTo] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSave = () => {
    alert("Policy created successfully!");
    navigate("/config/resolve/policy-center/list");
  };

  return (
    <div className="max-w-[900px] animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">Policy center</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Manage employee directory, documents, and role-based actions.
      </p>

      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Policy Name</p>
          <input
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            placeholder="Choose Account"
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <label className="px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors border-l border-input">
            Browse
            <input type="file" onChange={handleFileChange} className="sr-only" />
          </label>
        </div>

        {/* Business unit + Cluster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Select business units / departments to assign this policy to
            </p>
            <select
              value={businessUnit}
              onChange={(e) => setBusinessUnit(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose Account</option>
              {businessUnits.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">Select Cluster</p>
            <select
              value={cluster}
              onChange={(e) => setCluster(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose Account</option>
              {clusters.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
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
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">Visible to</p>
            <input
              type="date"
              value={visibleTo}
              onChange={(e) => setVisibleTo(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={() => navigate("/policy-center")}
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
      </div>
    </div>
  );
};

export default CreatePolicy;