import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const CreateBusinessUnit = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW
  const axiosInstance = createAxios(token);

  /* ================= EDIT MODE DETECT ================= */
  const isEdit = location.state?.isEdit || false; // ✅ NEW
  const editData = location.state?.data || null;  // ✅ NEW

  const [assignHead, setAssignHead] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [form, setForm] = useState({
    businessUnitName: "",
    locationName: "",
    businessHead: ""
  });

  /* ================= PREFILL FORM ON EDIT ================= */
  useEffect(() => {
    if (isEdit && editData) {
      setForm({
        businessUnitName: editData.name || "",
        locationName: editData.location || "",
        businessHead: editData.head || ""
      });

      setAssignHead(!!editData.head);
      setLogoPreview(editData.logo || null);
    }
  }, [isEdit, editData]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  /* ================= UPLOAD LOGO ================= */
  const uploadLogo = async () => {
    if (!logoFile) return "";

    const formData = new FormData();
    formData.append("file", logoFile);

    const res = await axiosInstance.post(
      "/upload/logo",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res?.data?.url || "";
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  /* ================= CREATE ================= */
  const handleSave = async () => {
    try {
      const logoUrl = await uploadLogo();

      const payload = {
        businessUnitName: form.businessUnitName,
        locationName: form.locationName,
        logo: logoUrl,
        assignBusinessHead: assignHead,
        businessHead: assignHead ? form.businessHead : null
      };

      await axiosInstance.post(
        "/config/create-buinessUnit",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );

      navigate("/config/hris/Company_data/buisness-unit-list");
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= UPDATE (EDIT) ================= */
  const handleUpdate = async () => {
    try {
      const logoUrl = logoFile ? await uploadLogo() : editData.logo;

      const payload = {
        businessUnitId: editData.id,
        businessUnitName: form.businessUnitName,
        locationName: form.locationName,
        logo: logoUrl,
        assignBusinessHead: assignHead,
        businessHead: assignHead ? form.businessHead : null
      };

      await axiosInstance.put(
        `/config/update-buinessUnit/${editData.id}`,
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );

      navigate("/config/hris/Company_data/buisness-unit-list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ================= HEADER (DESIGN SAME) ================= */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Business Unit" : "Create Business Unit"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* ✅ EDIT MODE BUTTON */}
        {isEdit && (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* ================= REST OF DESIGN (UNCHANGED) ================= */}

        {/* Business Unit Name */}
        <div>
          <label className="text-sm font-semibold block mb-2">
            Business Unit Name
          </label>
          <input
            name="businessUnitName"
            value={form.businessUnitName}
            onChange={handleChange}
            placeholder="Choose Account"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold block mb-2">
            Location
          </label>
          <select
            name="locationName"
            value={form.locationName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose Account</option>
            <option value="Mohali Office">Mohali Office</option>
            <option value="Delhi Main Branch">Delhi Main Branch</option>
            <option value="Mumbai Office">Mumbai Office</option>
          </select>
        </div>

        {/* Logo Upload */}
        <div className="border border-dashed rounded-xl p-6 bg-white">
          <div className="flex justify-between mb-4">
            <label className="text-sm font-semibold">
              Business Unit Logo
            </label>
            <span className="text-xs text-gray-400">
              Recommended Size: 280 x 110 px
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-xs">Preview</span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Note: Upload photo with max size 2MB for optimum results.
              </p>
            </div>

            <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              Upload
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Assign Head */}
        <div>
          <label className="text-sm font-semibold block mb-3">
            Do you want to assign a Business Unit Head? (Optional)
          </label>

          <div className="border rounded-xl p-4 mb-3 bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={assignHead === true}
                onChange={() => setAssignHead(true)}
              />
              Yes
            </label>

            {assignHead && (
              <div className="mt-4">
                <label className="text-sm font-semibold block mb-2">
                  Business Unit Head
                </label>
                <select
                  name="businessHead"
                  value={form.businessHead}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled hidden>
                    Choose Account
                  </option>
                  <option value="john doe">John Doe</option>
                  <option value="jane smith">Jane Smith</option>
                </select>
              </div>
            )}
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={assignHead === false}
                onChange={() => setAssignHead(false)}
              />
              No
            </label>
          </div>
        </div>

        {/* ================= FOOTER (ONLY CREATE MODE) ================= */}
        {!isEdit && (
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBusinessUnit;
