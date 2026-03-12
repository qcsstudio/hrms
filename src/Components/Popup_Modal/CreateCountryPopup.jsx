import { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const LOCATION_DATA = {
  India: ["Mohali Office", "Delhi Office", "Mumbai Office"],
  "United States": ["New York Office", "San Francisco Office", "Chicago Office"],
  "United Arab Emirates": ["Dubai Office", "Abu Dhabi Office"],
};

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const CreateCountryPopup = ({ onClose, onContinue }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const countries = useMemo(() => Object.keys(LOCATION_DATA), []);
  const offices = selectedCountry ? LOCATION_DATA[selectedCountry] || [] : [];
  const isContinueDisabled = !selectedCountry || (!applyAll && !selectedOffice);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleContinue = () => {
    onContinue?.({
      country: selectedCountry,
      office: applyAll ? null : selectedOffice,
      applyAll,
    });
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-label="Close popup"
      />

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Creating for Which Country</h2>
            <p className="mt-1 text-sm text-gray-500">
              Please select where this policy will be applied.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0"
            aria-label="Close popup"
          >
            <RxCross2 className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Select Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedOffice("");
              }}
              className={fieldClassName}
            >
              <option value="">Choose country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 bg-gray-50">
            <input
              type="checkbox"
              checked={applyAll}
              onChange={() => setApplyAll((prev) => !prev)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700">Apply to all offices in this country</span>
          </label>

          {!applyAll && (
            <div>
              <label className="text-sm font-medium text-gray-700">Select Office</label>
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                disabled={!selectedCountry}
                className={`${fieldClassName} disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              >
                <option value="">Choose office</option>
                {offices.map((office) => (
                  <option key={office} value={office}>
                    {office}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCountryPopup;
