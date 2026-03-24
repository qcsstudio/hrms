import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import createAxios from "../../../../../utils/axios.config";

const fuelRows = [
  {
    id: "petrol",
    label: "Petrol",
    rateUnit: "per liter",
    displayUnit: "per liter",
  },
  {
    id: "diesel",
    label: "Diesel",
    rateUnit: "per liter",
    displayUnit: "per liter",
  },
  {
    id: "electricVehicle",
    label: "Electric Vehicle",
    rateUnit: "per kWh",
    displayUnit: "per kWh",
  },
  {
    id: "cng",
    label: "CNG",
    rateUnit: "per KG",
    displayUnit: "per KG",
  },
];

const defaultFuelState = {
  petrol: { distancePerKm: "", fuelRate: "", rateUnit: "per liter" },
  diesel: { distancePerKm: "", fuelRate: "", rateUnit: "per liter" },
  electricVehicle: { distancePerKm: "", fuelRate: "", rateUnit: "per kWh" },
  cng: { distancePerKm: "", fuelRate: "", rateUnit: "per KG" },
};

const SelectField = ({
  options = [],
  value,
  onSelect,
  placeholder,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((item) => item.value === value);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm ${
          disabled ? "cursor-not-allowed bg-gray-100 text-gray-400" : "text-gray-800"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className={selected ? "text-gray-800" : "text-gray-400"}>
            {selected?.label || placeholder}
          </span>
          <span className={`text-xs text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
            v
          </span>
        </div>
      </button>

      {open && !disabled && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No options available</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  value === option.value
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const FuelConfiguration = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [fuelConfig, setFuelConfig] = useState(defaultFuelState);
  const [isSaving, setIsSaving] = useState(false);

  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [officeOptions, setOfficeOptions] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);

  useEffect(() => {
    const fetchFuelConfig = async () => {
      try {
        const response = await axiosInstance.get("/config/fuel-config-Getone", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const config = Array.isArray(response?.data?.data)
          ? response.data.data[0] || {}
          : response?.data?.data || response?.data?.fuelConfig || response?.data || {};

        if (!config || Object.keys(config).length === 0) {
          return;
        }

        setFuelConfig({
          petrol: {
            distancePerKm:
              config?.petrol?.distancePerKm != null ? String(config.petrol.distancePerKm) : "",
            fuelRate: config?.petrol?.fuelRate != null ? String(config.petrol.fuelRate) : "",
            rateUnit: config?.petrol?.rateUnit || "per liter",
          },
          diesel: {
            distancePerKm:
              config?.diesel?.distancePerKm != null ? String(config.diesel.distancePerKm) : "",
            fuelRate: config?.diesel?.fuelRate != null ? String(config.diesel.fuelRate) : "",
            rateUnit: config?.diesel?.rateUnit || "per liter",
          },
          electricVehicle: {
            distancePerKm:
              config?.electricVehicle?.distancePerKm != null
                ? String(config.electricVehicle.distancePerKm)
                : "",
            fuelRate:
              config?.electricVehicle?.fuelRate != null
                ? String(config.electricVehicle.fuelRate)
                : "",
            rateUnit: config?.electricVehicle?.rateUnit || "per kWh",
          },
          cng: {
            distancePerKm: config?.cng?.distancePerKm != null ? String(config.cng.distancePerKm) : "",
            fuelRate: config?.cng?.fuelRate != null ? String(config.cng.fuelRate) : "",
            rateUnit: config?.cng?.rateUnit || "per KG",
          },
        });
      } catch (error) {
        console.error("Error fetching fuel configuration:", error);
      }
    };

    fetchFuelConfig();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const response = await axiosInstance.get("/config/company-offices-data?country=", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const countries = Array.isArray(response?.data?.countries)
          ? response.data.countries
          : [];

        setCountryOptions(
          countries.map((country) => ({
            value: country,
            label: country,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountryOptions([]);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchOffices = async () => {
      if (!selectedCountry) {
        setOfficeOptions([]);
        return;
      }

      try {
        setIsLoadingOffices(true);
        const response = await axiosInstance.get(
          `/config/company-offices-data?country=${encodeURIComponent(selectedCountry)}`,
          {
            meta: { auth: "ADMIN_AUTH" },
          }
        );

        const offices = Array.isArray(response?.data?.offices) ? response.data.offices : [];

        setOfficeOptions(
          offices
            .map((office) => ({
              value: office?._id || office?.id || "",
              label: office?.locationName || office?.officeName || office?.name || "",
            }))
            .filter((office) => office.value && office.label)
        );
      } catch (error) {
        console.error("Error fetching offices:", error);
        setOfficeOptions([]);
      } finally {
        setIsLoadingOffices(false);
      }
    };

    fetchOffices();
  }, [axiosInstance, selectedCountry]);

  const updateFuelField = (key, field, value) => {
    setFuelConfig((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleOpenPopup = () => {
    setShowCountryPopup(true);
  };

  const handleSaveFuelConfig = async () => {
    const companyOfficeId = applyAll
      ? officeOptions.map((office) => office.value)
      : selectedOffice
      ? [selectedOffice]
      : [];

    if (!selectedCountry) {
      toast.error("Please select country");
      return;
    }

    if (!applyAll && !selectedOffice) {
      toast.error("Please select office");
      return;
    }

    const payload = {
      petrol: {
        distancePerKm: Number(fuelConfig.petrol.distancePerKm) || 0,
        fuelRate: Number(fuelConfig.petrol.fuelRate) || 0,
        rateUnit: fuelConfig.petrol.rateUnit,
      },
      diesel: {
        distancePerKm: Number(fuelConfig.diesel.distancePerKm) || 0,
        fuelRate: Number(fuelConfig.diesel.fuelRate) || 0,
        rateUnit: fuelConfig.diesel.rateUnit,
      },
      electricVehicle: {
        distancePerKm: Number(fuelConfig.electricVehicle.distancePerKm) || 0,
        fuelRate: Number(fuelConfig.electricVehicle.fuelRate) || 0,
        rateUnit: fuelConfig.electricVehicle.rateUnit,
      },
      cng: {
        distancePerKm: Number(fuelConfig.cng.distancePerKm) || 0,
        fuelRate: Number(fuelConfig.cng.fuelRate) || 0,
        rateUnit: fuelConfig.cng.rateUnit,
      },
      companyOfficeId,
    };

    try {
      setIsSaving(true);
      await axiosInstance.post("/config/createOrupdate/fuel-config", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success("Fuel configuration saved successfully");
      setShowCountryPopup(false);
    } catch (error) {
      console.error("Error saving fuel configuration:", error);
      toast.error(error?.response?.data?.message || "Failed to save fuel configuration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full pl-12 pr-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Fuel Configuration</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenPopup}
          className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>

      <div className="grid grid-cols-[160px_1fr_1fr] gap-6 py-3 border-b text-sm text-gray-400 font-medium">
        <span>S.No</span>
        <span>Distance (per km)</span>
        <span>Fuel rate</span>
      </div>

      {fuelRows.map((fuel) => (
        <div
          key={fuel.id}
          className="grid grid-cols-[160px_1fr_1fr] gap-6 py-4 border-b items-center"
        >
          <span className="text-sm font-medium text-gray-900">{fuel.label}</span>

          <div className="flex items-center gap-3">
            <input
              value={fuelConfig[fuel.id].distancePerKm}
              onChange={(event) =>
                updateFuelField(fuel.id, "distancePerKm", event.target.value)
              }
              placeholder="Enter distance"
              className="h-10 w-[220px] rounded-md border px-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">KM</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={fuelConfig[fuel.id].fuelRate}
              onChange={(event) => updateFuelField(fuel.id, "fuelRate", event.target.value)}
              placeholder="Enter rate"
              className="h-10 w-[220px] rounded-md border px-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {fuelRows.find((item) => item.id === fuel.id)?.displayUnit}
            </span>
          </div>
        </div>
      ))}

      {showCountryPopup &&
        createPortal(
          <div className="fixed inset-0 z-[3000] flex items-center justify-center px-4">
            <button
              type="button"
              onClick={() => setShowCountryPopup(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
              aria-label="Close popup"
            />

            <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Creating for Which Country
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Please select where this fuel configuration will be applied.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCountryPopup(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <RxCross2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-5 px-6 py-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">Select Country</label>
                  <SelectField
                    options={countryOptions}
                    value={selectedCountry}
                    onSelect={(value) => {
                      setSelectedCountry(value);
                      setSelectedOffice("");
                    }}
                    placeholder="Choose country"
                  />
                  {isLoadingCountries && (
                    <p className="mt-2 text-xs text-gray-500">Loading countries...</p>
                  )}
                </div>

                <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 bg-gray-50">
                  <input
                    type="checkbox"
                    checked={applyAll}
                    onChange={() => setApplyAll((prev) => !prev)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Apply to all offices in this country
                  </span>
                </label>

                {!applyAll && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Select Office</label>
                    <SelectField
                      options={officeOptions}
                      value={selectedOffice}
                      onSelect={setSelectedOffice}
                      placeholder="Choose office"
                      disabled={!selectedCountry || isLoadingOffices}
                    />
                    {isLoadingOffices && (
                      <p className="mt-2 text-xs text-gray-500">Loading offices...</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setShowCountryPopup(false)}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveFuelConfig}
                  disabled={isSaving}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Continue"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default FuelConfiguration;
