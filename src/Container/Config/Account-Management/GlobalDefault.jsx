import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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

  // 🔹 ONLY IANA TIMEZONES (NO UTC)
  const getIANATimezones = (zones = []) =>
    zones.filter(tz => tz.includes("/"));

  // 1️⃣ Fetch countries
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

  // 2️⃣ Fetch global settings
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      const res = await axiosInstance.get("/companies/global-setting-get", {
        meta: { auth: "ADMIN_AUTH" }
      });
      setGlobalSettings(res?.data?.data);
    };
    fetchGlobalSettings();
  }, []);

  // 3️⃣ Prefill
  useEffect(() => {
    if (!globalSettings || !countries.length) return;

    const country =
      countries.find(
        c => c.label.toLowerCase() === globalSettings.country?.toLowerCase()
      ) || countries[0];

    setSelectedCountry(country);

    const ianaZones = getIANATimezones(country.timezones);

    setTimezone(
      globalSettings.timezone?.includes("/")
        ? globalSettings.timezone
        : ianaZones[0] || ""
    );

    setWeekStart("Monday");
    setLeaveCycleStartMonth(globalSettings.leaveCycleStartMonth || "April");
    setFinancialYearStartMonth(globalSettings.financialYearStartMonth || "April");
    setDateFormat(globalSettings.dateFormat || "DD-MM-YYYY");
    setTimeFormat(globalSettings.timeFormat === "24-hour" ? "24" : "12");
    setSubdomain(globalSettings.slug || "");
    setIndustrytype(globalSettings.industryType || "");
    setName(globalSettings.name || "");
  }, [globalSettings, countries]);

  // 4️⃣ Country change → timezone auto set
  useEffect(() => {
    if (!selectedCountry) return;
    const zones = getIANATimezones(selectedCountry.timezones);
    setTimezone(zones[0] || "");
  }, [selectedCountry]);

  // SAVE
  const handleSave = async () => {
    if (!selectedCountry) return;

    const payload = {
      name: name.trim(),
      slug: subdomain.trim(),
      industryType: industrytype,
      country: selectedCountry.label,
      timezone,
      currency: selectedCountry.currency,
      leaveCycleStartMonth,
      financialYearStartMonth,
      dateFormat,
      timeFormat: timeFormat === "24" ? "24-hour" : "12-hour",
      callingCode: selectedCountry.callingCode
    };

    console.log("FINAL PAYLOAD →", payload);

    await axiosInstance.patch(
      "/companies/global-setting-edit",
      payload,
      { meta: { auth: "ADMIN_AUTH" } }
    );

    alert("Global defaults saved successfully!");
  };

  if (!globalSettings || !countries.length || !selectedCountry) {
    return <div>Loading...</div>;
  }

  const CountryOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 cursor-pointer">
      {data.flag && <img src={data.flag} className="w-5 h-4 rounded-sm object-cover" />}
      <span>{data.label}</span>
    </div>
  );

  const CountrySingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {props.data.flag && <img src={props.data.flag} className="w-5 h-4 rounded-sm object-cover" />}
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
            className="mt-1 w-full px-4 py-3 border rounded-lg"
            value={subdomain}
            onChange={e => setSubdomain(e.target.value)}
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
            <input readOnly value={selectedCountry.currency}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="text-sm font-medium">Calling Code</label>
            <input readOnly value={selectedCountry.callingCode}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Timezone</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              {getIANATimezones(selectedCountry.timezones).map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">When does your week start?</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={weekStart}
              onChange={e => setWeekStart(e.target.value)}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Leave Cycle</label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={leaveCycleStartMonth}
              onChange={e => setLeaveCycleStartMonth(e.target.value)}
            >
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Financial year starts</label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={financialYearStartMonth}
              onChange={e => setFinancialYearStartMonth(e.target.value)}
            >
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Date format</label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value)}
            >
              <option>DD-MM-YYYY</option>
              <option>MM-DD-YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Time format</label>
            <div className="flex gap-4 mt-2">
              {["12","24"].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeFormat(t)}
                  className={`flex-1 h-12 rounded-lg font-semibold border ${
                    timeFormat === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-600"
                  }`}
                >
                  {t} Hours
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalDefaults;