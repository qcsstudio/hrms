import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import createAxios from "../../../../utils/axios.config";

const CustomDataList = () => {
  const { token } = useSelector((state) => state.user);
  const axiosInstance = createAxios(token);

  const [data, setData] = useState([]);
  const [openStatus, setOpenStatus] = useState(null);

  const [editModal, setEditModal] = useState(false);
  const [editRights, setEditRights] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  /* ================= FETCH ================= */
  const fetchList = async () => {
    const res = await axiosInstance.get("/config/get-all-customData", {
      meta: { auth: "ADMIN_AUTH" },
    });
    setData(res.data.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axiosInstance.delete(`/config/delete-customData/${id}`, {
      meta: { auth: "ADMIN_AUTH" },
    });

    fetchList();
  };

  /* ================= STATUS ================= */
  const handleStatus = async (item, status) => {
    await axiosInstance.put(
      `/config/custom-data/status/${item._id}`,
      { isActive: status },
      { meta: { auth: "ADMIN_AUTH" } }
    );

    fetchList();
    setOpenStatus(null);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditRights(item.editRights);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    await axiosInstance.put(
      `/config/update-customData/${selectedItem._id}`,
      { editRights },
      { meta: { auth: "ADMIN_AUTH" } }
    );

    setEditModal(false);
    fetchList();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold">Add Custom Data</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <Link to="/config/hris/Employee-data/custom-create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Create +
          </button>
        </Link>
      </div>

      {/* ================= TABLE HEADER ================= */}
      <div className="grid grid-cols-7 text-sm text-gray-500 px-4 mb-3">
        <div>Custom Data Name</div>
        <div>No of Fields</div>
        <div>Type</div>
        <div>Category</div>
        <div>Status</div>
        <div>Created By</div>
        <div className="text-right">In Use</div>
      </div>

      {/* ================= LIST ================= */}
      {data.map((item, index) => (
        <div
          key={item._id}
          className="bg-white rounded-xl px-4 py-3 mb-3 grid grid-cols-7 items-center shadow-sm"
        >
          <div className="font-medium">{item.sectionName}</div>

          <div className="text-gray-500">
            {item.customFields.length || "—"}
          </div>

          <div>Default</div>

          <div>
            {item.classifyUnderEmployeeIdentity ? "Identity" : "Other"}
          </div>

          {/* STATUS */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenStatus(openStatus === index ? null : index)
              }
              className={`font-medium ${
                item.isActive ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.isActive ? "Active" : "Inactive"} ▾
            </button>

            {openStatus === index && (
              <div className="absolute top-7 left-0 bg-white border rounded-md shadow-md w-28 z-10">
                <button
                  className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleStatus(item, true)}
                >
                  Active
                </button>
                <button
                  className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleStatus(item, false)}
                >
                  Inactive
                </button>
              </div>
            )}
          </div>

          {/* CREATED BY */}
          <div>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
              U
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleEdit(item)}
              className="w-8 h-8 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="w-8 h-8 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              ⋮
            </button>
          </div>
        </div>
      ))}

      {/* ================= EDIT MODAL ================= */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
          <div className="w-[420px] bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Edit Custom Data</h2>
              <button onClick={() => setEditModal(false)}>✕</button>
            </div>

            <p className="text-sm text-gray-600 mb-2">Edit Rights</p>
            <select
              className="w-full border rounded-md p-2"
              value={editRights}
              onChange={(e) => setEditRights(e.target.value)}
            >
              <option value="admin_only">Admin Only</option>
              <option value="manager_admin">Manager & Admin</option>
              <option value="all">Employee, Manager & Admin</option>
            </select>

            <button
              onClick={handleUpdate}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataList;
