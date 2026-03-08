import { useState } from "react";
import { useNavigate } from "react-router-dom";
const defaultTemplates = [
  { id: 1, name: "Annual Increment Letter", category: "Increments/Bonuses", active: true },
  { id: 2, name: "Granting a Raise after Request", category: "Increments/Bonuses", active: true },
];

export default function Template() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("qcs");
  const [templates, setTemplates] = useState(defaultTemplates);
  const [menuOpen, setMenuOpen] = useState(null);

 
  const toggleStatus = (id) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold text-foreground">Template</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* SHOW CREATE ONLY IN CUSTOM TAB */}
        {activeTab === "custom" && (
          <button
            onClick={() => navigate("/config/organise/template/create")}
            className="bg-blue-600 text-white px-8 py-2 rounded"
          >
            Create
            <span className="text-lg leading-none">+</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 mt-4 mb-6">
        <button
          onClick={() => setActiveTab("qcs")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "qcs"
              ? "bg-card text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          QCS HRM Template
        </button>

        <button
          onClick={() => setActiveTab("custom")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "custom"
              ? "bg-card text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Custom Templates
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <span>Template Name</span>
        <span>Category Name</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3">
        {templates.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] items-center px-5 py-4 bg-card rounded-xl border border-border"
          >
            <span className="text-sm text-foreground font-medium">
              {t.name}
            </span>

            <span className="text-sm text-foreground">{t.category}</span>

            {/* CUSTOM TOGGLE */}
            <div
              onClick={() => toggleStatus(t.id)}
              className={`w-10 h-5 flex items-center rounded-full cursor-pointer transition ${
                t.active ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  t.active ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2">

              {/* VIEW ICON (BOTH TABS) */}
              <button className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100">
                👁
              </button>

              {/* EDIT DELETE ONLY IN CUSTOM TAB */}
              {/* {activeTab === "custom" && (
                <>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100">
                    ✏️
                  </button>

                  <button className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-red-100 text-red-500">
                    🗑
                  </button>
                </>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}