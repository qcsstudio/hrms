import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const GlobalDefaults = () => {
  const { token } = useSelector(state => state.user);
  const axiosInstance = createAxios(token);

  const [globalSettings, setGlobalSettings] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [timezone, setTimezone] = useState("");
  const [weekStart, setWeekStart] = useState("Monday");
  const [leaveCycleStartMonth, setLeaveCycleStartMonth] = useState("January");
  const [financialYearStartMonth, setFinancialYearStartMonth] = useState("April");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [timeFormat, setTimeFormat] = useState("24");

  const [subdomain, setSubdomain] = useState("");
  const [industrytype, setIndustrytype] = useState("");
  const [name, setName] = useState("");

  /* ---------------- COUNTRIES ---------------- */
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,idd,timezones,flags")
      .then(res => res.json())
      .then(data => {
        const formatted = data
          .map(c => ({
            label: c.name.common,
            value: c.cca2,
            currency: c.currencies ? Object.keys(c.currencies)[0] : "",
            callingCode:
              c.idd?.root && c.idd?.suffixes?.length
                ? c.idd.root + c.idd.suffixes[0]
                : "",
            timezones: c.timezones || [],
            flag: c.flags?.png || c.flags?.svg
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formatted);
      });
  }, []);

  /* ---------------- GLOBAL SETTINGS ---------------- */
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await axiosInstance.get(
          "/companies/global-setting-get",
          { meta: { auth: "ADMIN_AUTH" } }
        );
        setGlobalSettings(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGlobalSettings();
  }, []);

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!globalSettings || countries.length === 0) return;

    const gs = globalSettings;

    const country =
      countries.find(
        c => c.label.toLowerCase().trim() === gs.country?.toLowerCase().trim()
      ) || countries[0];

    setSelectedCountry(country);

    setLeaveCycleStartMonth(gs.leaveCycleStartMonth || "January");
    setFinancialYearStartMonth(gs.financialYearStartMonth || "April");
    setDateFormat(gs.dateFormat || "DD-MM-YYYY");
    setTimeFormat(gs.timeFormat === "12-hour" ? "12" : "24");
    setSubdomain(gs.slug || "");
    setIndustrytype(gs.industryType || "");
    setName(gs.name || "");
  }, [globalSettings, countries]);

  /* ---------------- FORCE IANA TIMEZONE ---------------- */
  useEffect(() => {
    if (!selectedCountry) return;

    const iana = (selectedCountry.timezones || []).find(tz => tz.includes("/"));

    if (iana) {
      setTimezone(iana);
    }
  }, [selectedCountry]);

  const sanitizeTimezone = (tz, list = []) => {
    if (tz?.includes("/")) return tz;
    return list.find(t => t.includes("/")) || "";
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!selectedCountry || !selectedCountry.currency) return;

    const payload = {
      name: name.trim(),
      slug: subdomain.trim(),
      industryType: industrytype,
      country: selectedCountry.label,
      timezone: sanitizeTimezone(timezone, selectedCountry.timezones),
      currency: selectedCountry.currency,
      leaveCycleStartMonth,
      financialYearStartMonth,
      dateFormat,
      timeFormat: timeFormat === "24" ? "24-hour" : "12-hour",
      callingCode: selectedCountry.callingCode
    };

    try {
      await axiosInstance.patch(
        "/companies/global-setting-edit",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      alert("Global defaults saved successfully!");
    } catch (err) {
      alert("Failed to save");
    }
  };

  if (!globalSettings || countries.length === 0 || !selectedCountry) {
    return <div>Loading...</div>;
  }

  /* ---------------- CUSTOM SELECT UI ---------------- */
  const CountryOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 cursor-pointer">
      {data.flag && <img src={data.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />}
      <span>{data.label}</span>
    </div>
  );

  const CountrySingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {props.data.flag && <img src={props.data.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />}
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Global Defaults</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">

        <div>
          <label className="text-sm font-medium">Your slug</label>
          <input
            className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium">Select Country</label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              components={{ Option: CountryOption, SingleValue: CountrySingleValue }}
              className="mt-1 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <input
              readOnly
              value={selectedCountry.currency}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Calling Code</label>
            <input
              readOnly
              value={selectedCountry.callingCode}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Timezone</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {selectedCountry.timezones
                .filter(tz => tz.includes("/"))
                .map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">When does your week start?</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalDefaults;