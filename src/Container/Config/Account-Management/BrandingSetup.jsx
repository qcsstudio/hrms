import React, { useEffect, useState } from "react";
import createAxios from "../../../utils/axios.config";
/* =======================
   UI SMALL COMPONENTS
======================= */

const panelClass =
  "rounded-lg border border-[#E5E7EB] bg-white p-5 surface-card transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(15,23,42,0.08)]";

const primaryButtonClass =
  "h-[40px] rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none transition-all duration-200 hover:bg-[#0467CA] active:scale-[0.99] focus:outline-none focus:ring-0";

const uploadButtonClass =
  "inline-flex h-[40px] cursor-pointer items-center rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none transition-all duration-200 hover:bg-[#0467CA] active:scale-[0.99] focus:outline-none focus:ring-0";

const controlClass =
  "w-full rounded-lg border border-[#DEE2E6] bg-white px-3 py-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 placeholder:text-[#98A2B3] focus:outline-none focus:ring-0 hover:border-[#C7CED8] resize-none";

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-[20px] font-bold text-[#212529]">{title}</h1>
        <p className="mt-1 text-[12px] text-[#000000]/35">{subtitle}</p>
      </div>
      {action}
    </div>
  );
};

const FormField = ({ label, children }) => {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#212529]">
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
      className={controlClass}
    />
  );
};

/* =======================
   MAIN COMPONENT
======================= */

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const BrandingSetup = () => {
  const token = localStorage.getItem("authToken");
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
        const res = await axiosInstance.get("/companies/company-branding-get", {
          meta: { auth: "ADMIN_AUTH" },
        });

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
      await axiosInstance.patch("/companies/company-branding-get", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
    } catch (error) {
      console.log("Save API error", error);
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="bg-[#F8F9FA] p-[15px] card-animate">
      <div className="mx-auto max-w-[1700px]">
        <PageHeader
          title="Branding Setup"
          subtitle="Manage employee branding assets and welcome messaging."
          action={
            <button onClick={handleSave} className={primaryButtonClass}>
              Save Changes
            </button>
          }
        />

        <div className="space-y-5">
          {/* BRAND LOGO */}
          <div className={panelClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-[#212529]">Brand Logo</h3>
              {!companybrands.logo && (
                <span className="text-[12px] text-[#98A2B3]">
                  Recommended size: <strong>280</strong> x <strong>110</strong> px
                </span>
              )}
            </div>

            <div className="rounded-lg border-2 border-dashed border-[#DEE2E6] bg-[#F8FAFC] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
                  {companybrands.logo ? (
                    <img
                      src={companybrands.logo}
                      alt="Brand Logo"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#EEF2F7]" />
                  )}
                </div>

                <p className="flex-1 text-[13px] text-[#667085]">
                  Tip: use a transparent PNG or SVG and keep some breathing space around the logo.
                </p>

                <label className={uploadButtonClass}>
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "logo", setLogoError)}
                  />
                </label>
              </div>
            </div>

            {logoError && <p className="mt-2 text-[13px] text-[#D92D20]">{logoError}</p>}
          </div>

          {/* LOGIN COVER IMAGE */}
          <div className={panelClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-[#212529]">
                Login Cover Image
              </h3>
              {!companybrands.loginImage && (
                <span className="text-[12px] text-[#98A2B3]">
                  Recommended size: <strong>720</strong> x <strong>788</strong> px
                </span>
              )}
            </div>

            <div className="rounded-lg border-2 border-dashed border-[#DEE2E6] bg-[#F8FAFC] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
                  {companybrands.loginImage ? (
                    <img
                      src={companybrands.loginImage}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#EEF2F7]" />
                  )}
                </div>

                <p className="flex-1 text-[13px] text-[#667085]">
                  Tip: pick an image with safe space in the center because side edges may crop.
                </p>

                <label className={uploadButtonClass}>
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
              </div>
            </div>

            {coverError && <p className="mt-2 text-[13px] text-[#D92D20]">{coverError}</p>}
          </div>

          {/* WELCOME TEXT */}
          <div className={panelClass}>
            <div className="space-y-4">
              <FormField label="Welcome message title">
                <FormTextarea
                  placeholder="Enter welcome title"
                  rows={2}
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                />
              </FormField>

              <FormField label="Welcome message body">
                <FormTextarea
                  placeholder="Enter welcome message"
                  rows={3}
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                />
              </FormField>
            </div>
          </div>
        </div>
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
