import React, { useState, useRef } from "react";

const defaultMargins = {
  narrow: { top: "1.27", bottom: "1.27", left: "1.27", right: "1.27" },
  moderate: { top: "2.54", bottom: "2.54", left: "1.91", right: "1.91" },
  wide: { top: "2.54", bottom: "2.54", left: "3.18", right: "3.18" },
};

const PageLayout = () => {
  const [headerImage, setHeaderImage] = useState(null);
  const [footerImage, setFooterImage] = useState(null);
  const [selectedMargin, setSelectedMargin] = useState("narrow");
  const [margins, setMargins] = useState(defaultMargins.narrow);
  const [showPreview, setShowPreview] = useState(false);

  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleMarginSelect = (type) => {
    setSelectedMargin(type);
    setMargins(defaultMargins[type]);
  };

  const handleMarginChange = (side, value) => {
    setMargins((prev) => ({ ...prev, [side]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* LEFT PANEL */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">Page Layout</h1>

          {/* Upload Section */}
          <div className="flex gap-6 mb-4">
            {/* Header Upload */}
            <div className="flex-1">
              <p className="text-sm mb-2">Upload header image</p>
              <div
                onClick={() => headerRef.current.click()}
                className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-blue-500"
              >
                {headerImage ? (
                  <img src={headerImage} alt="Header" className="max-h-16 object-contain" />
                ) : (
                  <>
                    <UploadIcon />
                    <span className="text-blue-600 text-sm font-medium">
                      Upload image
                    </span>
                  </>
                )}
              </div>

              <div className="mt-3 bg-blue-50 text-blue-700 text-xs p-3 rounded-md">
                📌 Upload photo with dimensions 1628×224px with max size 2 MB
                for optimum results. (Supports .png, .jpeg and .svg file types)
              </div>

              <input
                ref={headerRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setHeaderImage)}
              />
            </div>

            {/* Footer Upload */}
            <div className="flex-1">
              <p className="text-sm mb-2">Upload footer image</p>
              <div
                onClick={() => footerRef.current.click()}
                className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-blue-500"
              >
                {footerImage ? (
                  <img src={footerImage} alt="Footer" className="max-h-16 object-contain" />
                ) : (
                  <>
                    <UploadIcon />
                    <span className="text-blue-600 text-sm font-medium">
                      Upload image
                    </span>
                  </>
                )}
              </div>

              <input
                ref={footerRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setFooterImage)}
              />
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`relative w-11 h-6 rounded-full transition ${
                showPreview ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition ${
                  showPreview ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-sm">Preview sample header and footer</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            Note: Preview only for representational purpose.
          </p>

          {/* Margins */}
          <h2 className="font-semibold mt-8 mb-4">Page Margins</h2>

          {/* Presets */}
          <div className="flex gap-4">
            {["narrow", "moderate", "wide"].map((type) => (
              <button
                key={type}
                onClick={() => handleMarginSelect(type)}
                className={`px-4 py-2 border-2 rounded-lg capitalize text-sm ${
                  selectedMargin === type
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Numeric Margin Editor */}
          <div className="mt-6 w-44">
            <div className="grid grid-cols-3 gap-2 items-center text-sm">
              <input
                type="number"
                value={margins.top}
                onChange={(e) => handleMarginChange("top", e.target.value)}
                className="col-span-3 border rounded p-1 text-center"
              />

              <input
                type="number"
                value={margins.left}
                onChange={(e) => handleMarginChange("left", e.target.value)}
                className="border rounded p-1 text-center"
              />

              <div className="flex justify-center font-bold">+</div>

              <input
                type="number"
                value={margins.right}
                onChange={(e) => handleMarginChange("right", e.target.value)}
                className="border rounded p-1 text-center"
              />

              <input
                type="number"
                value={margins.bottom}
                onChange={(e) => handleMarginChange("bottom", e.target.value)}
                className="col-span-3 border rounded p-1 text-center"
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end mt-10">
            <button className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:opacity-90">
              Save
            </button>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="w-full lg:w-80">
          <div className="bg-white border rounded-lg shadow aspect-[3/4] relative overflow-hidden">

            {/* Margin Guide */}
            <div
              className="absolute border border-dashed border-blue-400"
              style={{
                top: `${margins.top}cm`,
                bottom: `${margins.bottom}cm`,
                left: `${margins.left}cm`,
                right: `${margins.right}cm`,
              }}
            />

            {/* Header Preview */}
            {showPreview && headerImage && (
              <div
                className="absolute"
                style={{
                  top: `calc(${margins.top}cm + 4px)`,
                  left: `${margins.left}cm`,
                  right: `${margins.right}cm`,
                }}
              >
                <img
                  src={headerImage}
                  alt="Header preview"
                  className="w-full max-h-12 object-contain"
                />
              </div>
            )}

            {/* Footer Preview */}
            {showPreview && footerImage && (
              <div
                className="absolute"
                style={{
                  bottom: `calc(${margins.bottom}cm + 4px)`,
                  left: `${margins.left}cm`,
                  right: `${margins.right}cm`,
                }}
              >
                <img
                  src={footerImage}
                  alt="Footer preview"
                  className="w-full max-h-12 object-contain"
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

/* Upload Icon */
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
  </svg>
);

export default PageLayout;