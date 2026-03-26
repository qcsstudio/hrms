import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createAxios from "../../../utils/axios.config";

const dropdownControlClass =
  "h-[40px] w-full rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 hover:border-[#C7CED8] focus:outline-none focus:ring-0 flex items-center justify-between";

const permissionFields = [
  ["Personal Data", "About"],
  ["Address", "Contact"],
  ["Biodata", "Important Dates"],
  ["Dependents", "Medical"],
  ["Identity", "Banking"],
  ["Skills", "Language"],
  ["Work Experience Details", "Education Details"],
  ["Documents", null],
];

const visibilityOptions = [
  { value: "Self-Admin", label: "Self & Admin" },
  { value: "team", label: "Team" },
  { value: "department", label: "Department" },
  { value: "employeedecide", label: "Let Employee Decide" },
];

const allFields = permissionFields.flat().filter(Boolean);

const permissionKeyMap = {
  "Personal Data": "personalData",
  About: "about",
  Address: "address",
  Contact: "contact",
  Biodata: "biodata",
  "Important Dates": "importantDates",
  Dependents: "dependents",
  Medical: "medical",
  Identity: "identity",
  Banking: "banking",
  Skills: "skills",
  Language: "language",
  "Work Experience Details": "workExperienceDetails",
  "Education Details": "educationDetails",
  Documents: "documents",
};

const buildInitialPermissions = () =>
  Object.fromEntries(allFields.map((field) => [field, ""]));

const DivDropdown = ({
  value,
  options,
  onSelect,
  placeholder = "Choose visibility",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideTrigger = dropdownRef.current?.contains(event.target);
      const clickedInsideMenu = menuRef.current?.contains(event.target);

      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return undefined;
    }

    const updateMenuPosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const estimatedMenuHeight = Math.min(options.length * 40 + 16, 224);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUpward =
        spaceBelow < estimatedMenuHeight && spaceAbove > estimatedMenuHeight;

      setMenuStyle({
        top: openUpward ? rect.top - estimatedMenuHeight - 8 : rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen, options.length]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${dropdownControlClass} ${isOpen ? "border-[#98B9F8]" : ""}`}
      >
        <span className={selectedOption ? "text-[#344054]" : "text-[#98A2B3]"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-[#667085] transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[99999] max-h-56 overflow-auto rounded-lg border border-[#DEE2E6] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
            style={{
              top: `${menuStyle.top}px`,
              left: `${menuStyle.left}px`,
              width: `${menuStyle.width}px`,
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-4 py-2.5 text-left text-sm shadow-none outline-none transition-colors focus:outline-none focus:ring-0 ${value === option.value
                    ? "bg-blue-50 font-medium text-[#111827]"
                    : "text-[#334155] hover:bg-blue-50 active:bg-blue-100"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

const PermissionField = ({ label, value, onSelect }) => {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-[#FCFDFD] p-4">
      <label className="mb-2 block text-[14px] font-medium text-[#212529]">
        {label}
      </label>
      <DivDropdown
        value={value}
        options={visibilityOptions}
        onSelect={onSelect}
      />
    </div>
  );
};

export default function DefaultPrivacyPolicy() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [permissions, setPermissions] = useState(buildInitialPermissions);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDefaultPrivacy = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          "/config/getAlldefault-privacy",
          {
            meta: { auth: "ADMIN_AUTH" },
          }
        );

        const data = response?.data?.data || response?.data;
        const fetchedPermissions = data?.permissions || {};

        if (Object.keys(fetchedPermissions).length) {
          setPermissions((prev) => {
            const nextPermissions = { ...prev };

            allFields.forEach((field) => {
              const apiKey = permissionKeyMap[field];
              nextPermissions[field] = fetchedPermissions[apiKey] || "";
            });

            return nextPermissions;
          });
        }
      } catch (error) {
        console.error("Error fetching default privacy policy:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch default privacy settings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultPrivacy();
  }, []);

  const selectedCount = Object.values(permissions).filter(Boolean).length;

  const handlePermissionChange = (field, value) => {
    setPermissions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        permissions: allFields.reduce((acc, field) => {
          const apiKey = permissionKeyMap[field];
          acc[apiKey] = permissions[field] || "";
          return acc;
        }, {}),
      };

      const response = await axiosInstance.post(
        "/config/createOrUpdate-default-privacy",
        payload,
        {
          meta: { auth: "ADMIN_AUTH" },
        }
      );

      toast.success(
        response?.data?.message || "Default privacy settings saved successfully."
      );
    } catch (error) {
      console.error("Error saving default privacy policy:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to save default privacy settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-[15px] card-animate">
      <div className="mx-auto max-w-[1700px]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#212529]">
              Default Profile Privacy
            </h1>
            <p className="mt-1 text-[12px] text-[#000000]/35">
              Set the default visibility level for employee profile sections.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Coverage
            </p>
            <p className="mt-1 text-[18px] font-semibold text-[#212529]">
              {selectedCount}/{allFields.length} sections configured
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex flex-col gap-2 border-b border-[#EEF2F6] pb-5">
            <h2 className="text-[16px] font-semibold text-[#212529]">
              Employee Profile Fields
            </h2>
            <p className="text-[13px] text-[#667085]">
              Use the standard visibility dropdown for each section instead of
              native select fields.
            </p>
          </div>

          {loading ? (
            <div className="mb-5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-[#667085]">
              Loading privacy settings...
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {permissionFields.map(([left, right]) => (
              <React.Fragment key={`${left}-${right || "empty"}`}>
                <PermissionField
                  label={left}
                  value={permissions[left]}
                  onSelect={(value) => handlePermissionChange(left, value)}
                />

                {right ? (
                  <PermissionField
                    label={right}
                    value={permissions[right]}
                    onSelect={(value) => handlePermissionChange(right, value)}
                  />
                ) : (
                  <div className="hidden xl:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[13px] text-[#0575E6]">
          Managers can still access their direct report&apos;s data where the
          product requires it.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-[40px] items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-5 text-sm font-medium text-[#344054] shadow-none transition hover:bg-[#F9FAFB] hover:shadow-none hover:translate-y-0"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-[40px] items-center justify-center rounded-lg bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none transition hover:bg-[#0467CA] hover:shadow-none hover:translate-y-0"
          >
            {saving ? "Saving..." : "Save Privacy Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
