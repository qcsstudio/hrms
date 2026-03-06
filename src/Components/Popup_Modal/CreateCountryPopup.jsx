import React, { useState } from "react";

const CreateCountryPopup = ({ onClose, onContinue }) => {

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedOffice, setSelectedOffice] = useState("");
    const [applyAll, setApplyAll] = useState(false);

    const [getcountries,setGetcountries] = useState([])
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    //   {/* Modal */}
    //   <div className="w-full max-w-xl rounded-xl bg-white shadow-lg">
        
    //     {/* Header */}
    //     <div className="flex items-center justify-between border-b px-6 py-4">
    //       <div>
    //         <h2 className="text-lg font-semibold text-gray-900">
    //           Creating for Which Country
    //         </h2>
    //         <p className="text-sm text-gray-500">
    //           Please select where this policy will be applied.
    //         </p>
    //       </div>

    //       <button
    //         onClick={onClose}
    //         className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
    //       >
    //         ✕
    //       </button>
    //     </div>

    //     {/* Body */}
    //     <div className="px-6 py-5 space-y-5">
    //       {/* Select Country */}
    //       <div>
    //         <label className="mb-1 block text-sm font-medium text-gray-800">
    //           Select Country
    //         </label>
    //         <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
    //           <option>Choose Account</option>
    //         </select>

    //         <div className="mt-2 flex items-center gap-2">
    //           <input
    //             type="checkbox"
    //             className="h-4 w-4 rounded border-gray-300"
    //           />
    //           <span className="text-sm text-gray-600">
    //             Apply to all offices in this country
    //           </span>
    //         </div>
    //       </div>

    //       {/* Select Office */}
    //       <div>
    //         <label className="mb-1 block text-sm font-medium text-gray-800">
    //           Select Office
    //         </label>
    //         <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
    //           <option>Choose Account</option>
    //         </select>
    //       </div>
    //     </div>

    //     {/* Footer */}
    //     <div className="flex justify-end gap-3 border-t px-6 py-4">
    //       <button
    //         onClick={onClose}
    //         className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    //       >
    //         Cancel
    //       </button>

    //       <button
    //         onClick={onContinue}
    //         className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
    //       >
    //         Continue
    //       </button>
    //     </div>
    //   </div>
    // </div>


     
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[480px] rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1">
              Creating for Which Country
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please select where this policy will be applied.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedOffice("");
                }}
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Country</option>
                {getcountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={applyAll}
                  onChange={() => setApplyAll(!applyAll)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-500">
                  Apply to all offices in this country
                </span>
              </div>
            </div>

            {!applyAll && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Office
                </label>
                <select
                  value={selectedOffice}
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  disabled={!selectedCountry}
                  className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Office</option>
                  {selectedCountry &&
                    locationData[selectedCountry].map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={onContinue}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      
  );
};

export default CreateCountryPopup;