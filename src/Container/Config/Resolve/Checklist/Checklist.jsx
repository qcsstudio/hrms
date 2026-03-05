import { useState } from "react";
import { useNavigate } from "react-router-dom";

const avatarUrls = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
];

const initialData = [
  {
    id: 1,
    title: "Onboarding Checklist",
    description: "New hire setup",
    triggerEvent: "Date of Joining",
    assignedCount: 12,
    hasEmployees: true,
    active: true,
  },
  {
    id: 2,
    title: "Offboarding Checklist",
    description: "Exit process",
    triggerEvent: "Date of Resignation",
    assignedCount: 0,
    hasEmployees: false,
    active: false,
  },
];

const Checklist = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [data, setData] = useState(initialData);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const filtered = data.filter((d) => {
    if (tab === "active") return d.active;
    if (tab === "inactive") return !d.active;
    return true;
  });

  const toggleStatus = (id) => {
    setData((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Checklist</h1>
          <p className="text-sm text-muted-foreground">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Create Button */}
        <div className="relative">
          <button
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create +
          </button>

          {showCreateMenu && (
            <>
              {/* Overlay Background */}
              <div
                className="fixed inset-0 z-10 bg-black/30"
                onClick={() => setShowCreateMenu(false)}
              />

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 z-20 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg animate-scale-in">
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    navigate(
                      "/config/resolve/checklist/create/automatic?type=auto",
                    );
                  }}
                  className="w-full text-left px-5 py-4 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    Auto Triggered (event based)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Checklist will be activated automatically on the selected
                    events.
                  </p>
                </button>

                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    navigate(
                      "/config/resolve/checklist/create/manual?type=manual",
                    );
                  }}
                  className="w-full text-left px-5 py-4 hover:bg-gray-100 transition-colors rounded-b-lg border-t border-gray-200"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    Manual Triggered (date based)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Quickly assign one-time checklists with an option to choose
                    from pre-created ones.
                  </p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex border border-border rounded-lg overflow-hidden">
          {["all", "active", "inactive"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "All" : t === "active" ? "Active" : "Inactive"}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_80px] gap-4 px-5 py-3 text-sm text-muted-foreground font-medium border-b border-border">
        <span>Checklist Title</span>
        <span>Description</span>
        <span>Trigger Event</span>
        <span>Assigned Employee</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-3 mt-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_80px] gap-4 items-center px-5 py-4 border border-border rounded-lg bg-background hover:shadow-sm transition-shadow animate-fade-in"
          >
            <span className="text-sm font-medium text-foreground">
              {item.title}
            </span>
            <span className="text-sm text-foreground">{item.description}</span>
            <span className="text-sm text-foreground">{item.triggerEvent}</span>

            <div>
              {item.hasEmployees ? (
                <div className="flex items-center">
                  {avatarUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-background -ml-2 first:ml-0 object-cover"
                    />
                  ))}
                  <span className="w-8 h-8 rounded-full bg-foreground text-background text-xs font-medium flex items-center justify-center -ml-2">
                    +{item.assignedCount}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  No Employee Assigned
                </span>
              )}
            </div>

            {/* Toggle */}
            <button
              onClick={() => toggleStatus(item.id)}
              className={`w-14 h-8 flex items-center rounded-full px-1 transition-all duration-300 shrink-0 ${
                item.active ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  item.active ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
