import React, { useEffect, useState } from "react";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

/* =======================
   UI SMALL COMPONENTS
======================= */

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
};

const FormField = ({ label, children }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
};

const FormTextarea = ({ placeholder, rows, value, onChange }) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  );
};

/* =======================
   MAIN COMPONENT
======================= */

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const BrandingSetup = () => {
  const { token } = useSelector((state) => state.user);
  const axiosInstance = createAxios(token);

  const [logoError, setLogoError] = useState("");
  const [coverError, setCoverError] = useState("");

  const [companybrands, setCompanybrands] = useState({
    logo: "",
    loginImage: "",
  });

  const [welcomeTitle, setWelcomeTitle] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  /* =======================
     FILE UPLOAD HANDLER
  ======================= */
  const handleFileUpload = (e, key, errorSetter) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      errorSetter("File size must be less than 2MB");
      return;
    }

    errorSetter("");
    const previewUrl = URL.createObjectURL(file);

    setCompanybrands((prev) => ({
      ...prev,
      [key]: previewUrl,
    }));
  };

  /* =======================
     FETCH EXISTING DATA
  ======================= */
  useEffect(() => {
    const fetchCompanyBrands = async () => {
      try {
        const res = await axiosInstance.get(
          "/companies/company-branding-get",
          { meta: { auth: "ADMIN_AUTH" } }
        );

        const branding = res?.data?.data?.branding;

        setCompanybrands({
          logo: branding?.logo || "",
          loginImage: branding?.loginImage || "",
        });

        setWelcomeTitle(branding?.welcomeTitle || "");
        setWelcomeMessage(branding?.welcomeMessage || "");
      } catch (error) {
        console.log("API error", error);
      }
    };

    fetchCompanyBrands();
  }, []);

  /* =======================
     SAVE DATA
  ======================= */
  const handleSave = async () => {
    const payload = {
      brand_logo: companybrands.logo,
      cover_image: companybrands.loginImage,
      welcomeTitle,
      welcomeMessage,
    };

    try {
      await axiosInstance.patch(
        "/companies/company-branding-get",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );
    } catch (error) {
      console.log("Save API error", error);
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="mx-auto p-8">
      <PageHeader
        title="Branding Setup"
        subtitle="Manage employee directory, documents, and role-based actions."
        action={
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        }
      />

      <div className="space-y-6">
        {/* BRAND LOGO */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Brand Logo
            </h3>
            {!companybrands.logo && (
              <span className="text-xs text-gray-400">
                Recommended Size: <strong>280</strong>×<strong>110</strong> px
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-gray-200 p-6">
            <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {companybrands.logo ? (
                <img
                  src={companybrands.logo}
                  alt="Brand Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            <p className="flex-1 text-sm text-gray-400">
              Tip: use a transparent PNG or SVG. Keep some padding around the logo.
            </p>

            <label className="cursor-pointer px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, "logo", setLogoError)
                }
              />
            </label>
          </div>

          {logoError && (
            <p className="mt-2 text-sm text-red-600">{logoError}</p>
          )}
        </div>

        {/* LOGIN COVER IMAGE */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Login Cover Image
            </h3>
            {!companybrands.loginImage && (
              <span className="text-xs text-gray-400">
                Recommended Size: <strong>720</strong>×<strong>788</strong> px
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-gray-200 p-6">
            <div className="w-16 h-16 rounded-md bg-blue-100 flex items-center justify-center overflow-hidden">
              {companybrands.loginImage ? (
                <img
                  src={companybrands.loginImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-200 rounded" />
              )}
            </div>

            <p className="flex-1 text-sm text-gray-400">
              Tip: pick an image with safe space in the center (edges may crop).
            </p>

            {!companybrands.loginImage && (
              <label className="cursor-pointer px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, "loginImage", setCoverError)
                  }
                />
              </label>
            )}
          </div>

          {coverError && (
            <p className="mt-2 text-sm text-red-600">{coverError}</p>
          )}
        </div>

        {/* WELCOME TEXT */}
        <FormField label="Welcome message title">
          <FormTextarea
            placeholder="Choose Account"
            rows={2}
            value={welcomeTitle}
            onChange={(e) => setWelcomeTitle(e.target.value)}
          />
        </FormField>

        <FormField label="Welcome message body">
          <FormTextarea
            placeholder="Choose Account"
            rows={3}
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
};

export default BrandingSetup;
