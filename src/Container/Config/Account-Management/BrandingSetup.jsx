import React, { useEffect, useState } from "react";
import createAxios from '../../../utils/axios.config'
import { useSelector } from "react-redux";

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

const FormTextarea = ({ placeholder, rows }) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  );
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const BrandingSetup = () => {
const {token}= useSelector(state=>state.user)

  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [coverError, setCoverError] = useState("");

  const handleFileUpload = (e, setter, errorSetter) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      errorSetter("File size must be less than 2MB");
      setter(null);
      return;
    }

    errorSetter("");
    const url = URL.createObjectURL(file);
    setter(url);
  };

  const axiosInstance = createAxios(token)

  useEffect(()=>{
    const fetchcompanybrands = async ()=>{
      try {
        const res = await axiosInstance.get('/companies/company-branding-get',
          {meta:{auth:"ADMIN_AUTH"}}
        )
        console.log("brands logo data======",res.data)

      } catch (error) {
        console.log("api is not working",error)
      }
    };
    fetchcompanybrands()
  },[])

  return (
    <div className=" mx-auto p-8">
      <PageHeader
        title="Branding Setup"
        subtitle="Manage employee directory, documents, and role-based actions."
        action={
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>
        }
      />

      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Brand Logo</h3>
            {!logo && (
              <span className="text-xs text-gray-400">
                Recommended Size: <strong>280</strong>×<strong>110</strong> px
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-gray-200 p-6">
            <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {logo ? (
                <img
                  src={logo}
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
                  handleFileUpload(e, setLogo, setLogoError)
                }
              />
            </label>
          </div>

          {logoError && (
            <p className="mt-2 text-sm text-red-600">{logoError}</p>
          )}
        </div>

        {/* Login Cover Image */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Login Cover Image
            </h3>
            {!coverImage && (
              <span className="text-xs text-gray-400">
                Recommended Size: <strong>720</strong>×<strong>788</strong> px
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-gray-200 p-6">
            <div className="w-16 h-16 rounded-md bg-blue-100 flex items-center justify-center overflow-hidden">
              {coverImage ? (
                <img
                  src={coverImage}
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

            {coverImage ? (
              <button
                onClick={() => {
                  setCoverImage(null);
                  setCoverError("");
                }}
                className="px-6 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Delete ✕
              </button>
            ) : (
              <label className="cursor-pointer px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, setCoverImage, setCoverError)
                  }
                />
              </label>
            )}
          </div>

          {coverError && (
            <p className="mt-2 text-sm text-red-600">{coverError}</p>
          )}
        </div>

        <FormField label="Welcome message title">
          <FormTextarea placeholder="Choose Account" rows={2} />
        </FormField>

        <FormField label="Welcome message body">
          <FormTextarea placeholder="Choose Account" rows={3} />
        </FormField>
      </div>
    </div>
  );
};

export default BrandingSetup;
