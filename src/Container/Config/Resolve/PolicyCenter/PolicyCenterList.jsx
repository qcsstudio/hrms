import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

const avatarUrl =
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face";

const tabs = ["All", "Active", "Archive"];
const locations = ["India", "USA", "UK"];

const PolicyCenter = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [tab, setTab] = useState("All");
  const [policies, setPolicies] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await axiosInstance.get("/config/get-policies-center", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setPolicies(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        console.log("policy center list error", error);
        setPolicies([]);
      }
    };

    fetchPolicies();
  }, []);

  const getPolicyId = (policy, index) => policy?._id || policy?.id || String(index);
  const getPolicyName = (policy) => policy?.policyName || policy?.name || "-";
  const getCreatedBy = (policy) =>
    policy?.createdBy?.name ||
    policy?.createdByName ||
    policy?.createdBy ||
    "Admin";

  const handleClear = () => {
    setTab("All");
    setSelectedLocation("");
  };

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/resolve/policy-center/create");
  };

  const handleEdit = (id) => {
    navigate(`/config/resolve/policy-center/create?mode=edit&id=${id}`);
  };

  const handleView = (id) => {
    navigate(`/config/resolve/policy-center/create?mode=view&id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.patch(`/config/delete-policy-center/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setPolicies((prev) => prev.filter((item, index) => getPolicyId(item, index) !== id));
      setOpenMenu(null);
    } catch (error) {
      console.log("policy center delete error", error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Policy center</h1>
          <p className="text-sm text-muted-foreground">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex border rounded-md overflow-hidden">
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
        </div>

        <div className="flex gap-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <button onClick={handleClear} className="border px-4 py-2 rounded-lg">
            Clear x
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_200px_100px] gap-4 px-5 py-3 text-sm text-muted-foreground font-medium border-b">
        <span>Policy Name</span>
        <span>Created By</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3 mt-3">
        {policies.map((policy, index) => {
          const policyId = getPolicyId(policy, index);

          return (
            <div
              key={policyId}
              className="grid grid-cols-[1fr_200px_100px] gap-4 items-center px-5 py-4 border rounded-lg bg-background hover:shadow-sm transition-shadow"
            >
              <span className="text-sm font-medium">{getPolicyName(policy)}</span>

              <img
                src={avatarUrl}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
                title={getCreatedBy(policy)}
              />

              <div className="flex justify-end gap-2 relative">
                <button
                  onClick={() => handleEdit(policyId)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
                >
                  Edit
                </button>
                <button
                  onClick={() => setOpenMenu((prev) => (prev === policyId ? null : policyId))}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
                >
                  ...
                </button>

                {openMenu === policyId && (
                  <div className="absolute right-0 top-10 w-28 overflow-hidden rounded-md border border-gray-200 bg-white z-20 shadow-sm">
                    <button
                      onClick={() => handleView(policyId)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(policyId)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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

export default PolicyCenter;
