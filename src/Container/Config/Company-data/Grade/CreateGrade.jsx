import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const CreateGrade = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gradeId = searchParams.get("id");
  const isEdit = Boolean(gradeId);

  const [gradeName, setGradeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEdit || !gradeId) return;

    const fetchGrade = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/config/getOne-grade/${gradeId}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const source = res?.data || {};
        setGradeName(source?.gradeName || "");
      } catch (error) {
        console.log("Error fetching grade:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrade();
  }, [isEdit, gradeId]);

  const handleCancel = () => {
    navigate("/config/hris/Company_data/grade");
  };

  const handleSave = async () => {
    if (!gradeName.trim()) {
      alert("Grade name is required");
      return;
    }

    try {
      if (isEdit) {
        await axiosInstance.put(
          `/config/update-grade/${gradeId}`,
          { gradeName: gradeName.trim() },
          { meta: { auth: "ADMIN_AUTH" } }
        );
      } else {
        await axiosInstance.post(
          "/config/create-grade",
          { gradeName: gradeName.trim() },
          { meta: { auth: "ADMIN_AUTH" } }
        );
      }

      navigate("/config/hris/Company_data/grade");
    } catch (error) {
      console.log("Error saving grade:", error);
    }
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Grade" : "Create Grade"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {isEdit && (
          <button type="button" onClick={handleSave} className={flatPrimaryButtonClassName}>
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Grade Name</label>
          <input
            type="text"
            placeholder="Enter grade name"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            className={fieldClassName}
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={handleCancel} className={flatSecondaryButtonClassName}>
            Cancel
          </button>

          {!isEdit && (
            <button type="button" onClick={handleSave} className={flatPrimaryButtonClassName}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGrade;
