import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../utils/axios.config";

const AssetsCategory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [activeTab, setActiveTab] = useState("active");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");

  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/config/getAll-asset-category", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const rawCategories = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.categories)
              ? response.data.categories
              : [];

        const normalizedCategories = rawCategories.map((item, index) => ({
          id: item?._id || item?.id || index,
          name: item?.categoryName || item?.name || "--",
          description: item?.description || "--",
          assetType: item?.assetType || "--",
          status: String(item?.status || "active").toLowerCase(),
          location:
            item?.location ||
            item?.officeName ||
            item?.office ||
            item?.branchName ||
            "--",
        }));

        setCategories(normalizedCategories);
      } catch (error) {
        setCategories([]);
        toast.error(
          error?.response?.data?.message || "Failed to fetch asset categories"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [axiosInstance]);

  const locations = Array.from(
    new Set(categories.map((category) => category.location).filter(Boolean))
  );

  const handleClear = () => {
    setSelectedLocation("");
  };

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/hrops/assets-category/create", {
      state: {
        country: selectedCountry,
        office: applyAll ? "ALL" : selectedOffice,
      },
    });
  };

  const handleDelete = async (categoryId) => {
    if (!categoryId || deletingId === categoryId) {
      return;
    }

    setDeletingId(categoryId);
    try {
      const response = await axiosInstance.delete(
        `/config/delete-asset-category/${categoryId}`,
        {
          meta: { auth: "ADMIN_AUTH" },
        }
      );

      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
      toast.success(
        response?.data?.message || "Asset category deleted successfully"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete asset category"
      );
    } finally {
      setDeletingId("");
    }
  };

  const filtered = categories.filter((category) => {
    if (activeTab === "active" && category.status !== "active") return false;
    if (activeTab === "draft" && category.status !== "draft") return false;
    if (selectedLocation && category.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Create Assets Category
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>
          <button
            onClick={() => setShowCountryDialog(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Create +
          </button>
        </div>

        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex rounded-full border border-border bg-background overflow-hidden">
            {["active", "draft", "me"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm border border-border rounded-full"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "me" ? "Me" : tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>

            <button
              onClick={handleClear}
              className="border px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-sm font-medium text-muted-foreground border-b border-dashed border-border">
          <span>Category Name</span>
          <span>Description</span>
          <span>Asset Type</span>
          {/* <span>Location</span> */}
          <span className="text-right">Action</span>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Loading categories...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No data found
            </div>
          ) : (
            filtered.map((category) => (
              <div
                key={category.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 bg-background rounded-xl border border-border"
              >
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {category.description}
                </span>
                <span className="text-sm">{category.assetType}</span>
                {/* <span className="text-sm">{category.location}</span> */}

                <div className="flex items-center gap-2 justify-end">
                  {/* <button className="p-1.5 rounded-md hover:bg-muted/50">
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                    className="p-1.5 rounded-md hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === category.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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
};

export default AssetsCategory;
