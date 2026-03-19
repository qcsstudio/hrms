import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../../utils/axios.config";

const EXCHANGE_API_URL = "https://api.frankfurter.dev/v1";

const getStoredOfficeIds = () => {
  const rawValue =
    localStorage.getItem("companyOfficeId") ||
    localStorage.getItem("officeId") ||
    "";

  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string" && item.trim());
    }
  } catch (error) {
    // Ignore invalid JSON and fall back to plain string handling.
  }

  return /^[a-f\d]{24}$/i.test(rawValue) ? [rawValue] : [];
};

const getOfficeDisplayName = (office) =>
  office?.officeName || office?.name || office?.office || office?.title || "";

const getOfficeCountryName = (office) => {
  if (typeof office?.country === "string") return office.country;
  return office?.country?.name || office?.countryName || office?.location?.country || "";
};

const collectOfficeCandidates = (value, bucket) => {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((item) => collectOfficeCandidates(item, bucket));
    return;
  }

  if (typeof value !== "object") return;

  const hasId = Boolean(value?._id || value?.id);
  const hasName = Boolean(getOfficeDisplayName(value));

  if (hasId && hasName) {
    bucket.push(value);
  }

  Object.values(value).forEach((child) => collectOfficeCandidates(child, bucket));
};

const extractCompanyOffices = (payload) => {
  const collected = [];
  collectOfficeCandidates(payload, collected);

  const dedupe = new Map();
  collected.forEach((item) => {
    const id = item?._id || item?.id;
    if (!id || dedupe.has(id)) return;

    dedupe.set(id, {
      id,
      name: getOfficeDisplayName(item),
      country: getOfficeCountryName(item),
    });
  });

  return Array.from(dedupe.values());
};

const getCurrencySymbol = (currencyCode) => {
  if (!currencyCode) return "-";

  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).formatToParts(1);

    return parts.find((part) => part.type === "currency")?.value || currencyCode;
  } catch (error) {
    return currencyCode;
  }
};

const normalizeCurrencyItem = (item, currencyNames) => {
  const currencyCode = item?.currency || item?.currencyCode || item?.code || "";
  const officeSource = item?.companyOfficeId || item?.companyOffice || item?.offices || [];
  const officeArray = Array.isArray(officeSource)
    ? officeSource
    : officeSource
    ? [officeSource]
    : [];

  const officeLabels = officeArray
    .map((office) => {
      if (typeof office === "string") return office;
      return getOfficeDisplayName(office) || office?._id || office?.id || "";
    })
    .filter(Boolean);

  return {
    id: item?._id || item?.id || `${currencyCode}-${Math.random()}`,
    currency: currencyCode,
    name: item?.name || currencyNames[currencyCode] || currencyCode,
    symbol: item?.symbol || getCurrencySymbol(currencyCode),
    rate:
      item?.conversionRate ??
      item?.rate ??
      item?.currencyRate ??
      "",
    officeLabels,
    status: item?.status || (item?.isActive === false ? "Draft" : "Active"),
  };
};

