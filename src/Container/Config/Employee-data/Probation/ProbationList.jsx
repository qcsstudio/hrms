import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

export default function ProbationList() {
const {token} = useSelector((state) => state.user);
const [probitionData, setProbationData] = useState([]);

  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const probationData = [
    {
      id: 1,
      name: "6 Months",
      date: "12 Jun 2025 11:10 AM",
      assignedCount: 0,
      duration: "180 Days",
    },
    {
      id: 2,
      name: "3 Months",
      date: "12 Jun 2025 11:10 AM",
      assignedCount: 15,
      duration: "90 Days",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Edit
  const handleEdit = (item) => {
    if (!item?.id) return;

    navigate(`/config/hris/Employee-data/probation-edit/${item.id}`, {
      state: { probationData: item },
    });
  };

  // View
  const handleView = (item) => {
    navigate(`/config/hris/Employee-data/probation-view/${item.id}`, {
      state: { probationData: item },
    });
  };

  // Delete
  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (confirmDelete) {
      console.log("Deleted:", item);
      // Add API delete logic here
    }
  };
const axiosInstance = createAxios(token);
  useEffect(()=>{
    const fetchProbitionData = async () => {
      try {
        const res = await axiosInstance.get("/config/probation-getAll", {
          meta: { auth: "ADMIN_AUTH" },
        });
        console.log("Probation Data:", res.data);
        setProbationData(res.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
    fetchProbitionData();

  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Probation
            </h1>
            <p className="text-sm text-gray-500">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>

          <Link to="/config/hris/Employee-data/probation-create">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition" >
              Create <span className="text-lg leading-none">+</span>
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTab("active")}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                tab === "active"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setTab("draft")}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                tab === "draft"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Draft
            </button>
          </div>

          <button className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Clear <span className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
            <div>Probation Plan Name</div>
            <div>Created By</div>
            <div>Assigned Employee</div>
            <div>Probation Duration</div>
            <div className="text-right">Action</div>
          </div>

          {probitionData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-4 px-6 py-5 border-b border-gray-100 items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>

              <div>
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                  U
                </div>
              </div>

              <div className="text-sm text-gray-800">
                {item.assignedCount === 0
                  ? "No Employee Assigned"
                  : `${item.assignedCount} Employees`}
              </div>

              <div className="text-sm text-gray-900">
                {item.duration}
              </div>

              {/* Actions */}
              <div
                className="flex items-center justify-end gap-2 relative"
                ref={menuRef}
              >
                <button
                  onClick={() => handleEdit(item)}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer text-gray-600"
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === index ? null : index)
                  }
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer text-gray-600"
                >
                  ⋮
                </button>

                {openMenu === index && (
                  <div className="absolute right-0 top-11 w-36 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        handleView(item);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      👁 View
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(item);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
