import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

export default function Template() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [activeTab, setActiveTab] = useState("qcs");
  const [templates, setTemplates] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axiosInstance.get("/config/getAll-template", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        setTemplates(
          list.map((item, index) => ({
            id: item?._id || item?.id || index,
            name: item?.templateName || item?.name || "-",
            category: item?.category || "-",
            active: item?.status === true,
          }))
        );
      } catch (error) {
        console.log("template list error", error);
        setTemplates([]);
      }
    };

    fetchTemplates();
  }, []);

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/organise/template/create", {
      state: {
        country: selectedCountry,
        office: applyAll ? "ALL" : selectedOffice,
      },
    });
  };

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

        {activeTab === "custom" && (
          <button
            onClick={() => setShowCountryDialog(true)}
            className="bg-blue-600 text-white px-8 py-2 rounded"
          >
            Create
            <span className="text-lg leading-none">+</span>
          </button>
        )}
      </div>

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

      <div className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <span>Template Name</span>
        <span>Category Name</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] items-center px-5 py-4 bg-card rounded-xl border border-border"
          >
            <span className="text-sm text-foreground font-medium">
              {template.name}
            </span>

            <span className="text-sm text-foreground">{template.category}</span>

            <div
              onClick={() => toggleStatus(template.id)}
              className={`w-10 h-5 flex items-center rounded-full cursor-pointer transition ${
                template.active ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  template.active ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>

            <div className="flex justify-end gap-2 relative">
              <button className="px-3 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 text-sm">
                Edit
              </button>

              <button
                onClick={() =>
                  setMenuOpen((prev) => (prev === template.id ? null : template.id))
                }
                className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
              >
                ...
              </button>

              {menuOpen === template.id && (
                <div className="absolute right-0 top-10 w-28 bg-white border rounded-lg shadow-md z-20 overflow-hidden">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                    View
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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
}