const CurrencyConversion = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [currencies, setCurrencies] = useState([]);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [companyOffices, setCompanyOffices] = useState([]);
  const [currencyNames, setCurrencyNames] = useState({});
  const [formData, setFormData] = useState({
    currency: "",
    conversionRate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [rateMessage, setRateMessage] = useState("");
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [isLoadingOneCurrency, setIsLoadingOneCurrency] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [viewCurrency, setViewCurrency] = useState(null);

  const refreshCurrencies = useCallback(async () => {
    try {
      setIsLoadingCurrencies(true);
      const response = await axiosInstance.get("/config/all-currency", {
        meta: { auth: "ADMIN_AUTH" },
      });

      const rawList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.currencies)
        ? response.data.currencies
        : [];

      setCurrencies(rawList.map((item) => normalizeCurrencyItem(item, currencyNames)));
    } catch (error) {
      setCurrencies([]);
    } finally {
      setIsLoadingCurrencies(false);
    }
  }, [axiosInstance, currencyNames]);

  useEffect(() => {
    const fetchCompanyOffices = async () => {
      try {
        const response = await axiosInstance.get("/config/company-offices-data", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setCompanyOffices(extractCompanyOffices(response?.data));
      } catch (error) {
        setCompanyOffices([]);
      }
    };

    fetchCompanyOffices();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchCurrencyNames = async () => {
      try {
        const response = await fetch(`${EXCHANGE_API_URL}/currencies`);
        const data = await response.json();
        setCurrencyNames(data || {});
      } catch (error) {
        setCurrencyNames({});
      }
    };

    fetchCurrencyNames();
  }, []);

  useEffect(() => {
    refreshCurrencies();
  }, [refreshCurrencies]);

  const locationOptions = useMemo(() => {
    const officeNames = companyOffices.map((office) => office.name).filter(Boolean);
    return Array.from(new Set(officeNames));
  }, [companyOffices]);

  const visibleCurrencies = useMemo(() => {
    return currencies.filter((item) => {
      const matchesStatus = statusFilter === "Active" ? item.status !== "Draft" : item.status === "Draft";
      const matchesLocation =
        !selectedLocation ||
        item.officeLabels.some(
          (officeLabel) => officeLabel.trim().toLowerCase() === selectedLocation.trim().toLowerCase()
        );

      return matchesStatus && matchesLocation;
    });
  }, [currencies, selectedLocation, statusFilter]);

  const resolvedCompanyOfficeIds = useMemo(() => {
    if (selectedCountry) {
      const matchedOfficeIds = companyOffices
        .filter((office) => {
          const sameCountry =
            (office.country || "").trim().toLowerCase() ===
            selectedCountry.trim().toLowerCase();

          if (!sameCountry) return false;
          if (applyAll) return true;

          return (
            (office.name || "").trim().toLowerCase() ===
            selectedOffice.trim().toLowerCase()
          );
        })
        .map((office) => office.id);

      if (matchedOfficeIds.length > 0) {
        return matchedOfficeIds;
      }
    }

    return getStoredOfficeIds();
  }, [applyAll, companyOffices, selectedCountry, selectedOffice]);

  useEffect(() => {
    const currencyCode = formData.currency.trim().toUpperCase();

    if (!currencyCode) {
      setFormData((prev) => ({ ...prev, conversionRate: "" }));
      setRateMessage("");
      setErrorMessage("");
      return;
    }

    if (currencyCode === "INR") {
      setFormData((prev) => ({ ...prev, currency: "INR", conversionRate: "1" }));
      setRateMessage("1 INR = 1 INR");
      setErrorMessage("");
      return;
    }

    if (currencyCode.length < 3) {
      setFormData((prev) => ({ ...prev, conversionRate: "" }));
      setRateMessage("");
      setErrorMessage("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      const supportedCurrencyCodes = Object.keys(currencyNames);
      if (supportedCurrencyCodes.length > 0 && !supportedCurrencyCodes.includes(currencyCode)) {
        setFormData((prev) => ({ ...prev, conversionRate: "" }));
        setRateMessage("");
        setErrorMessage("Please enter a valid currency code like USD or EUR.");
        return;
      }

      try {
        setIsFetchingRate(true);
        setErrorMessage("");

        const response = await fetch(
          `${EXCHANGE_API_URL}/latest?base=${currencyCode}&symbols=INR`
        );
        const data = await response.json();
        const conversionRate = data?.rates?.INR;

        if (!response.ok || typeof conversionRate !== "number") {
          throw new Error("Unable to fetch conversion rate.");
        }

        setFormData((prev) => ({
          ...prev,
          currency: currencyCode,
          conversionRate: String(conversionRate),
        }));
        setRateMessage(`1 ${currencyCode} = ${conversionRate} INR`);
      } catch (error) {
        setFormData((prev) => ({ ...prev, conversionRate: "" }));
        setRateMessage("");
        setErrorMessage("Conversion rate fetch nahi ho pa raha. Please try again.");
      } finally {
        setIsFetchingRate(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currencyNames, formData.currency]);

  const handleClear = () => {
    setSelectedLocation("");
    setStatusFilter("Active");
  };

  const handleEdit = async (currencyItem) => {
    try {
      setOpenMenuId(null);
      setSelectedCurrency(currencyItem);
      setShowDrawer(true);
      setIsLoadingOneCurrency(true);
      setErrorMessage("");
      setRateMessage("");

      const response = await axiosInstance.get(`/config/getOne-currency/${currencyItem.id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      const data = response?.data?.data || response?.data?.currency || response?.data || {};

      setSelectedCurrency({
        ...currencyItem,
        id: data?._id || data?.id || currencyItem.id,
      });
      setFormData({
        currency: (data?.currency || data?.currencyCode || currencyItem.currency || "").toUpperCase(),
        conversionRate: String(
          data?.conversionRate ?? data?.rate ?? data?.currencyRate ?? currencyItem.rate ?? ""
        ),
      });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Currency details fetch nahi ho paayi.");
    } finally {
      setIsLoadingOneCurrency(false);
    }
  };

  const handleView = (currencyItem) => {
    setViewCurrency(currencyItem);
    setOpenMenuId(null);
  };

  const handleDelete = (currencyId) => {
    setCurrencies((prev) => prev.filter((item) => item.id !== currencyId));
    setOpenMenuId(null);
  };

  const handleAddCurrency = (selection = {}) => {
    setSelectedCountry(selection.country || "");
    setSelectedOffice(selection.office || "");
    setApplyAll(Boolean(selection.applyAll));
    setShowCountryDialog(false);
    setShowDrawer(true);
    setFormData({
      currency: "",
      conversionRate: "",
    });
    setSelectedCurrency(null);
    setErrorMessage("");
    setRateMessage("");
  };

  const handleSubmit = async () => {
    const currency = formData.currency.trim().toUpperCase();
    const conversionRate = Number(formData.conversionRate);
    const fallbackOfficeIds = getStoredOfficeIds();
    const companyOfficeId =
      resolvedCompanyOfficeIds.length > 0 ? resolvedCompanyOfficeIds : fallbackOfficeIds;

    if (!currency) {
      setErrorMessage("Please enter currency code.");
      return;
    }

    if (!Number.isFinite(conversionRate) || conversionRate <= 0) {
      setErrorMessage("Valid conversion rate required.");
      return;
    }

    const payload = {
      currency,
      conversionRate,
      companyOfficeId,
    };

    try {
      setIsSaving(true);
      setErrorMessage(
        companyOfficeId.length === 0
          ? "Office id resolve nahi hua, phir bhi API call bheji ja rahi hai."
          : ""
      );

      if (selectedCurrency?.id) {
        await axiosInstance.put(`/config/update-currency/${selectedCurrency.id}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/create-currency", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      await refreshCurrencies();

      setShowDrawer(false);
      setFormData({
        currency: "",
        conversionRate: "",
      });
      setSelectedCurrency(null);
      setRateMessage("");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message 
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold leading-none text-[#111827]">
            Currency Conversion
          </h1>
          <p className="mt-2 text-xs text-[#9CA3AF]">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="rounded-md bg-[#1677FF] px-5 py-2.5 text-sm font-medium text-white"
        >
          Add Currency +
        </button>
      </div>

      {/* <div className="mb-4 flex items-center justify-end gap-3">
        <div className="hidden">
          <div className="flex gap-2 rounded-lg bg-gray-200 p-1">
            {["Active", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`rounded-md px-4 py-1.5 text-sm ${
                  statusFilter === tab ? "bg-white font-medium shadow" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="hidden rounded-lg border px-4 py-2"
          >
            <option value="">All Locations</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <button onClick={handleClear} className="hidden rounded-lg border px-4 py-2">
            Clear X
          </button>
        </div>
      </div> */}

      <p className="mb-2 text-sm font-medium text-[#374151]">Your base currency</p>
      <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.02)]">
        <strong className="text-[30px] font-semibold text-[#111827]">INR ₹</strong>
      </div>

      <div className="rounded-xl bg-white">
        <div className="grid grid-cols-[1.4fr_0.8fr_1fr_0.9fr] border-b border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#9CA3AF]">
          <span>Currency</span>
          <span>Symbol</span>
          <span>Conversion Rate</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoadingCurrencies && (
          <div className="py-5 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}

        {!isLoadingCurrencies && visibleCurrencies.length === 0 && (
          <div className="py-5 text-center text-sm text-gray-500">
            No data found
          </div>
        )}

        {!isLoadingCurrencies && visibleCurrencies.map((currencyItem) => (
          <div
            key={currencyItem.id}
            className="mt-3 grid grid-cols-[1.4fr_0.8fr_1fr_0.9fr] items-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-5"
          >
            <span className="text-sm font-medium text-[#111827]">
              {currencyItem.name || currencyItem.currency}
            </span>
            <span className="text-[28px] font-semibold text-[#111827]">
              {currencyItem.symbol}
            </span>
            <span className="text-sm text-[#111827]">{currencyItem.rate}</span>

            <div className="relative flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(currencyItem)}
                className="rounded-md border border-[#D1D5DB] px-3 py-1.5 text-xs font-medium text-[#374151]"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  setOpenMenuId((prev) => (prev === currencyItem.id ? null : currencyItem.id))
                }
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] text-[#374151]"
              >
                ...
              </button>

              {openMenuId === currencyItem.id && (
                <div className="absolute right-0 top-10 z-20 min-w-[120px] overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-lg">
                  <button
                    onClick={() => handleView(currencyItem)}
                    className="block w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F3F4F6]"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(currencyItem.id)}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#FEF2F2]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCountryDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowCountryDialog(false)}
            onContinue={handleAddCurrency}
          />,
          document.body
        )}

      {viewCurrency &&
        createPortal(
          <div className="fixed inset-0 z-[2500] flex items-center justify-center px-4">
            <button
              type="button"
              onClick={() => setViewCurrency(null)}
              className="absolute inset-0 bg-black/40"
              aria-label="Close view popup"
            />

            <div className="relative z-10 w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">View Currency</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Currency details preview
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setViewCurrency(null)}
                  className="rounded-md border border-[#D1D5DB] px-3 py-1 text-sm text-[#374151]"
                >
                  X
                </button>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Currency
                  </p>
                  <p className="mt-1 text-base font-medium text-[#111827]">
                    {viewCurrency.currency || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Symbol
                  </p>
                  <p className="mt-1 text-base font-medium text-[#111827]">
                    {viewCurrency.symbol || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Conversion Rate
                  </p>
                  <p className="mt-1 text-base font-medium text-[#111827]">
                    {viewCurrency.rate || "-"}
                  </p>
                </div>

                {/* <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Office
                  </p>
                  <p className="mt-1 text-base font-medium text-[#111827]">
                    {viewCurrency.officeLabels?.length
                      ? viewCurrency.officeLabels.join(", ")
                      : "No office mapped"}
                  </p>
                </div> */}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewCurrency(null)}
                  className="rounded-lg bg-[#1677FF] px-5 py-2 text-sm font-medium text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {showDrawer &&
        createPortal(
          <div className="fixed inset-0 z-[2000] flex">
            <div className="flex-1 bg-black/40" onClick={() => setShowDrawer(false)} />

            <div className="w-[420px] bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-lg font-semibold">
                {selectedCurrency ? "Edit Currency" : "Create Currency"}
              </h2>
              {/* <p className="mb-5 text-sm text-gray-500">
                Currency code enter karein. INR rate automatically aa jayega.
              </p> */}

              {/* {(selectedCountry || selectedOffice || applyAll) && (
                <div className="mb-4 rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  Country: {selectedCountry || "-"} | Office:{" "}
                  {applyAll ? "All offices" : selectedOffice || "-"}
                </div>
              )} */}

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Currency Code
                </label>
                <input
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currency: e.target.value.replace(/[^a-z]/gi, "").toUpperCase().slice(0, 3),
                    }))
                  }
                  placeholder="USD / EUR"
                  maxLength={3}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Conversion Rate
                </label>
                <input
                  value={formData.conversionRate}
                  readOnly
                  placeholder={isFetchingRate ? "Fetching..." : "Auto fetched in INR"}
                  className="w-full rounded-lg border bg-gray-50 px-3 py-2"
                />
                {rateMessage && <p className="mt-2 text-xs text-green-600">{rateMessage}</p>}
              </div>

              {/* <div className="mb-6 rounded-lg border bg-blue-50 px-3 py-2 text-xs text-blue-700">
                Payload companyOfficeId count:{" "}
                {(resolvedCompanyOfficeIds.length > 0
                  ? resolvedCompanyOfficeIds
                  : getStoredOfficeIds()
                ).length}
              </div> */}

              {/* {errorMessage && <p className="mb-4 text-sm text-red-600">{errorMessage}</p>} */}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDrawer(false);
                    setSelectedCurrency(null);
                    setErrorMessage("");
                    setRateMessage("");
                  }}
                  className="rounded-lg border px-5 py-2"
                >
                  Cancel
                </button>
                {isLoadingOneCurrency && (
                  <span className="self-center text-xs text-gray-500">Loading...</span>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isSaving || isFetchingRate || isLoadingOneCurrency}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white disabled:opacity-60"
                >
                  {isSaving
                    ? "Saving..."
                    : selectedCurrency?.id
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CurrencyConversion;
